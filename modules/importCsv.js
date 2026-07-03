const XLSX = require("xlsx");

function importCsv(filePath) {

    filePath = filePath.replace(/\\ /g, " ");

    const workbook = XLSX.readFile(filePath);

    const sheet = workbook.Sheets[
        workbook.SheetNames[0]
    ];

    const rows = XLSX.utils.sheet_to_json(sheet, {
        defval: ""
    });

   return rows
    .map(row => ({

        id:
            row["user_id"] ||
            row["User ID"] ||
            row["Canvas ID"] ||
            row["ID"],

        name:
            row["full_name"] ||
            row["sortable_name"] ||
            row["short_name"] ||
            row["Name"] ||
            "",

        email:
            row["email"] ||
            row["Email"] ||
            ""

    }))
    .filter(user => user.id);

}

module.exports = {
    importCsv
};