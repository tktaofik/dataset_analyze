import xlsx from 'xlsx'

export function xlsx_to_json(files) {
    return new Promise((resolve, reject) => {
        try {
            const rABS = true;
            let uploadedDataSets = [];

            for (let i = 0; i !== files.length; ++i) {
                let file = files[i];
                let reader = new FileReader();
                let name = file.name;
                let dataSet = {};

                reader.onload = function (e) {
                    let data = e.target.result;
                    let workbook;

                    if (rABS) {
                        /* if binary string, read with type 'binary' */
                        workbook = xlsx.read(data, {type: 'binary'});
                    } else {
                        /* if array buffer, convert to base64 */
                        let arr = fixdata(data);
                        workbook = xlsx.read(btoa(arr), {type: 'base64'});
                    }

                    dataSet.name = name;
                    dataSet.xlsxRawData = workbook;
                    dataSet.data = [];
                    dataSet.xlsxRawData.SheetNames.forEach(name => {
                        dataSet.data.push({
                            tableName:name,
                            rows:xlsx.utils.sheet_to_json(dataSet.xlsxRawData.Sheets[name])
                        });
                    });

                    uploadedDataSets.push(dataSet);

                    resolve(uploadedDataSets);
                };

                reader.readAsBinaryString(file);
            }
        }
        catch (err) {
            reject(err);
        }
    });
}

function fixdata(data) {
    let o = "", l = 0, w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}