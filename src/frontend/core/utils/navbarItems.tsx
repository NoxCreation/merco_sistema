import BoxIcon from "../icons/BoxIcon";
import CarIcon from "../icons/CarIcon";
import DocumentIcon from "../icons/DocumentIcon";
import DollarIcon from "../icons/DollarIcon";
import HomeIcon from "../icons/HomeIcon";
import ListIcon from "../icons/ListIcon";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import { SettingsIcon } from "@chakra-ui/icons";

export const navbarItems = [
    {
        text: "Dashboard",
        icon: <HomeIcon />,
        href: "/dashboard",
    },
    {
        text: "Inventario",
        icon: <ShoppingBagIcon />,
        href: "/inventory",
    },
    {
        text: "Tránsito",
        icon: <CarIcon />,
        href: "/transit",
    },
    {
        text: "Órdenes",
        icon: <DocumentIcon />,
        href: "/orders",
    },
    {
        text: "Finanzas",
        icon: <DollarIcon />,
        href: "/finances",
    },
    {
        text: "Ventas",
        icon: <ShoppingCartIcon />,
        href: "/sales",
    },
    {
        text: "Caja",
        icon: <BoxIcon />,
        href: "/box",
    },
    {
        text: "Nomencladores",
        icon: <ListIcon />,
        href: "/nomenclators",
        subitems: [
            {
                text: "Categoría",
                href: "/nomenclators/categorie",
            },
            {
                text: "Productos",
                href: "/nomenclators/products",
            },
            {
                text: "Usuarios",
                href: "/nomenclators/users",
            },
            {
                text: "Trabajadores",
                href: "/nomenclators/workers",
            },
            {
                text: "Tiendas",
                href: "/nomenclators/shops",
            },
            {
                text: "Negocios",
                href: "/nomenclators/business",
            },
            {
                text: "Mensajeros",
                href: "/nomenclators/messengers",
            },
            {
                text: "Gastos",
                href: "/nomenclators/expenses",
            },
            {
                text: "Roles",
                href: "/nomenclators/roles",
            },
            {
                text: "Unidades de medida",
                href: "/nomenclators/units",
            },
            {
                text: "Cargos",
                href: "/nomenclators/charges",
            },
            {
                text: "Cuentas",
                href: "/nomenclators/accounts",
            },
            {
                text: "Monedas",
                href: "/nomenclators/coins",
            },
        ]
    },
    {
        text: "Configuración",
        icon: <SettingsIcon />,
        href: "/configuration",
    },
];