const ReplaceComa = value => {
    return value.replace( new RegExp('%27', 'g'), "'")
}

module.exports = {
    ReplaceComa
 }