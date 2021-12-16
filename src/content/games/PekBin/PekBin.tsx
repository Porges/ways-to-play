import * as React from 'react';
import { Table } from 'react-bootstrap';

import { Section, Footnote, Cite, Noun, ArticleImage, Description } from 'ui'; import imgBoard from './pek-bin.svg'; const PekBin: React.FC = () => {
    return <>
        <Description>Eight Faces  (<span lang="zh">八面</span>, Mandarin <span lang="cmn-Latn">bāmiàn</span>, Hokkien <span lang="nan-Latn">pehbīn</span>)<Footnote>Given as “Pek Bin” in older English sources, such as <Cite r="GamblingGamesOfMalaya" page={125} inline />, and in legislation based upon that work (see below).</Footnote> is (or was) a simple staking game played with a special eight-sided teetotum (<span lang="zh">陀螺</span>, Mandarin <span lang="cmn-Latn">tuóluó</span>, Hokkien <span lang="nan-Latn">tolo</span>). It is also called <span lang="zh">小花会</span> (‘small <Noun lang="cmn-Latn">Huāhuì</Noun>’), as it uses a subset of characters from the <Noun lang="cmn-Latn">Huāhuì</Noun> (<span lang="zh">花會</span>) lottery game.<Cite r="郑超麟回忆录" /></Description>
        <p>The description below is mostly based upon <Cite r="GamblingGamesOfMalaya" inline />, which describes it as popular in Malaysia with “Chinese ladies”. </p>
        <p>The game is also described in the memoirs of Chinese revolutionary <Noun lang="zh-Latn">Zheng Chaolin</Noun> (<span lang="zh">郑超麟</span>, 1901–1998), who says that it was played at roadside gambling stalls during the five days after the Chinese New Year (and in practice until the Lantern Festival on the fifteenth day), when gambling was not prohibited.<Cite r="郑超麟回忆录" /></p>
        <p>As of 2021, the game remains explicitly illegal in Malaysia,<Cite r="MalaysiaCommonGamingHousesAct" /> Singapore,<Cite r="SingaporeGamesOfChanceAndSkill" /> and Brunei.<Cite r="LawsOfBrunei" page={21} /></p>
        <Section title="Equipment">
            <p>The special die has eight sides, each marked with the name of a character from the <Noun lang="cmn-Latn">Huāhuì</Noun> (<span lang="zh">花會</span>) lottery game, and they are divided alternately into two different colours. If the teetotum is made out of a dark material (such as buffalo horn), the characters are inlaid with red and white; if a light material (ivory, bone) is used then they are red and blue/black. These colours are not necessary for the play of the game but make it easier to match the result.</p>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mandarin</th>
                        <th>Hokkien</th>
                        <th>Older Romanization</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="red">
                        <td><span lang="zh">太平</span></td>
                        <td><Noun lang="cmn-Latn">Tài Píng</Noun></td>
                        <td><Noun lang="nan-Latn">Thài Pêng</Noun></td>
                        <td>Tai or Thai Peng</td>
                    </tr>
                    <tr className="blue">
                        <td><span lang="zh-Hant">月寶</span>/<span lang="zh-Hans">月宝</span></td>
                        <td><Noun lang="cmn-Latn">Yuè Bǎo</Noun></td>
                        <td><Noun lang="nan-Latn">Goa̍t Pó</Noun></td>
                        <td>Yuet Po or Guat Poh</td>
                    </tr>
                    <tr className="red">
                        <td><span lang="zh">合同</span></td>
                        <td><Noun lang="cmn-Latn">Hé Tóng</Noun></td>
                        <td><Noun lang="nan-Latn">Ha̍p Tông</Noun></td>
                        <td>Hup Thong or Hap Tong</td>
                    </tr>
                    <tr className="blue">
                        <td><span lang="zh">有利</span></td>
                        <td><Noun lang="cmn-Latn">Yǒu Lì</Noun></td>
                        <td><Noun lang="nan-Latn">Iú Lī</Noun></td>
                        <td>Yeow Lay or Yu Li</td>
                    </tr>
                    <tr className="red">
                        <td><span lang="zh">吉品</span></td>
                        <td><Noun lang="cmn-Latn">Jí Pǐn</Noun></td>
                        <td><Noun lang="nan-Latn">Kiat Phín</Noun></td>
                        <td>Kat Pang or Kiat Pin</td>
                    </tr>
                    <tr className="blue">
                        <td><span lang="zh">上招</span></td>
                        <td><Noun lang="cmn-Latn">Shàng Zhāo</Noun></td>
                        <td><Noun lang="nan-Latn">Siōng Chiau</Noun></td>
                        <td>Siong Chow or Siang Chiow</td>
                    </tr>
                    <tr className="red">
                        <td><span lang="zh">日山</span></td>
                        <td><Noun lang="cmn-Latn">Rì Shān</Noun></td>
                        <td><Noun lang="nan-Latn">Ji̍t San</Noun></td>
                        <td>Yat Sun or Jit San</td>
                    </tr>
                    <tr className="blue">
                        <td><span lang="zh-Hant">音會</span>/<span lang="zh-Hans">音会</span></td>
                        <td><Noun lang="cmn-Latn">Yīn Huì</Noun></td>
                        <td><Noun lang="nan-Latn">Im Hōe</Noun></td>
                        <td>Im Huay</td>
                    </tr>
                </tbody>
            </Table>
            <p>The staking board is drawn on a piece of paper or cloth, and has eight cells, one for each result, along with several circles and quarter-circles:</p>
            <ArticleImage src={imgBoard} mainImage alt="">
                The staking layout, after <Cite r="GamblingGamesOfMalaya" page={124} inline />.
            </ArticleImage>
        </Section>
        <Section title="Rules">
            <p>The game is a gambling game played with one player at a time acting as the banker (莊, Hokkien <span lang="nan-Latn">chong</span>, Mandarin <span lang="cmn-Latn">zhuāng</span>). The game can be run by a syndicate with a fixed banker, or in a friendly game the banker can rotate on a time interval (e.g. every 15 or 30 minutes).</p>
            <p>Each round, the top is spun on a plate<Footnote>This plate was often placed on a bed of rice inside a larger bowl, to deaden the noise.</Footnote> and covered with a bowl. While the top remains covered, players place their bets on the staking board, then the banker reveals the top and the bets are collected.</p>
            <p>There are four kinds of bets that can be placed:</p>
            <dl>
                <dt>A bet on one result</dt>
                <dd>These bets are placed inside one of the eight cells; if the chosen character comes up then the bet pays out 6:1. If any other result comes up the bet is lost.</dd>
                <dt>A bet on two results</dt>
                <dd>These bets are placed on the lines dividing the cells; if either of the adjacent characters comes up then the bet pays out 2.8:1. If any other result comes up the bet is lost. In <Noun lang="zh-Latn">Zheng Chaolin</Noun>’s version, this bet pays 3:1.</dd>
                <dt>A bet on four results</dt>
                <dd>These bets are placed on the circles between four cells; if any of the four characters comes up then the bet pays out 1:1. If any other result comes up the bet is lost.</dd>
                <dt>A corner bet</dt>
                <dd>These bets are placed in the quarter-circles in the corner of the board; if the adjacent character comes up then the bet pays out 1:1. However, the bet is only lost if either of the nearer two cells in the opposite colour comes up; in all other cases the bet remains, and may be taken back by the player. For example, if the player places their bet next to <span lang="zh" className="red">太平</span> at the top-left, it is only lost if <span lang="zh" className="blue">月宝</span> or <span lang="zh" className="blue">上招</span> come out.</dd>
            </dl>
        </Section>
        <Section title="Analysis">
            <p>The house edges on the bets are as follows:</p>
            <dl>
                <dt>A bet on one result</dt>
                <dd>Pays 6:1, real odds 7:1. House edge is 12.5%.</dd>
                <dt>A bet on two results</dt>
                <dd>Pays 2.8:1, real odds 3:1. House edge is 5%. If it pays 3:1 as in <Noun lang="zh-Latn">Zheng Chaolin</Noun>’s version, then the bet is fair, which is probably why it was changed!</dd>
                <dt>A bet on four results</dt>
                <dd>Pays 1:1, which are the fair odds, unusual for a gambling game.</dd>
                <dt>A corner bet</dt>
                <dd>This wins on one option and loses on two, paying 1:1; the house edge is 12.5%.</dd>
            </dl>
        </Section>
    </>;
}

export default PekBin;
