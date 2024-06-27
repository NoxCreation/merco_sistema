import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ConfigurationModel = (Business?: any, Coin?: any, PaymentRule?: any) => {
    const Configuration = sequelize.define('Configuration', {
        administrative_payments: {
            type: (Sequelize as any).FLOAT
        },
        re_investment: {
            type: (Sequelize as any).FLOAT
        },
        currency_payment_to_workers_id: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Coin,
                key: 'id'
            }
        },
        paymentruleId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: PaymentRule,
                key: 'id'
            }
        },
        apply_rules_ofers: {
            type: (Sequelize as any).BOOLEAN
        },
        apply_payment_results: {
            type: (Sequelize as any).BOOLEAN
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        }
    }, {});

    return Configuration
}
