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
        resolve => {
            callback(resolve, undefined)
        },
        reject => callback(undefined, reject)
    )
}

const Get = (searchData, callback) => {
    return new Promise((resolve, reject) => {
        HandleGetData(searchData, (res, rej) => {
            if(res){
                request.get(res, (error, response, body) => {
                if(body)
                    resolve(JSON.parse(body))
                else
                    reject('Erro na ligação à base de dados')
                })
            }
        })
    }).then(
        resolve => callback(resolve, undefined),
        reject => callback(undefined, reject)
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
        resolve => callback(resolve, undefined),
        reject => callback(undefined, reject)
    )
}

const Create = (insertData, callback) => {
    return new Promise((resolve, reject) => {
        HandleCreateData(insertData, (res, rej) => {
            if(res){
                request.post(res, (error, response, body) => {
                if(body)
                    resolve(JSON.parse(body))
                else
                    reject('Erro na ligação à base de dados')
                })
            }
        })
    }).then(
        resolve => callback(resolve, undefined),
        reject => callback(undefined, reject)
    )
}

module.exports = {
    Get,
    Create
}