import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CategoryModel = (Business?: any) => {
    const Category = sequelize.define('Category', {
        name: {
            type: (Sequelize as any).STRING
        },
        description: {
            type: (Sequelize as any).STRING
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        }
    }, {});

    return Category
}

