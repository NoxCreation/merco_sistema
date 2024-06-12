import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CategoryModel = () => {
    const Category = sequelize.define('Category', {
        // Atributos del modelo
        name: {
            type: (Sequelize as any).STRING
        },
        description: {
            type: (Sequelize as any).STRING
        },
        /* userId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: User, // 'Users' would also work
                key: 'id'
            }
        } */
    }, {});

    return Category
}

