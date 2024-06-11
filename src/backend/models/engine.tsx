import { Sequelize } from "sequelize";
import { UserModel } from "./User";
import { ProfileModel } from "./Profile";
import { PostModel } from "./Post";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
}) as Sequelize;

export const Manager = () => {

    // Creando modelos
    const User = UserModel()
    const Profile = ProfileModel(User)
    const Post = PostModel(User)

    // Relación Uno a Uno entre user y profile
    User.hasOne(Profile, {
        foreignKey: 'userId',
        as: 'profile',
    });
    Profile.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
    });

    // Relación uno a mucho
    User.hasMany(Post, {
        foreignKey: 'userId',
        as: 'posts',
    });
    Post.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
    });


    return {
        User: new ModelJSON(User),
        Post: new ModelJSON(Post),
        Profile: new ModelJSON(Profile)
    }
}

class ModelJSON {
    model = null as any;
    query = null as any;

    constructor(model: any) {
        this.model = model;
    }

    async findAll(props: any) {
        this.query = await this.model.findAll(props)
        return this
    }

    async findOneById(id: number, props?: any) {
        this.query = await this.model.findByPk(id, props)
        return this
    }

    toJSON() {
        return JSON.parse(JSON.stringify(this.query))
    }
}


