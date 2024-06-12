import { Sequelize } from "sequelize";
import { ProductModel } from "./Product";
import { CategoryModel } from "./Category";
import { UnitModel } from "./Unit";
import { CoinModel } from "./Coin";
import { ValueCoinModel } from "./ValueCoin";
import { StockModel } from "./Stock";
import { InventoryModel } from "./Inventory";
import { ShopModel } from "./Shop";
import { BusinessModel } from "./Business";
import { ChargeEmployeeModel } from "./ChargeEmployee";
import { EmployeeModel } from "./Employee";
import { CardAccountModel } from "./CardAccount";
import { HistoryCardAccountModel } from "./HistoryCardAccount";
import { ProfitEmployeeModel } from "./ProfitEmployee";
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
}) as Sequelize;

export const Manager = () => {

    // Creando modelos
    const Category = CategoryModel()
    const Unit = UnitModel()
    const Product = ProductModel(Category, Unit)
    const Coin = CoinModel()
    const ValueCoin = ValueCoinModel(Coin)
    const Stock = StockModel(Product)
    const Inventory = InventoryModel(Product, Stock, ValueCoin)
    const Shop = ShopModel()
    const Business = BusinessModel(Shop)
    const ChargeEmployee = ChargeEmployeeModel()
    const Employee = EmployeeModel(Shop, ChargeEmployee)
    const HistoryCardAccount = HistoryCardAccountModel(ValueCoin)
    const CardAccount = CardAccountModel(Coin, HistoryCardAccount)
    const ProfitEmployee = ProfitEmployeeModel(Employee, ValueCoin)
    

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

    // Relación Uno a Mucho entre valuecoin y coin
    relateOneToMany(
        ValueCoin,
        Coin,
        'valuecoins',
        'coin',
        'coinId'
    )

    // Relación Uno a Mucho entre inventary y valuecoin
    relateOneToMany(
        Inventory,
        ValueCoin,
        'inventaries',
        'valuecoin',
        'priceId'
    )

    // Relación Uno a Mucho entre inventary y product
    relateOneToMany(
        Inventory,
        Product,
        'inventaries',
        'product',
        'productId'
    )

    // Relación Mucho a Mucho entre inventary y stock
    relateManyToMany(
        Inventory,
        Stock,
        'InventoryStock',
    )

    // Relación Mucho a Mucho entre bussiness y shop
    relateManyToMany(
        Business,
        Shop,
        'BusinessShop',
    )

    // Relación Uno a Mucho entre employee y shop
    relateOneToMany(
        Employee,
        Shop,
        'employees',
        'shop',
        'shopId'
    )

    // Relación Uno a Mucho entre employee y shargeemployee
    relateOneToMany(
        Employee,
        ChargeEmployee,
        'employees',
        'shargeemployee',
        'chargeId'
    )

    // Relación Uno a Mucho entre CardAccount y HistoryCardAccount
    relateOneToMany(
        CardAccount,
        HistoryCardAccount,
        'cardaccounts',
        'historycardaccount',
        'historyId'
    )

    // Relación Uno a Mucho entre ProfitEmployee y Employee
    relateOneToMany(
        ProfitEmployee,
        Employee,
        'profitemployees',
        'employee',
        'employeeId'
    )

    // Relación Uno a Mucho entre ProfitEmployee y ValueCoin
    relateOneToMany(
        ProfitEmployee,
        ValueCoin,
        'profitemployees',
        'valuecoin',
        'valueId'
    )

    sequelize.sync().then(() => console.log('Base de datos y tablas creadas!'));

    return {
        Product: new Model(Product),
        Category: new Model(Category),
        Unit: new Model(Unit),
        Coin: new Model(Coin),
        ValueCoin: new Model(ValueCoin),
        Stock: new Model(Stock),
        Inventory: new Model(Inventory),
        Shop: new Model(Shop),
        Business: new Model(Business),
        ChargeEmployee: new Model(ChargeEmployee),
        Employee: new Model(Employee),
        HistoryCardAccount:  new Model(HistoryCardAccount),
        CardAccount: new Model(CardAccount),
        ProfitEmployee: new Model(ProfitEmployee),
    }
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


