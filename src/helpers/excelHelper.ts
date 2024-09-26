import * as XLSX from 'xlsx';

export const parseExcelFile = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(sheet);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};