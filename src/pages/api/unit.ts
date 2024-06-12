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
        const unit = (await Manager().Unit.findAll({
            limit: _pageSize,
            offset: (_page - 1) * _pageSize
        })).toJSON()

        res.status(200).json({
            page: _page,
            pageSize: _pageSize,
            data: unit
        })
    }
    else if (req.method == "POST") {
        try {
            await sequelize.transaction(async (t) => {
                const unit = (await Manager().Unit.create(req.body, { transaction: t })).toJSON()
                res.status(200).json(unit)
            })
        }
        catch {
            res.status(500).json({})
        }
    }
    else if (req.method == "DELETE") {
        const { id } = req.query
        if (id != null) {
            const unit = (await Manager().Unit.delete(parseInt(id as string))).toJSON()
            res.status(200).json(unit)
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
            const unit = (await Manager().Unit.update(parseInt(id as string), req.body)).toJSON()
            res.status(200).json(unit)
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
