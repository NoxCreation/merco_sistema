import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const UnitModel = () => {
    const Unit = sequelize.define('Unit', {
        name: {
            type: (Sequelize as any).STRING
        },
        symbol: {
            type: (Sequelize as any).STRING
        }
    }, {});

    return Unit
}

