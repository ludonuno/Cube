const ReplaceComa = value => {
    if(!value) return null
    return value.replace( new RegExp('%27', 'g'), "'")
}
const GetVideoId = value => {
    let x = value.replace( new RegExp('https://www.youtube.com/watch', 'g'), "")
    return x.substring(3,x.length)
}
module.exports = {
    ReplaceComa,
    GetVideoId
 }