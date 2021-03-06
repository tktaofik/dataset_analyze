import axios from "axios";

export const datasetApi = {
    saveDataset(data) {
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
                if (error.response && error.response.data){
                    reject(error.response.data);
                }

                reject(error);
            });
        });
    },

    getDatasets() {
        return new Promise((resolve, reject) => {
            axios(ajaxConfig('get', '/api/v1/datasets/')).then(function (response) {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data)
                }
            }).catch(function (error) {
                reject(error.response.data);
            });
        });
    },

    getDatasetById(id) {
        return new Promise((resolve, reject) => {
            axios(ajaxConfig('get', '/api/v1/dataset/' + id)).then(function (response) {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data)
                }
            }).catch(function (error) {
                reject(error.response.data);
            });
        });
    },

    updateDataset(id, newDataset) {
        return new Promise((resolve, reject) => {
            axios(ajaxConfig('patch', '/api/v1/dataset/' + id, newDataset)).then(function (response) {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    debugger
                    reject(response.data)
                }
            }).catch(function (error) {
                reject(error.response.data);
            });
        });
    },

    deleteDataset(id) {
        return new Promise((resolve, reject) => {
            axios(ajaxConfig('delete', '/api/v1/dataset/' + id)).then(function (response) {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data)
                }
            }).catch(function (error) {
                reject(error.response.data);
            });
        });
    }
};


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