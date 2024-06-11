import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const PostModel = (User?: any) => {
    const Post = sequelize.define('Post', {
        // Atributos del modelo
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: User, // 'Users' would also work
                key: 'id'
            }
        }
    }, {});

    return Post
}

