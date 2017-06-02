import xlsx from 'xlsx'

export function xlsx_to_json(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = function (e) {
            let workbook = xlsx.read(e.target.result, {type: 'binary'});
            let dataSet = {};

            dataSet.name = file.name;
            dataSet.xlsxRawData = workbook;
            dataSet.data = [];
            dataSet.xlsxRawData.SheetNames.forEach(name => {
                dataSet.data.push({
                    tableName: name,
                    rows: xlsx.utils.sheet_to_json(dataSet.xlsxRawData.Sheets[name])
                });
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