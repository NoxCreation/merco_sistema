import { PAGESIZE } from "@/backend/models/VARS";
import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == "GET") {
        let _page = 1
        let _pageSize = PAGESIZE
        const { page, pageSize } = req.query;
        if (page != undefined)
            _page = parseInt(page as string)
        if(pageSize != undefined)
            _pageSize = parseInt(pageSize as string)
        const data = (await Manager().Shop.findAll({
            limit: _pageSize,
            offset: (_page - 1) * _pageSize
        })).toJSON()

        res.status(200).json({
            page: _page,
            pageSize: _pageSize,
            data
        })
    }
    else if (req.method == "POST") {
        try {
            await sequelize.transaction(async (t) => {
                const data = (await Manager().Shop.create(req.body, { transaction: t })).toJSON()
                res.status(200).json(data)
            })
        }
        catch (e){
            console.log("error", e)
            res.status(500).json({})
        }
    }
    else if (req.method == "DELETE") {
        const { id } = req.query
        if (id != null) {
            const data = (await Manager().Shop.delete(parseInt(id as string))).toJSON()
            res.status(200).json(data)
        }
        else{
            res.status(400).json({
                'details': "Debe indicar el id del elemento a eliminar."
            })
        }
    }
    else if (req.method == "PUT") {
        const { id } = req.query
        if (id != null) {
            const data = (await Manager().Shop.update(parseInt(id as string), req.body)).toJSON()
            res.status(200).json(data)
        }
        else{
            res.status(400).json({
                'details': "Debe indicar el id del elemento a actualizar."
            })
        }
    }
    else {
        res.status(400).json({
            'details': "Método no permitido"
        })
    }

}
