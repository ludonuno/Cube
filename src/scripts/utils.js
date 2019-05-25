const getBase64 = file => {
    //TODO: Converter a imagem para um tamanho especifico para ocupar o minimo de espaço possivel
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL( file )
        reader.onload = () => resolve( reader.result )
        reader.onerror = error => reject( error )
    })
}

const getImage = (base64, filename, mimeType) => {
    return (fetch(base64)
        .then( function(res) { return res.arrayBuffer() } )
        .then( function(buf) { return new File([buf], filename, {type:mimeType}) } )
    )
}


module.exports = {
    getBase64,
    getImage
}