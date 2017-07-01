import axios from "axios";

export function saveDataSetAPI(data) {
    const body = {
        type: 'dataset',
        attributes: {
            name: data.fileName,
            size: data.fileSize,
            rowData: data.xlsxRawData,
            tables: data.tables.map(table => {
                return {
                    tableName: table.tableName,
                    rows: table.rows
                }
            })
        },
        user: {}
    };

    return new Promise((resolve, reject) => {
        axios(ajaxConfig('post', '/api/v1/dataset/', body)).then(function (response) {
            if (response.status === 201) {
                resolve(response.data);
            }
            else {
                reject(response.data)
            }
        }).catch(function (error) {
            reject(error.response.data.message)
        });
    });
}

export function getDataSetsAPI() {
    return new Promise((resolve, reject) => {
        axios(ajaxConfig('get', '/api/v1/datasets/')).then(function (response) {
            if (response.status === 200) {
                resolve(response.data);
            }
            else {
                reject(response.data)
            }
        }).catch(function (error) {
            reject(error.response.data)
        });
    });
}

export function getDataSetByIdAPI(id) {
    return new Promise((resolve, reject) => {
        axios(ajaxConfig('get', '/api/v1/dataset/' + id)).then(function (response) {
            if (response.status === 200) {
                resolve(response.data);
            }
            else {
                reject(response.data)
            }
        }).catch(function (error) {
            reject(error.response.data)
        });
    });
}

function ajaxConfig(method, url, data) {
    const baseUrl = 'http://localhost:8081';
    const responseType = 'json';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    return {
        method: method,
        url: url,
        baseURL: baseUrl,
        responseType: responseType,
        headers: headers,
        data: data
    }
}