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
    let arrayResult = []
    let numberOfObjects = 0

    console.log(insertData)

    // searchData.forEach(element => {

    //     let table = element.table
    //     let fieldsData = ''

    //     element.fieldData.forEach(d => {
    //         fieldsData += `${d.field}=${d.data}`
    //     })

    //     request.create(`${url}/${table}?${fieldsData}`, (error, response, body) => {
    //         arrayResult[numberOfObjects] = JSON.parse(body)
    //         numberOfObjects++
    //         if(numberOfObjects === searchData.length) callback(arrayResult)
    //     })
    // })
}

module.exports = {
    Get,
    Create
}