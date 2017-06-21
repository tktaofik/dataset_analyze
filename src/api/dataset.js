export function saveDataSetAPI(data) {
    return fetch('http://localhost:8081/api/datasets/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        })
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        throw error;
    });
}

export function getDataSetsAPI() {
    return fetch('http://localhost:8081/api/datasets/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        throw error;
    });
}