import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const StockModel = () => {
    const Stock = sequelize.define('Stock', {
        value: {
            type: (Sequelize as any).FLOAT
        },
    }, {});

    return Stock
}

