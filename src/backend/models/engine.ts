import { Sequelize } from "sequelize";
import { ProductModel } from "./Product";
import { CategoryModel } from "./Category";
import { UnitModel } from "./Unit";
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
}) as Sequelize;

export const Manager = () => {

    // Creando modelos
    const Category = CategoryModel()
    const Unit = UnitModel()
    const Product = ProductModel(Category, Unit)

    // Relación Uno a Mucho entre product y category
    relateOneToMany(
        Product,
        Category,
        'products',
        'category',
        'categoryId'
    )

    // Relación Uno a Mucho entre product y unit
    relateOneToMany(
        Product,
        Unit,
        'products',
        'unit',
        'unitId'
    )

    sequelize.sync().then(() => console.log('Base de datos y tablas creadas!'));

    return {
        Product: new Model(Product),
        Category: new Model(Category),
        Unit: new Model(Unit)
    }
}

const relateOneToOne = (model1: any, model2: any, foreignKey: string, model1as: string, model2as: string) => {
    model1.hasOne(model2, {
        foreignKey: foreignKey,
        as: model1as,
    });
    model2.belongsTo(model1, {
        foreignKey: foreignKey,
        as: model2as,
    });
}

const relateOneToMany = (model1: any, model2: any, model1as: string, model2as: string, foreignKey: string) => {
    model2.hasMany(model1, {
        foreignKey: foreignKey,
        as: model1as,
    });
    model1.belongsTo(model2, {
        foreignKey: foreignKey,
        as: model2as,
    });
}

const relateManyToMany = (model1: any, model2: any, relationTable: string) => {
    model2.belongsToMany(model1, { through: relationTable });
    model1.belongsToMany(model2, { through: relationTable });
}

class Model {
    model = null as any;
    query = null as any;

    constructor(model: any) {
        this.model = model;
    }

    async findAll(props?: any) {
        this.query = await this.model.findAll(props)
        return this
    }

    async findOne(props?: any) {
        this.query = await this.model.findOne(props)
        return this
    }

    async findOneById(id: number, props?: any) {
        this.query = await this.model.findByPk(id, props)
        return this
    }

    async create(props: any, transaction: any) {
        this.query = await this.model.create(props, transaction)
        return this
    }


    async update(id: number, props: any) {
        this.query = await this.model.update(props, { where: { id } })
        return this
    }

    async delete(id: number) {
        this.query = await this.model.destroy({ where: { id } })
        return this
    }

    async count() {
        return await this.model.count()
    }

    toJSON() {
        return JSON.parse(JSON.stringify(this.query))
    }
}


