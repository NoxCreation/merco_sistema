import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const PaymentRuleModel = (OfferRule?: any) => {
    const PaymentRule = sequelize.define('PaymentRule', {
        sponser_unit: {
            type: (Sequelize as any).FLOAT
        },
        seller_unit: {
            type: (Sequelize as any).FLOAT
        },
        by_quantity_sponser: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: OfferRule,
                key: 'id'
            }
        },
        by_quantity_seller: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: OfferRule,
                key: 'id'
            }
        },
        by_quantity_sponser_fixed_payment: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: OfferRule,
                key: 'id'
            }
        },
        by_quantity_seller_fixed_payment: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: OfferRule,
                key: 'id'
            }
        }
    }, {});

    return PaymentRule
}

