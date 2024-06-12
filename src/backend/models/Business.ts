import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const BusinessModel = (Shop?:any) => {
    const Business = sequelize.define('Business', {
        name: {
            type: (Sequelize as any).STRING
        },
        shopsId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Shop,
                key: 'id'
            }
        },
    }, {});

    return Business
}

