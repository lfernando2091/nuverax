// import {createElement, lazy} from "react";
// import { asyncComponent } from 'react-async-component'

// export const MaterialIcon = (icon: string) => {
//     const iconName = icon.replace(/Icon$/, '')
//     const resolved = require(`@mui/icons-material/${iconName}`).default
//     if (!resolved) {
//         throw Error(`Could not find @mui/icons-material/${iconName}`)
//     }
//     return createElement(resolved)
// }

// const MaterialIconAsync = ({ icon }: { icon: string }) => {
//     let iconName = icon.replace(/Icon$/, '')
//     return createElement(asyncComponent({
//         resolve: () => import(
//             /* webpackMode: "eager" */
//             `material-ui-icons/${iconName}`)
//     }))
// }

export class MenuItem {
    name: string = "Menu A";
    icon?: string;
    to?: string;
    disabled?: boolean = false;
    active?: boolean = false
}

export type NavMenu = {
    subMenu1: MenuItem[]
    subMenu2?: MenuItem[]
}

export const defaultMenu: NavMenu = {
    subMenu1: [
        { name: "Home", to: "", active: true, icon: "Home" }
    ],
    subMenu2: [
        { name: "Upgrade Now", to: "/upgrade", icon: "RocketLaunchIcon" },
        { name: "Setting", to: "/settings", icon: "SettingsIcon" }
    ]
}