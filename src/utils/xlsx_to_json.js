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
                    Object.keys(row).forEach((key) => {
                        if(key.includes('.')) {
                            let noDot = key.replace(".", "_");
                            row[noDot] = row[key];
                            delete row[key];
                        }
                    });
                    return Object.assign({}, row, {
                        key: `${++index}`
                    })
                });

                return {
                    tableName: name,
                    rows
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