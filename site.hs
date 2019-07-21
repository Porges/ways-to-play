{-# LANGUAGE OverloadedStrings #-}

import Control.Monad
import Control.Monad.IO.Class
import Data.Either (fromRight)
import Data.Function ((&))
import Data.List (intersperse, isPrefixOf)
import qualified Data.Map as Map
import Data.Semigroup ((<>))
import Hakyll
import qualified System.Environment as Env
import System.FilePath
import qualified Text.CSL as CSL
import Text.CSL.Pandoc (processCites)
import Text.Pandoc
import Text.Pandoc.Filter
import qualified Hakyll.Core.Configuration as Config
import qualified Text.Blaze.Html5                as H
import qualified Text.Blaze.Html5.Attributes     as A

config = Config.defaultConfiguration { destinationDirectory = "docs" }

main :: IO ()
main = hakyllWith config rules

  where
  rules = do

    -- all games including drafts
    let allGamesPattern = "articles/games/**" .||. "drafts/games/**"
    -- without drafts (this is for tags & categories)
    let gamesPattern = "articles/games/**"
    let nonGamesPattern = ("articles/**" .||. "drafts/**") .&&. complement allGamesPattern

    match "CNAME" $ do
        route idRoute
        compile copyFileCompiler

    match "fonts/*.*" $ do
        route idRoute
        compile copyFileCompiler

    match "images/*.svg" $ do
        route   idRoute
        compile copyFileCompiler

    match "images/*.png" $ do
        route   idRoute
        compile copyFileCompiler

    match "audio/*.*" $ do
        route idRoute
        compile copyFileCompiler

    imageRules
        ("images/*.jpg")
        [("1600", ".jpg", Just (1600, 1600)), ("", ".jpg", Nothing), ("small", ".jpg", Just (1600, 400))]

    imageRules
        ("images/*.gif")
        [("1600", ".jpg", Just (1600, 1600)), ("", ".jpg", Nothing), ("small", ".jpg", Just (1600, 400))]

    match "css/*" $ do
        route   idRoute
        compile compressCssCompiler

    match (fromList ["about.md"]) $ do
        route (setExtension "html")
        compile $
            pandocCompiler
            >>= loadAndApplyTemplate "templates/default.html" defaultContext

    tags <- buildTags gamesPattern (fromCapture "tags/*.html")
    tagsRules tags $ \tag pattern -> do
        let title = "Games tagged ‘" ++ tag ++ "’"
        route idRoute
        compile $ do
            posts <- loadAll pattern
            let tagCtx =
                  constField "title" title
                  <> listField "posts" postCtx (return posts)
                  <> constField "bodyType" "http://schema.org/CollectionPage"
                  <> defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/tag.html" tagCtx
                >>= loadAndApplyTemplate "templates/default.html" tagCtx

    categories <- buildCategories gamesPattern (fromCapture "categories/*.html")
    tagsRules categories $ \category pattern -> do
        let title = "Category ‘" ++ category ++ "’"
        route idRoute
        compile $ do
            posts <- loadAll pattern
            let catCtx =
                    constField "title" title
                    <> constField "bodyType" "http://schema.org/CollectionPage"
                    <> listField "posts" postCtx (return posts)
                    <> defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/tag.html" catCtx
                >>= loadAndApplyTemplate "templates/default.html" catCtx

    match "chicago-author-date.csl" $ compile cslCompiler
    match "bibliography.yaml" $ compile biblioCompiler

    let tagsContext = postCtxWithTags tags

    -- this matches drafts as well 
    match allGamesPattern $ do
        route (composeRoutes (gsubRoute "articles/" (const "")) (setExtension "html"))

        let ctx = 
               constField "bodyType" "http://schema.org/WebPage"
               <> tagsContext

        compile $
            myPandocBiblioCompiler "chicago-author-date.csl" "bibliography.yaml"
            >>= loadAndApplyTemplate "templates/game.html"    ctx
            >>= loadAndApplyTemplate "templates/default.html" ctx

    match nonGamesPattern $ do
        route (composeRoutes (gsubRoute "articles/" (const "")) (setExtension "html"))

        let ctx = 
               constField "bodyType" "http://schema.org/CollectionPage"
               <> defaultContext

        compile $
            myPandocBiblioCompiler "chicago-author-date.csl" "bibliography.yaml"
            >>= loadAndApplyTemplate "templates/family.html"  ctx
            >>= loadAndApplyTemplate "templates/default.html" ctx

    create ["archive.html"] $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll gamesPattern
            let archiveCtx =
                    listField "posts" postCtx (return posts)
                    <> constField "bodyType" "http://schema.org/CollectionPage"
                    <> constField "title" "Archives"
                    <> defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
                >>= loadAndApplyTemplate "templates/default.html" archiveCtx

    match "index.html" $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll gamesPattern
            let indexCtx =
                    listField "posts" postCtx (return posts)
                    <> constField "bodyType" "http://schema.org/WebSite"
                    <> constField "title" "Home"
                    <> categoryField "categories" categories
                    <> defaultContext

            getResourceBody
                >>= applyAsTemplate indexCtx
                >>= loadAndApplyTemplate "templates/default.html" indexCtx

    match "templates/*" $ compile templateBodyCompiler


--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" <>
    defaultContext

postCtxWithTags :: Tags -> Context String
postCtxWithTags tags =
    myTagsField "tags" tags
    <> postCtx

readerOptions =
    defaultHakyllReaderOptions {
        readerExtensions = 
            disableExtension Ext_implicit_figures $
            enableExtension Ext_link_attributes $
            enableExtension Ext_bracketed_spans $ 
            enableExtension Ext_ascii_identifiers $
            enableExtension Ext_citations $
            readerExtensions defaultHakyllReaderOptions
    }

writerOptions =
    defaultHakyllWriterOptions {
        writerSectionDivs = True
    }

addLinkCitations :: Pandoc -> Pandoc
addLinkCitations (Pandoc (Meta meta) blocks) =
    let newMeta =
            Map.insert "link-citations" (MetaBool True) $
            Map.insert "notes-after-punctuation" (MetaBool True) $
            meta in
    
    Pandoc (Meta newMeta) blocks

myReadPandocBiblio :: ReaderOptions
                 -> Item CSL
                 -> Item Biblio
                 -> (Item String)
                 -> Compiler (Item Pandoc)
myReadPandocBiblio ropt csl biblio item = do
    -- Parse CSL file, if given
    style <- unsafeCompiler $ CSL.readCSLFile Nothing . toFilePath . itemIdentifier $ csl

    -- We need to know the citation keys, add then *before* actually parsing the
    -- actual page. If we don't do this, pandoc won't even consider them
    -- citations!
    let Biblio refs = itemBody biblio
    pandoc <- itemBody <$> readPandocWith ropt item
    let pandoc' = processCites style refs (addLinkCitations pandoc)

    return $ fmap (const pandoc') item

myPandocBiblioCompiler :: String -> String -> Compiler (Item String)
myPandocBiblioCompiler cslFileName bibFileName = do
    csl <- load $ fromFilePath cslFileName
    bib <- load $ fromFilePath bibFileName
    let filterPath = "C:/Users/porges/game_book/footnote-asides/.stack-work/install/05b66a6c/bin/footnote-asides.exe"
    getResourceBody 
        >>= myReadPandocBiblio readerOptions csl bib
        >>= withItemBody (unsafeCompiler . runIOorExplode . applyFilters readerOptions [JSONFilter filterPath] [])
        >>= return . writePandocWith writerOptions

myTagsField = tagsFieldWith myGetTags mySimpleRenderLink mconcat
    where
    -- exclude players/ or country/ tags
    myGetTags i = do
        tags <- getTags i
        return (filter (\x -> not ("players/" `isPrefixOf` x || "country/" `isPrefixOf` x)) tags)

mySimpleRenderLink _   Nothing         = Nothing
mySimpleRenderLink tag (Just filePath) =
  Just $
    H.li $
    H.a
    H.! A.href (H.toValue $ toUrl filePath)
    H.! A.rel "tag"
    $ H.toHtml tag

-- | Generate 'Rules' to process images.
imageRules :: Pattern -- ^ Pattern to identify images.
           -> ImageProcessing -- ^ Versions to generate.
           -> Rules ()
imageRules pat procs = match pat $ do
  sequence_ $ map processImage procs
  where
    imageRoute name ident =
        let path = toFilePath ident
            base = takeFileName path
            ext = takeExtension base
            base' = dropExtension base
            name' = if name /= "" then base' ++ "-" ++ name ++ ext else base
        in replaceFileName path name'

    -- Process an image with no instructions.
    processImage (name, extension, Nothing) = version name $ do
        route $ customRoute (imageRoute name)
        compile $ copyFileCompiler

    -- Process with scale and crop instructions.
    processImage (name, extension, Just (x,y)) = version name $ do
        route $ customRoute (imageRoute name)
        let cmd = "magick"
        let args = [ "convert"
                   , "-"
                   , "-resize"
                   , concat ["\"", show x, "x", show y, ">\""]
                   , "-quality"
                   , "92"
                   , "-"
                   ]
        compile $ getResourceLBS >>= withItemBody (unixFilterLBS cmd args)

type ImageProcessing = [(String, String, Maybe (Int, Int))]
