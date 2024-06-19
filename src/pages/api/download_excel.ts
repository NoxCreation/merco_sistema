import type { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == "POST") {
        const { columns, rows } = req.body
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1");
        worksheet.columns = Object.values(columns).map((column) => ({ header: column, key: column, width: 25 })) as any
        rows.forEach((row: any) => worksheet.addRow(row));
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFEEECE1" },
            };
            cell.font = { bold: true };
        });
        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });
        const buffer = await workbook.xlsx.writeBuffer();
        res.setHeader('Content-Disposition', 'attachment; filename="MyExcelFile.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    }
    else {
        return res.status(200).json({ details: "Método no permitido" })
    }
}
