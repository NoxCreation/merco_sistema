import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const RoleModel = () => {
    const Role = sequelize.define('Role', {
        name: {
            type: (Sequelize as any).STRING
        },
        view_dashboard: {
            type: (Sequelize as any).BOOLEAN
        },
        perms_dashboard: {
            type: (Sequelize as any).STRING
        },
        view_inventory: {
            type: (Sequelize as any).BOOLEAN
        },
        perms_inventory: {
            type: (Sequelize as any).STRING
        },
        view_transit: {
            type: (Sequelize as any).BOOLEAN
        },
        perms_transit: {
            type: (Sequelize as any).STRING
        },
        view_orders: {
            type: (Sequelize as any).BOOLEAN
        },
        perms_orders: {
            type: (Sequelize as any).STRING
        },
        view_finance: {
            type: (Sequelize as any).BOOLEAN
        },
        perms_finance: {
            type: (Sequelize as any).STRING
        },
        view_sales: {
            type: (Sequelize as any).BOOLEAN
        },
        perms_sales: {
            type: (Sequelize as any).STRING
        },
        view_box: {
            type: (Sequelize as any).BOOLEAN
        },
        perms_box: {
            type: (Sequelize as any).STRING
        },
    }, {});

    return Role
}

