
export class MenuItem {
    name: string = "Menu A";
    icon?: string;
    to?: string;
    disabled?: boolean = false;
    active?: boolean = false
}

export interface Profile {
    name: string
}

export interface Back {
    name: string
    path: string
}

export type MainMenu = {
    header?: string
    items: MenuItem[]
}

export type NavMenu = {
    profile?: Profile,
    back?: Back,
    subMenu1: MainMenu[]
    subMenu2?: MenuItem[]
}

export const defaultMenu: NavMenu = {
    profile: {
        name: "ANC 1"
    },
    subMenu1: [
        {
            items: [
                { name: "Home", to: "/", active: true, icon: "Home" }
            ]
        }
    ],
    subMenu2: [
        { name: "Upgrade Now", to: "/upgrade", icon: "RocketLaunchIcon" },
        { name: "Setting", to: "/settings", icon: "SettingsIcon" }
    ]
}