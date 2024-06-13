import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const OfferRuleModel = () => {
    const OfferRule = sequelize.define('OfferRule', {
        comparative_symbol: {
            type: (Sequelize as any).STRING
        },
        value: {
            type: (Sequelize as any).FLOAT
        },
        percentage: {
            type: (Sequelize as any).FLOAT
        }
    }, {});

    return OfferRule
}

