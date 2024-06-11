import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ProfileModel = (User?: any) => {
    const Profile = sequelize.define('Profile', {
        // Atributos del modelo
        bio: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: User, // 'Users' would also work
                key: 'id'
            }
        }
    }, {});

    return Profile
}

