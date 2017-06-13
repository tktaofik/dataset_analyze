export function saveDataSet(data) {
    return fetch('http://localhost:8081/api/dataset/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.fileName,
            data: data
        })
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        throw error;
    });
}

export function getDataSets(data) {
    return fetch('http://localhost:8081/api/dataset/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.fileName,
            data: data
        })
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        throw error;
    });
}