import * as React from 'react';

import { Noun, Section, ArticleImage, Footnote } from 'ui';

const HachiHachi: React.FC = () => {
    return (<>
        <p><Noun lang="ja-Latn">Hachi-Hachi</Noun> (<span lang="ja">八八</span>, ‘88’) is the preëminent <a href="/articles/cards/japan/hanafuda/"><Noun lang="ja-Latn">Hanafuda</Noun></a> gambling game. In many old English sources it is considered synonymous with ‘<Noun lang="ja-Latn">hanafuda</Noun>’ or ‘<Noun lang="ja-Latn">hana-awase</Noun>’ and isn’t given a more specific name.</p>
        <p>The name derives from the objective of the game; the standard version of the game is for three active players, and there are 264 total card points available, so the goal for each player is to obtain at least their share, i.e. 264 ÷ 3 = <strong>88</strong> points.</p>
        <p>Despite being — historically, at least —  the most important <Noun lang="ja-Latn">Hanafuda</Noun> game, it is also one of the most difficult. The play of the cards is the same as in other <Noun lang="ja-Latn">Hanafuda</Noun> games, but the procedures of betting and payment combine to increase the complexity. There are also multiple sets of <span lang="ja-Latn">yaku</span>, and specialized equipment that was commonly used with the game.</p>
        {/*
    <p>Because of this, I present a simplified base game first, and each subsequent section introduces another extension of the rules until the full version of the game is attained.<Footnote>This approach was inspired by Z.D. Smith’s “<a href="https://blog.zdsmith.com/posts/a-curriculum-of-vira.html">A Curriculum of Vira</a>”.</Footnote> As a game that was often played in secret for money, there is no one ‘true’ set of rules, and there are also many optional variations and regional rules differences.</p>
    */}
        <Section title="Rules">

        </Section>
        <Section title={<>The <span lang="ja-Latn">Yaku</span> in Depth</>}>
            <Section title={<><Noun lang="ja-Latn">Aka-tan</Noun> &bull; <span lang="ja">赤短</span> &bull; “red ribbons”</>}>
                <p>This <span lang="ja-Latn">yaku</span> is made up of exactly the three red <span lang="ja-Latn">tanzaku</span> cards of the first three months (pine, plum, cherry). No other <span lang="ja-Latn">tanzaku</span> may be used to complete it.</p>
                <ArticleImage
                    noborder
                    src={require('./Urasu.jpg')}
                    alt="">
                    The cards that form the <Noun lang="ja-Latn">Aka-tan/Ura-Sugawara</Noun> <span lang="ja-Latn">yaku</span>, from an old <a href="/articles/cards/japan/hanafuda/traditional-manufacturers/#tanaka-gyokusuido"><Noun lang="ja-Latn">Tanaka Gyokusuidō</Noun></a> deck. The cards are labelled <span lang="ja">𛀋らす</span> (<span lang="ja-Latn">urasu</span>), <span lang="ja">よろし</span> (<span lang="ja-Latn">yoroshi</span>), and <span lang="ja">す𛀙𛂦ら</span> (<span lang="ja-Latn">sugawara</span>).
                </ArticleImage>
                <p>It was also formerly known as <span lang="ja-Latn">ura-sugawara</span> (<span lang="ja">裏菅原</span>, ‘behind/inside <Noun lang="ja-Latn">Sugawara</Noun>’) or <span lang="ja-Latn">urasu</span> for short.<Footnote>Other spellings of <span lang="ja-Latn">urasu</span> (<span lang="ja">うらす</span>) include <span lang="ja">裏</span>, <span lang="ja">裏す</span>, <span lang="ja">宇良す</span>, or <span lang="ja">𛀋らす</span>.</Footnote> This name was a reference to the popular <span lang="ja-Latn">kabuki</span> play <cite lang="ja-Latn">Sugawara Denju Tenarai Kagami</cite> (<span lang="ja">菅原伝授手習鑑</span>, ‘<cite>Sugawara and the Secrets of Calligraphy</cite>’). In the play the three main characters are brothers who are named after the three plants featured on the cards: <Noun lang="ja-Latn">Matsuōmaru</Noun> (<span lang="ja">松王丸</span>, pine), <Noun lang="ja-Latn">Umeōmaru</Noun> (<span lang="ja">梅王丸</span>, plum), and <Noun lang="ja-Latn">Sakuramaru</Noun> (<span lang="ja">桜丸</span>, cherry). In the play the brothers wear costumes which bear symbols of the plants related to their names.</p>
                <p>The <span lang="ja-Latn">yaku</span> can also be called <span lang="ja-Latn">yoroshī</span> (<span lang="ja">よろしい</span>, ‘good’) or <span lang="ja-Latn">akayoro</span> (<span lang="ja">赤よろ</span>, ‘red good’), or even simply <span lang="ja-Latn">aka</span> (<span lang="ja">緋</span>, ‘scarlet’), although this risks confusion with the <span lang="ja-Latn">aka teyaku</span>.</p>
                <ArticleImage
                    size="extra-wide"
                    src={require('./Sugawara_scene.jpg')}
                    alt=""
                    source={{
                        originalUrl: 'https://collections.mfa.org/objects/217240',
                        organization: { orgName: 'Museum of Fine Arts Boston' },
                        license: 'cc0'
                    }}>
                    The ‘<Noun lang="ja-Latn">Kurumabiki</Noun>’ (<span lang="ja">車引き</span>, carriage-breaking) scene from <cite>Sugawara and the Secrets of Calligraphy</cite>. The three brothers can be seen at front wearing clothes bearing the plants: cherry blossoms, plum blossoms, and pine trees.<br/>An 1841 print by <Noun lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Kunisada">Utagawa Kunisada</a></Noun> (<span lang="ja">歌川国貞</span>).
                </ArticleImage>
            </Section>
        </Section>
        <Section title="Equipment">
            <Section title={<><Noun lang="ja-Latn">Kashifuda</Noun> &bull; <span lang="ja">菓子札</span> &bull; “sweets cards”</>}>
                <p><Noun lang="ja-Latn">Kashifuda</Noun> are cards that are used to stand in for money, since playing gambling games for real money has almost always been illegal in Japan. The name means ‘sweets cards’, but is also a pun on <span lang="ja">貸し</span> <span lang="ja-Latn">kashi</span> (‘debt/favour’), so can be understood as ‘debt cards’. I think the name was originally probably meant to be the latter but was later modified into the current form. In any case, the cards usually show pictures of food and drink.</p>
                <p>It is unclear how literally the images should be taken — did a card depicting a steak dinner require the loser to make payment in kind? It is fun to imagine so, but I have no evidence to support this.</p>
            </Section>
            <ArticleImage
                noborder
                size="extra-wide"
                perRow={3}
                src={[
                    [require('./KashiOld_25_1.jpg'), ''],
                    [require('./KashiOld_25_2.jpg'), ''],
                    [require('./KashiOld_50_1.jpg'), ''],
                    [require('./KashiOld_50_2.jpg'), ''],
                    [require('./KashiOld_reverse.jpg'), ''],
                ]}>
                Old-style <Noun lang="ja-Latn">Kashifuda</Noun> (c. 1920?), published by <a href="/articles/cards/japan/hanafuda/traditional-manufacturers/#tsuchida-tenguya"><Noun lang="ja-Latn">Tsuchida Tenguya</Noun></a>. At top left, two 25-<span lang="ja-Latn">kan</span> notes, the left one reading <span lang="ja">小鯛雀𛁋し</span> (‘<Noun lang="ja-Latn">Kodai Suzume</Noun> sushi’), a sushi restaurant <a href="http://www.sushiman.co.jp/company/">that opened in <Noun lang="ja-Latn">Ōsaka</Noun> in 1781, and apparently a favourite of Emperor <Noun lang="ja-Latn">Meiji</Noun></a>; the other reads <span lang="ja">上等蒸菓子</span> (‘fine steamed confectionary’). The two 50-<span lang="ja-Latn">kan</span> cards (top right, bottom left) are for <span lang="ja">洋食</span> (‘Western meal’) and <span lang="ja">上等葡萄酒</span> (‘fine wine’). The reverse of the cards is designed to look like a <Noun lang="ja-Latn">Meiji</Noun>-era 1-yen banknote that bore a portrait of the <a href="https://en.wikipedia.org/wiki/Empress_Jing%C5%AB">Empress <Noun lang="ja-Latn">Jingū</Noun></a>, and which was used from 1881 until 1899. The set also contained (not pictured here) another 50-<span lang="ja-Latn">kan</span> card and a 100-<span lang="ja-Latn">kan</span> card. {/*https://cdn.discordapp.com/attachments/644611492846632960/702040093140975687/i-img800x600-1587393965cq878p755785.png*/ } 
            </ArticleImage>
            <ArticleImage
                noborder
                size="extra-wide"
                perRow={5}
                src={[
                    [require('./KashiKKK_1.jpg'), ''],
                    [require('./KashiKKK_10.jpg'), ''],
                    [require('./KashiKKK_50.jpg'), ''],
                    [require('./KashiKKK_100.jpg'), ''],
                    [require('./KashiKKK_25_1.jpg'), ''],

                    [require('./KashiKKKBack_1.jpg'), ''],
                    [require('./KashiKKKBack_10.jpg'), ''],
                    [require('./KashiKKKBack_50.jpg'), ''],
                    [require('./KashiKKKBack_100.jpg'), ''],
                    [require('./KashiKKK_25_2.jpg'), ''],
                ]}>
                <Noun lang="ja-Latn">Kashifuda</Noun> as published by <a href="/articles/cards/japan/hanafuda/traditional-manufacturers/#kamigataya"><Noun lang="ja-Latn">Kamigataya</Noun></a> in denominations of 1, 10, 50, 100, and two different 25 cards (the only two in the set). The reverse bears the name “K.K.K.” which stands for <Noun lang="ja-Latn">Kamigataya <a href="https://en.wikipedia.org/wiki/Kabushiki_gaisha">Kabushiki Kaisha</a></Noun>.
            </ArticleImage>
            <ArticleImage
                noborder
                size="extra-wide"
                src={[
                    [require('./KashiNintendo_1.jpg'), ''],
                    [require('./KashiNintendo_10.jpg'), ''],
                    [require('./KashiNintendo_50.jpg'), ''],
                    [require('./KashiNintendo_100.jpg'), ''],
                    [require('./KashiNintendo_reverse.jpg'), ''],
                ]}>
                Nintendo-style <Noun lang="ja-Latn">Kashifuda</Noun> cards, in denominations of 1, 10, 50, and 100.
            </ArticleImage>
            {
            <ArticleImage
                noborder
                size="extra-wide"
                src={[
                    [require('./KashiNintendo2_1.jpg'), ''],
                    [require('./KashiNintendo2_10.jpg'), ''],
                    [require('./KashiNintendo2_50.jpg'), ''],
                    [require('./KashiNintendo2_100.jpg'), ''],
                    [require('./KashiNintendo2_reverse.jpg'), ''],
                ]}>
                Later (redrawn) Nintendo-style <Noun lang="ja-Latn">Kashifuda</Noun> cards, in denominations of 1, 10, 50, and 100.
            </ArticleImage>
            }
            <ArticleImage
                noborder
                size="extra-wide"
                src={[
                    [require('./KashiNintendo3_1.jpg'), ''],
                    [require('./KashiNintendo3_10.jpg'), ''],
                    [require('./KashiNintendo3_50.jpg'), ''],
                    [require('./KashiNintendo3_100.jpg'), ''],
                    [require('./KashiNintendo3_reverse.jpg'), ''],
                ]}>
                Yet later (slightly redrawn) Nintendo-style <Noun lang="ja-Latn">Kashifuda</Noun> cards, in denominations of 1, 10, 50, and 100.
            </ArticleImage>
            <ArticleImage
                noborder
                size="extra-wide"
                src={[
                    [require('./KashiNNN_1.jpg'), ''],
                    [require('./KashiNNN_10.jpg'), ''],
                    [require('./KashiNNN_50.jpg'), ''],
                    [require('./KashiNNN_100.jpg'), ''],
                    [require('./KashiNNN_reverse.jpg'), ''],
                ]}>
                <Noun lang="ja-Latn">Kashifuda</Noun> cards produced by <a href="/articles/cards/japan/hanafuda/traditional-manufacturers/#nakao-seikado"><Noun lang="ja-Latn">Nakao Seikadō</Noun></a>, in denominations of 1, 10, 50, and 100, and the reverse of the 10. It is unclear what “NNN” means, but it may be in imitation of the “KKK” used by <Noun lang="ja-Latn">Kamigataya</Noun>.
            </ArticleImage>
            <ArticleImage
                noborder
                size="extra-wide"
                src={[
                    [require('./Kashi非_1.jpg'), ''],
                    [require('./Kashi非_5.jpg'), ''],
                    [require('./Kashi非_25.jpg'), ''],
                    [require('./Kashi非_100.jpg'), ''],
                    [require('./Kashi非_reverse.jpg'), ''],
                ]}>
                <Noun lang="ja-Latn">Kashifuda</Noun> by an unknown manufacturer, in denominations of 1, 5, 25, and 100.
            </ArticleImage>
        </Section>
    </>);
}

export default HachiHachi;
