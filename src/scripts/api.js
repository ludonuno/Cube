const request = require('request');

const url = 'https://ludonuno-cube-api.herokuapp.com/API'


const HandleGetData = (data, callback) => {
    return new Promise((resolve, reject) => {
       let fieldsData = ''
        let table = data[0].table
        if(data[0].fieldData) {
            let multipleParams = 0
            data[0].fieldData.forEach(d => {
                if(multipleParams) fieldsData += '&'
                fieldsData += `${d.field}=${d.data}`
                multipleParams++
            })
            resolve(`${url}/${table}?${fieldsData}`)
        } else {
            resolve(`${url}/${table}`)
        }
    }).then(
        resolve => callback(resolve),
        reject => callback(undefined)
    )
}

const Get = (searchData, callback) => {
    return new Promise((resolve, reject) => {
        HandleGetData(searchData, (res) => {
            request.get(res, (error, response, body) => {
                resolve(JSON.parse(body))
            })
        })
    }).then(
        resolve => callback(resolve),
        reject => callback(undefined)
    )
}

const HandleCreateData = (data, callback) => {
    return new Promise((resolve, reject) => {
        let table = data[0].table
        let fieldsData = ''
        let multipleParams = 0
        data[0].fieldData.forEach(d => {
            if(multipleParams) fieldsData += '&'
            fieldsData += `${d.field}=${d.data}`
            multipleParams++
        })
        resolve(`${url}/${table}?${fieldsData}`)
    }).then(
        resolve => callback(resolve),
        reject => callback(reject)
    )
}

const Create = (insertData, callback) => {
    return new Promise((resolve, reject) => {
        HandleCreateData(insertData, (res) => {
            console.log(res)
            request.post(res, (error, response, body) => {
                resolve(JSON.parse(body))
            })
        })
    }).then(
        resolve => callback(resolve),
        reject => callback(undefined)
    )
}

module.exports = {
    Get,
    Create
}