import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ConfigurationModel = () => {
    const Configuration = sequelize.define('Configuration', {
        administrative_payments: {
            type: (Sequelize as any).FLOAT
        },
        re_investment: {
            type: (Sequelize as any).FLOAT
        },
    }, {});

    return Configuration
}

