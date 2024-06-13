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
import { RoleModel } from "./Role";
import { UserModel } from "./User";
import { SaleModel } from "./SaleModel";
import { OfferRuleModel } from "./OfferRule";
import { SMSHistoryModel } from "./SMSHistory";
import { PaymentRuleModel } from "./PaymentRule";
import { ConfigurationModel } from "./Configuration";
import { ExpenseModel } from "./Expense";
import { DailyDebtModel } from "./DailyDebt";
import { DailyClosingModel } from "./DailyClosing";
import { PayrollModel } from "./Payroll";
import { BalanceModel } from "./Balance";
import { MessengerModel } from "./Messenger";
import { MessagingDataModel } from "./MessagingData";
import { OrderProductModel } from "./OrderProduct";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    dialectOptions: {
        busyTimeout: 3000, // Tiempo de espera en milisegundos
    },
}) as Sequelize;

export const Manager = () => {

    // Creando modelos
    const Category = CategoryModel()//-
    const Unit = UnitModel()//-
    const Product = ProductModel(Category, Unit)//-
    const Coin = CoinModel()//-
    const ValueCoin = ValueCoinModel(Coin)//-
    const Stock = StockModel(Product)//-
    const Inventory = InventoryModel(Product, ValueCoin)//Tiene problema aun
    const Shop = ShopModel()//-
    const Business = BusinessModel(Shop)//-
    const ChargeEmployee = ChargeEmployeeModel()//-
    const Employee = EmployeeModel(Shop, ChargeEmployee)//-
    const HistoryCardAccount = HistoryCardAccountModel(ValueCoin)//-
    const CardAccount = CardAccountModel(HistoryCardAccount)//-
    const ProfitEmployee = ProfitEmployeeModel(Employee, ValueCoin)//-
    const Role = RoleModel()//-
    const User = UserModel(Role, Shop)
    const Sale = SaleModel(Coin, ValueCoin, Product, User, ProfitEmployee, CardAccount)// en el api modificar el post
    const OfferRule = OfferRuleModel()
    const SMSHistory = SMSHistoryModel(Employee)
    const PaymentRule = PaymentRuleModel(OfferRule)
    const Configuration = ConfigurationModel()
    const Expense = ExpenseModel(ValueCoin)
    const DailyDebt = DailyDebtModel(ValueCoin)
    const DailyClosing = DailyClosingModel(Employee)
    const Payroll = PayrollModel(Employee)
    const Balance = BalanceModel()
    const Messenger = MessengerModel()
    const MessagingData = MessagingDataModel(Employee, Messenger)
    const OrderProduct = OrderProductModel(Product)

    // Relación Uno a Mucho entre Product y Category
    relateOneToMany(
        Product,
        Category,
        'products',
        'category',
        'categoryId'
    )

    // Relación Uno a Mucho entre Product y Unit
    relateOneToMany(
        Product,
        Unit,
        'products',
        'unit',
        'unitId'
    )

    // Relación Uno a Mucho entre ValueCoin y Coin
    relateOneToMany(
        ValueCoin,
        Coin,
        'valuecoins',
        'coin',
        'coinId'
    )

    // Relación Uno a Mucho entre Inventary y ValueCoin
    relateOneToMany(
        Inventory,
        ValueCoin,
        'inventaries',
        'valuecoin',
        'priceId'
    )

    // Relación Uno a Mucho entre Inventary y Product
    relateOneToMany(
        Inventory,
        Product,
        'inventaries',
        'product',
        'productId'
    )

    // Relación Mucho a Mucho entre Inventary y Stock
    relateManyToMany(
        Inventory,
        Stock,
        'inventaries',
        'stocks',
        'InventoryStock',
    )

    // Relación Mucho a Mucho entre Bussiness y Shop
    relateManyToMany(
        Business,
        Shop,
        'businesses',
        'shops',
        'BusinessShop',
    )

    // Relación Uno a Mucho entre Employee y Shop
    relateOneToMany(
        Employee,
        Shop,
        'employees',
        'shop',
        'shopId'
    )

    // Relación Uno a Mucho entre Employee y Chargeemployee
    relateOneToMany(
        Employee,
        ChargeEmployee,
        'employees',
        'chargeemployee',
        'chargeId'
    )

    // Relación Uno a Mucho entre HistoryCardAccount y ValueCoin
    relateOneToMany(
        HistoryCardAccount,
        ValueCoin,
        'historycardaccount',
        'valuecoin',
        'amountId'
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

    // Relación Uno a Mucho entre User y Role
    relateOneToMany(
        User,
        Role,
        'users',
        'role',
        'roleId'
    )

    // Relación Uno a Mucho entre Sale y Coin
    relateOneToMany(
        Sale,
        Coin,
        'sales',
        'coin',
        'coinId'
    )

    // Relación Uno a Mucho entre Sale y ValueCoin
    relateOneToMany(
        Sale,
        ValueCoin,
        'sales',
        'valuecoin',
        'amountId'
    )

    // Relación Uno a Mucho entre Sale y ValueCoin
    relateOneToMany(
        Sale,
        ValueCoin,
        'sales2',
        'valuecoin2',
        'investmentId'
    )

    // Relación Uno a Mucho entre Sale y ValueCoin
    relateOneToMany(
        Sale,
        ValueCoin,
        'sales3',
        'valuecoin3',
        'profitId'
    )

    // Relación Mucho a Mucho entre Sale y Product
    relateManyToMany(
        Sale,
        Product,
        'sales',
        'products',
        'SaleProduct',
    )

    // Relación Uno a Mucho entre Sale y User
    relateOneToMany(
        Sale,
        User,
        'sales',
        'user',
        'userId'
    )

    // Relación Uno a Mucho entre Sale y ProfitEmployee
    relateOneToMany(
        Sale,
        ProfitEmployee,
        'sales',
        'profitemployee',
        'profit_sellerId'
    )

    // Relación Uno a Mucho entre Sale y ProfitEmployee
    relateOneToMany(
        Sale,
        ProfitEmployee,
        'sales2',
        'profitemployee2',
        'profit_sponsorId'
    )

    // Relación Uno a Mucho entre Sale y CardAccount
    relateOneToMany(
        Sale,
        CardAccount,
        'sales',
        'cardaccount',
        'cardId'
    )

    // Relación Uno a Mucho entre SMSHistory y Employee
    relateOneToMany(
        SMSHistory,
        Employee,
        'smshistories',
        'employee',
        'targetId'
    )

    // Relación Mucho a Mucho entre PaymentRule y OfferRule
    relateManyToMany(
        PaymentRule,
        OfferRule,
        'paymentrule1',
        'data_by_quantity_sponser',
        'PaymentRuleOfferRule',
    )

    // Relación Mucho a Mucho entre PaymentRule y OfferRule
    relateManyToMany(
        PaymentRule,
        OfferRule,
        'paymentrule2',
        'data_by_quantity_seller',
        'PaymentRuleOfferRule',
    )

    // Relación Mucho a Mucho entre PaymentRule y OfferRule
    relateManyToMany(
        PaymentRule,
        OfferRule,
        'paymentrule3',
        'data_by_quantity_sponser_fixed_payment',
        'PaymentRuleOfferRule',
    )

    // Relación Mucho a Mucho entre PaymentRule y OfferRule
    relateManyToMany(
        PaymentRule,
        OfferRule,
        'paymentrule4',
        'data_by_quantity_seller_fixed_payment',
        'PaymentRuleOfferRule',
    )

    // Relación Mucho a Mucho entre Configuration y Coin
    relateManyToMany(
        Configuration,
        Coin,
        'configurations',
        'coins',
        'ConfigurationCoin',
    )

    // Relación Mucho a Mucho entre Configuration y OfferRule
    relateManyToMany(
        Configuration,
        OfferRule,
        'configurations',
        'offers_rules',
        'ConfigurationOfferRule',
    )

    // Relación Uno a Mucho entre Configuration y PaymentRule
    relateManyToMany(
        Configuration,
        PaymentRule,
        'configurations',
        'payment_rules',
        'ConfigurationPaymentRule',
    )

    // Relación Uno a Mucho entre Configuration y SMSHistory
    relateManyToMany(
        Configuration,
        SMSHistory,
        'configurations',
        'sms_history',
        'ConfigurationSMSHistory',
    )

    // Relación Uno a Mucho entre Expense y ValueCoin
    relateOneToMany(
        Expense,
        ValueCoin,
        'expenses',
        'valuecoin',
        'amountId'
    )

    // Relación Uno a Mucho entre DailyDebt y ValueCoin
    relateOneToMany(
        DailyDebt,
        ValueCoin,
        'dailydebts',
        'valuecoin',
        'amountId'
    )

    // Relación Uno a Mucho entre DailyClosing y Employee
    relateOneToMany(
        DailyClosing,
        Employee,
        'dailyclosings1',
        'data_employee_seller',
        'employee_seller_id'
    )

    // Relación Uno a Mucho entre DailyClosing y Employee
    relateOneToMany(
        DailyClosing,
        Employee,
        'dailyclosings2',
        'data_employee_economic',
        'employee_economic_id'
    )

    // Relación Mucho a Mucho entre DailyClosing y ValueCoin
    relateManyToMany(
        DailyClosing,
        ValueCoin,
        'dailyclosings',
        'valuecoins',
        'DailyClosingValueCoin',
    )

    // Relación Mucho a Mucho entre DailyClosing y DailyDebt
    relateManyToMany(
        DailyClosing,
        DailyDebt,
        'dailyclosings',
        'dailydebts',
        'DailyClosingDailyDebt',
    )

    // Relación Uno a Mucho entre Payroll y Employee
    relateOneToMany(
        Payroll,
        Employee,
        'payrolls',
        'employee',
        'employeeId'
    )

    // Relación Mucho a Mucho entre Payroll y Sale
    relateManyToMany(
        Payroll,
        Sale,
        'payrolls',
        'sales',
        'PayrollSale',
    )

    // Relación Mucho a Mucho entre Balance y Payroll
    relateManyToMany(
        Balance,
        Payroll,
        'balances',
        'payrolls',
        'BalancePayroll',
    )

    // Relación Mucho a Mucho entre Balance y ValueCoin
    relateManyToMany(
        Balance,
        ValueCoin,
        'balances1',
        'investments',
        'BalanceValueCoin',
    )

    // Relación Mucho a Mucho entre Balance y ValueCoin
    relateManyToMany(
        Balance,
        ValueCoin,
        'balances2',
        'total_profit',
        'BalanceValueCoin',
    )

    // Relación Mucho a Mucho entre Balance y ValueCoin
    relateManyToMany(
        Balance,
        ValueCoin,
        'balances3',
        'total_expenses',
        'BalanceValueCoin',
    )

    // Relación Uno a Mucho entre MessagingData y Employee
    relateOneToMany(
        MessagingData,
        Employee,
        'messagingdata1',
        'sponsor',
        'sponsorId'
    )

    // Relación Uno a Mucho entre MessagingData y Messenger
    relateOneToMany(
        MessagingData,
        Messenger,
        'messagingdata2',
        'messenger',
        'messengerId'
    )

    // Relación Uno a Mucho entre OrderProduct y Product
    relateOneToMany(
        OrderProduct,
        Product,
        'orderproduct',
        'product',
        'productId'
    )

    // Relación Mucho a Mucho entre OrderProduct y ValueCoin
    relateManyToMany(
        OrderProduct,
        ValueCoin,
        'orderproduct',
        'prices',
        'OrderProductValueCoin',
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
        HistoryCardAccount: new Model(HistoryCardAccount),
        CardAccount: new Model(CardAccount),
        ProfitEmployee: new Model(ProfitEmployee),
        Role: new Model(Role),
        User: new Model(User),
        Sale: new Model(Sale),
        OfferRule: new Model(OfferRule),
        SMSHistory: new Model(SMSHistory),
        PaymentRule: new Model(PaymentRule),
        Configuration: new Model(Configuration),
        Expense: new Model(Expense),
        DailyDebt: new Model(DailyDebt),
        DailyClosing: new Model(DailyClosing),
        Payroll: new Model(Payroll),
        Balance: new Model(Balance),
        Messenger: new Model(Messenger),
        MessagingData: new Model(MessagingData),
        OrderProduct: new Model(OrderProduct),
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

const relateManyToMany = (model1: any, model2: any, model1as: string, model2as: string, relationTable: string) => {
    model2.belongsToMany(model1, { through: relationTable, as: model1as });
    model1.belongsToMany(model2, { through: relationTable, as: model2as });
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

    async create(props: any, transaction?: any) {
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



