import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const BusinessModel = () => {
    const Business = sequelize.define('Business', {
        name: {
            type: (Sequelize as any).STRING
        },
        code: {
            type: (Sequelize as any).STRING
        },
    }, {});

    return Business
}

