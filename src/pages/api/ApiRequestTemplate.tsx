import { PAGESIZE } from "@/backend/models/VARS";
import { sequelize } from "@/backend/models/engine";
import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

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
        let _filter = {} as any
        let count = 0
        const { page, pageSize, filter } = req.query;
        _filter = filter ? JSON.parse(filter as string) : _filter
        // Recorre cada clave en el objeto filter
        for (let key in _filter) {
            if (key != 'relations') {
                _filter = cleanFilter(_filter, key)
            }
            else {
                delete _filter[key]
            }
        }
        if (page != undefined)
            _page = parseInt(page as string)
        if (pageSize != undefined)
            _pageSize = parseInt(pageSize as string)

        let data = null as any
        try {
            data = (await manager.findAll({
                limit: _pageSize,
                offset: (_page - 1) * _pageSize,
                include,
                where: {
                    ..._filter
                },
                order: [
                    ['id', 'DESC']
                ]
            })).toJSON()
        }
        catch {
            data = (await manager.findAll({
                include,
                where: {
                    ..._filter
                },
                order: [
                    ['id', 'DESC']
                ]
            })).toJSON()
            console.log((_page - 1) * _pageSize, _pageSize)
            data = data.slice((_page - 1) * _pageSize, ((_page - 1) * _pageSize) + _pageSize)
        }

        //console.log("data", data)
        count = (await (await manager.findAll({})).count())

        return res.status(200).json({
            page: _page,
            pageSize: _pageSize,
            count,
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
                return res.status(500).json({
                    'details': e
                })
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

export const cleanFilter = (_filter: any, key: string) => {
    // Si el valor de la clave es un objeto y tiene una clave LIKE
    if (typeof _filter[key] === 'object' && _filter[key].hasOwnProperty('LIKE')) {
        // Reemplaza la clave LIKE con [Op.like]
        _filter[key] = { [Op.like]: `%${_filter[key].LIKE}%` };
    }
    return _filter
}

export const cleanNumberFilter = (_filter: any, key: string) => {
    // Si el valor de la clave es un objeto y tiene una clave LIKE
    if (typeof _filter[key] === 'object' && _filter[key].hasOwnProperty('LIKE')) {
        // Reemplaza la clave LIKE con [Op.like]
        _filter[key] = parseInt(_filter[key].LIKE)
    }
    return _filter
}
