import {NavMenu} from "../../@core";

export const navBar: NavMenu = {
    back: {
        name: "Home",
        path: "/"
    },
    subMenu1: [
        {
            header: "Space",
            items: [
                { name: "Settings", to: "", active: true, icon: "Home" }
            ]
        },
        {
            header: "Documents",
            items: [
                { name: "Document 1", to: "d/abc123", active: true, icon: "Home" },
                { name: "Document 2", to: "d/abc456", icon: "Home" }
            ]
        }
    ]
}