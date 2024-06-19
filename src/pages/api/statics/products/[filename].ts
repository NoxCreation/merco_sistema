import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { resolve } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { filename } = req.query;
        const filePath = resolve(process.cwd(), 'public', 'products', filename as string);
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'image/jpeg');
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
    } else {
        res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
}