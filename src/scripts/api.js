const request = require('request');

const url = 'https://ludonuno-cube-api.herokuapp.com/API'

const Get = (searchData, callback) => {
    let arrayResult = []
    let numberOfObjects = 0

    searchData.forEach(element => {

        let table = element.table
        let fieldsData = ''

        element.fieldData.forEach(d => {
            fieldsData += `${d.field}=${d.data}`
        })

        request.get(`${url}/${table}?${fieldsData}`, (error, response, body) => {
            arrayResult[numberOfObjects] = JSON.parse(body)
            numberOfObjects++
            if(numberOfObjects === searchData.length) callback(arrayResult)
        })
    })
}

const Create = (insertData, callback) => {
    console.log(insertData)

    insertData.forEach(element => {

        let table = element.table
        let fieldsData = ''
        let multipleParams = 0

        element.fieldData.forEach(d => {
            if(multipleParams) fieldsData += '&'
            fieldsData += `${d.field}=${d.data}`
            multipleParams++
        })
        console.log(`${url}/${table}?${fieldsData}`)
        request.post(`${url}/${table}?${fieldsData}`, (error, response, body) => {
            callback(JSON.parse(body))
        })
    })
}

module.exports = {
    Get,
    Create
}