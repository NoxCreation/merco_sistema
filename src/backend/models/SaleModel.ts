import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const SaleModel = (Coin?: any, ValueCoin?: any, Product?: any, User?: any, ProfitEmployee?: any, CardAccount?: any) => {
    const Sale = sequelize.define('Sale', {
        sale_id: {
            type: (Sequelize as any).STRING
        },
        coinId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Coin,
                key: 'id'
            }
        },
        amountId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ValueCoin,
                key: 'id'
            }
        },
        investmentId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ValueCoin,
                key: 'id'
            }
        },
        profitId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ValueCoin,
                key: 'id'
            }
        },
        productsId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
        payment_method: {
            type: (Sequelize as any).STRING
        },
        userId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        profit_sellerId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ProfitEmployee,
                key: 'id'
            }
        },
        profit_sponsorId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ProfitEmployee,
                key: 'id'
            }
        },
        cardId: {
            type: (Sequelize as any).INTEGER,
            allowNull: true,
            references: {
                model: CardAccount,
                key: 'id'
            }
        },
    }, {});

    return Sale
}

