import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ShopModel = () => {
    const Shop = sequelize.define('Shop', {
        name: {
            type: (Sequelize as any).STRING
        },
        description: {
            type: (Sequelize as any).STRING
        }
    }, {});

    return Shop
}

