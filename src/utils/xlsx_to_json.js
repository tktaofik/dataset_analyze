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
                     for (let key in row) {
                         // Check if the data is a number / string
                        if(/^\d+$/.test(row[key])) {
                            row[key] = +row[key]
                        }

                        if(key.includes('.')) {
                            let noDot = key.replace(".", "_");
                            row[noDot] = row[key];
                            delete row[key];
                        }
                    };
                    return Object.assign({}, row, {
                        key: `${++index}`
                    })
                });

                console.log(rows[0]);

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
