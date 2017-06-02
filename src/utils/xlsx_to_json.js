import xlsx from 'xlsx'

export function xlsx_to_json(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = function (e) {
            let workbook = xlsx.read(e.target.result, {type: 'binary'});
            let dataSet = {};

            dataSet.name = file.name;
            dataSet.xlsxRawData = workbook;
            dataSet.tables = workbook.SheetNames.map(name => {
                return {tableName: name, rows: xlsx.utils.sheet_to_json(dataSet.xlsxRawData.Sheets[name])}
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