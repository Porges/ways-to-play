{-# LANGUAGE FlexibleContexts, LambdaCase, TupleSections #-}
module Main where

import Control.Monad.Writer
import Data.IORef
import Data.Traversable
import Text.Pandoc.JSON
import Text.Pandoc.Walk

main :: IO ()
main = do
    counter <- newIORef 0
    toJSONFilter (walkPandoc counter)

-- we can't use the built-in `walk` since we want to produce counters in order.
-- the built-in one does a bottom-up rewrite

walkPandoc :: IORef Int -> Pandoc -> IO Pandoc
walkPandoc counter (Pandoc m blocks) = walkBlocks counter blocks >>= pure . Pandoc m

walkBlocks :: IORef Int -> [Block] -> IO [Block]
walkBlocks counter = fmap concat . traverse (walkBlock counter)

walkBlock :: IORef Int -> Block -> IO [Block]
walkBlock counter = \case

    orig@(Plain inl) -> 
        extractNotes counter inl >>= \case
            (_, []) -> pure [orig]
            (inls, notes) -> pure [asided (Plain inls) notes]

    orig@(Para inl) ->
        extractNotes counter inl >>= \case
            (_, []) -> pure [orig]
            (inls, notes) -> pure [asided (Para inls) notes]
            
    orig@(LineBlock _) -> pure [orig] -- handle this?

    BlockQuote blocks -> do 
        newBlocks <- concat <$> traverse (walkBlock counter) blocks
        pure [BlockQuote newBlocks]

    OrderedList ls blockss -> do
        newBlocks <- traverse ((concat <$>) . traverse (walkBlock counter)) blockss
        pure [OrderedList ls newBlocks]

    BulletList blockss -> do
        newBlocks <- traverse ((concat <$>) . traverse (walkBlock counter)) blockss
        pure [BulletList newBlocks]

    DefinitionList items -> do
        newItems <- for items (\(inl, blockss) -> (inl,) <$> traverse ((concat <$>) . traverse (walkBlock counter)) blockss)
        pure [DefinitionList newItems]

    orig@(Header n attrs inl) -> 
        extractNotes counter inl >>= \case
            (_, []) -> pure [orig]
            (inls, notes) -> pure ([Header n attrs inls] ++ toAside notes)

    orig@(Table inls aligns widths cells rows) -> pure [orig] -- handle this?

    Div attrs blocks -> do
        newBlocks <- concat <$> traverse (walkBlock counter) blocks
        pure [Div attrs newBlocks]


    c@(CodeBlock _ _) -> pure [c]
    r@(RawBlock _ _) -> pure [r]
    HorizontalRule -> pure [HorizontalRule]
    Null -> pure [Null]

asided :: Block -> [Block] -> Block
asided blk asides = Div ("", ["asided"], []) (toAside asides ++ [blk])

toAside :: [Block] -> [Block]
toAside blocks = [RawBlock (Format "html") "<aside role=\"note\">"] ++ blocks ++ [RawBlock (Format "html") "</aside>"]

extractNotes :: IORef Int -> [Inline] -> IO ([Inline], [Block])
extractNotes counter = runWriterT . go
    where 
    go = \case
        (Note blocks : rest) -> do

            n <- liftIO $ readIORef counter
            liftIO $ writeIORef counter (n+1)

            tell (cat (char n) blocks)

            xs <- go rest 
            pure (char n ++ xs)

        (x : xs) -> do 
            xs <- go xs
            pure (x : xs)

        [] -> pure []

    char :: Int -> [Inline]
    char n = 
        [Span ([], ["footnote-marker"], []) [Str [chars !! n]], Space]

chars :: [Char]
chars = cycle "*†‡§‖¶"

cat :: [Inline] -> [Block] -> [Block]
cat s = \case
    (b:bs) -> catBlock b : bs
    [] -> [Para s]
    where 
    catBlock :: Block -> Block
    catBlock = \case
        Plain inls -> Plain (catInlines inls)
        Para inls -> Para (catInlines inls)

    catInlines xs = s ++ xs


