export interface UserType {
    id: number,
    first_name: string,
    last_name: string,
    ci: string,
    email: string,
    phone: string,
    roleId: number,
    shopId: number,
    username: string,
    password_hash: string,
    createdAt: string,
    updatedAt: string,
    role: {
        id: number,
        name: string,
        view_dashboard: true,
        perms_dashboard: string,
        view_inventory: true,
        perms_inventory: string,
        view_transit: true,
        perms_transit: string,
        view_orders: true,
        perms_orders: string,
        view_finance: true,
        perms_finance: string,
        view_sales: true,
        perms_sales: string,
        view_box: true,
        perms_box: string,
        createdAt: string,
        updatedAt: string
    },
    shop: {
        id: number,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string,
        businesses: [
            {
                id: number,
                name: string,
                code: string,
                createdAt: string,
                updatedAt: string
            }
        ]
    }
}

export type Product = {
    id: number,
    image: string,
    code: string,
    name: string,
    categoryId: number,
    coste_usd: number,
    price_usd: number,
    count_unit: number,
    unitId: number,
    gain_rate: boolean,
    rate_seller: number,
    rate_sponsor: number,
    barcode: string,
    createdAt: string,
    updatedAt: string,
    category: {
        id: number,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string
    },
    unit: {
        id: number,
        name: string,
        symbol: string,
        createdAt: string,
        updatedAt: string
    },
    business: {
        id: number,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string
    }
};

export type Shop = {
    id: number,
    canRemove: Boolean,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
}

export type Bussines = {
    id: number,
    name: string,
    code: string,
    shops: Array<Shop>
};

export type Category = {
    id: number,
    name: string,
    description: string,
    businessId: number,
    createdAt: string,
    updatedAt: string,
};

export type Unit = {
    id: number
    canRemove: boolean
    name: string
    symbol: string
    createdAt: string
    updatedAt: string
};

export type Coin = {
    id: number
    canRemove: boolean
    active: boolean
    symbol: string
    value_change: 1
    createdAt: string
    updatedAt: string
}

export type ValueCoin = {
    id: number
    value: number
    coinId: number
    createdAt: string
    updatedAt: string
    coin: Coin
}

export type Expense = {
    id: number
    inUse: Boolean
    amountId: number
    description: string
    createdAt: string
    updatedAt: string
    valuecoin: ValueCoin
};

export type Messenger = {
    id: number
    first_name: string
    last_name: string
    ci: string
    email: string
    phone: string
    more_data: string
    businessId: number
    createdAt: string
    updatedAt: string
    business: Bussines
};

export type Charge = {
    id: number
    canRemove: boolean
    name: string,
    description: string,
    createdAt: string
    updatedAt: string
}

export type Employees = {
    id: number
    first_name: string
    last_name: string
    ci: string
    email: string
    phone: string
    shopId: number
    businessId: number
    createdAt: string
    updatedAt: string
    business: Bussines
    fixed_payment: boolean
    fixed_payment_value: number
    chargeId: number
    shop: Shop
    chargeemployee: Charge
};

export type Rol = {
    id: number
    canRemove: boolean
    name: string
    view_dashboard: boolean
    perms_dashboard: string,
    view_inventory: true,
    perms_inventory: string,
    view_transit: true,
    perms_transit: string,
    view_orders: true,
    perms_orders: string,
    view_finance: true,
    perms_finance: string,
    view_sales: true,
    perms_sales: string,
    view_box: true,
    perms_box: string,
    businessId: number
}

