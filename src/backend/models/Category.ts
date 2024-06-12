import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CategoryModel = () => {
    const Category = sequelize.define('Category', {
        name: {
            type: (Sequelize as any).STRING
        },
        description: {
            type: (Sequelize as any).STRING
        },
    }, {});

    return Category
}

