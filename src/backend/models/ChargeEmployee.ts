import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ChargeEmployeeModel = () => {
    const ChargeEmployee = sequelize.define('ChargeEmployee', {
        name: {
            type: (Sequelize as any).STRING
        },
        description: {
            type: (Sequelize as any).STRING
        },
    }, {});

    return ChargeEmployee
}

