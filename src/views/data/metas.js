//- サイト内で使用するまとまったデータ類はここへ記述
//- サイト全体に関する情報はここへ記述
module.exports = {
    title: "サイト名", //- サイト名
    url: "https://test.com", //- サイトURL
    description: "descriptionを記入してください", //- サイト説明文
    keywords: "keywordを記入して下さい", //- サイトキーワード
    locale: "ja_JP", // og:locale
    tweetMessage: `${this.description}`, //- twitterシェアメッセージ
    hashtags:'', //- twitterシェアハッシュタグ-ハッシュタグのカンマ区切り。Hash,Tag,です
    twitterId : '', //- Twitterアカウント。「@twitterIdさんから」が追加される
    related : "", //- 関連するTwitterアカウント。
    share_twitter_url : `https://twitter.com/share?url=${this.url}&text=${this.tweetMessage}&hashtags=${this.hashtags}`, //- &via=${twitterId}&related=${related}`
    share_facebook_url : `https://www.facebook.com/share.php?u=${this.url}`,
    // fbAppId: "", // 任意のfacebook app ID
    // googlemap_api_key : '1789237896', //- GoogleMap API Key（必ず変更してください）
}