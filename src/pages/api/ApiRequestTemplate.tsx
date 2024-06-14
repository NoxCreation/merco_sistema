import { PAGESIZE } from "@/backend/models/VARS";
import { Manager, sequelize } from "@/backend/models/engine";
import { NextApiRequest, NextApiResponse } from "next";

export const ApiRequestTemplate = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    manager: any,
    include?: any,
    replacePOST?: () => void
) => {
    if (req.method == "GET") {
        let _page = 1
        let _pageSize = PAGESIZE
        const { page, pageSize } = req.query;
        if (page != undefined)
            _page = parseInt(page as string)
        if (pageSize != undefined)
            _pageSize = parseInt(pageSize as string)
        const data = (await manager.findAll({
            limit: _pageSize,
            offset: (_page - 1) * _pageSize,
            include
        })).toJSON()

        return res.status(200).json({
            page: _page,
            pageSize: _pageSize,
            data
        })
    }
    else if (req.method == "POST") {
        if (replacePOST) {
            await replacePOST()
        }
        else {
            try {
                await sequelize.transaction(async (t) => {
                    const data = (await manager.create(req.body, { transaction: t })).toJSON()
                    return res.status(200).json(data)
                })
            }
            catch (e) {
                console.log("error", e)
                return res.status(500).json({})
            }
        }
    }
    else if (req.method == "DELETE") {
        const { id } = req.query
        if (id != null) {
            const data = (await manager.delete(parseInt(id as string))).toJSON()
            return res.status(200).json(data)
        }
        else {
            return res.status(400).json({
                'details': "Debe indicar el id del elemento a eliminar."
            })
        }
    }
    else if (req.method == "PUT") {
        const { id } = req.query
        if (id != null) {
            const data = (await manager.update(parseInt(id as string), req.body)).toJSON()
            return res.status(200).json(data)
        }
        else {
            return res.status(400).json({
                'details': "Debe indicar el id del elemento a actualizar."
            })
        }
    }
    else {
        return res.status(400).json({
            'details': "Método no permitido"
        })
    }
}