import xlsx from 'xlsx'

export function xlsx_to_json(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = function (e) {
            let workbook = xlsx.read(e.target.result, {type: 'binary'});
            let dataSet = {};

            dataSet.fileName = file.name;
            dataSet.fileSize = file.size;
            dataSet.xlsxRawData = workbook;
            dataSet.tables = workbook.SheetNames.map(name => {
                const rows = xlsx.utils.sheet_to_json(dataSet.xlsxRawData.Sheets[name]).map((row, index) => {
                    return Object.assign({}, row, {
                        key: `${++index}`
                    })
                });

                const columns = []
                Object.keys( rows[0] ).forEach( key => {
                    if(key !== "key") {
                        const column = {
                            title: key,
                            dataIndex: key,
                            key: key,
                            width: 300
                        }
                        columns.push(column);
                    }
                });

                return {
                    tableName: name,
                    rows,
                    columns,
                }
            });
            resolve(dataSet);
        };

        try {
            reader.readAsBinaryString(file);
        }
        catch (err) {
            reject(err);
        }
    });
}