interface MenuItem {
    id: number;
    title: string;
    class_name?:string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
    menu_column?: {
        id: number;
        mega_title: string;
        mega_menus: {
            link: string;
            title: string;
        }[];
    }[]
}[];

const menu_data: MenuItem[] = [

    {
        id: 1,
        has_dropdown: true,
        title: "Buy",
        link: "#",
        sub_menus: [
            { link: "#", title: "Residential Properties" },
            { link: "#", title: "Commercial Properties" },
            { link: "#", title: "New Launches" },
            { link: "#", title: "Resale Properties" },
        ],
    },
    {
        id: 2,
        has_dropdown: true,
        title: "Rent",
        link: "#",
        sub_menus: [
            { link: "#", title: "Apartments for Rent" },
            { link: "#", title: "Villas for Rent" },
            { link: "#", title: "Shared Accommodation (PG/Co-living)" },
        ],
    },
    {
        id: 3,
        has_dropdown: false,
        title: "PG / Co-living",
        // class_name:"mega-dropdown-sm",
        link: "#",
        // menu_column: [
        //     {
        //         id: 1,
        //         mega_title: "Essential",
        //         mega_menus: [
        //             { link: "/about_us_01", title: "About us -1" },
        //             { link: "/about_us_02", title: "About us -2" },
        //             { link: "/agency", title: "Agency" },
        //             { link: "/agency_details", title: "Agency Details" },
        //             { link: "/agent", title: "Agent" },
        //             { link: "/agent_details", title: "Agent Details" },
        //         ]
        //     },
        //     {
        //         id: 2,
        //         mega_title: "Features",
        //         mega_menus: [
        //             { link: "/project_01", title: "Project -1" },
        //             { link: "/project_02", title: "Project -2" },
        //             { link: "/project_03", title: "Project -3" },
        //             { link: "/project_04", title: "Project -4" },
        //             { link: "/project_details_01", title: "Project Details" },
        //             { link: "/service_01", title: "Service -1" },
        //             { link: "/service_02", title: "Service -2" },
        //             { link: "/service_details", title: "Service Details" },
        //         ]
        //     },
        //     {
        //         id: 3,
        //         mega_title: "Others",
        //         mega_menus: [
        //             { link: "/compare", title: "Property Compare" },
        //             { link: "/pricing_01", title: "Pricing -1" },
        //             { link: "/pricing_02", title: "Pricing -2" },
        //             { link: "/contact", title: "Contact Us" },
        //             { link: "/faq", title: "FAQ's" },
        //             { link: "/not-found", title: "404-Error" },
        //         ]
        //     },
        // ]
    },
    {
        id: 4,
        has_dropdown: true,
        title: "Commercial",
        link: "#",
        sub_menus: [
            { link: "#", title: "Offices" },
            { link: "#", title: "Retail Shops" },
            { link: "#", title: "Warehouses" },
        ],
    },
    {
        id: 4,
        has_dropdown: false,
        title: "Plots/Land",
        link: "#",
        // sub_menus: [
        //     { link: "#", title: "Offices" },
        //     { link: "#", title: "Retail Shops" },
        //     { link: "#", title: "Warehouses" },
        // ],
    },
    {
        id: 4,
        has_dropdown: true,
        title: "Projects",
        link: "#",
        sub_menus: [
            { link: "#", title: "Ongoing Projects" },
            { link: "#", title: "Completed Projects" },
            { link: "#", title: "Upcoming Projects" },
        ],
    },
    {
        id: 4,
        has_dropdown: false,
        title: "New Launch (Resale)",
        link: "#",
        // sub_menus: [
        //     { link: "#", title: "Offices" },
        //     { link: "#", title: "Retail Shops" },
        //     { link: "#", title: "Warehouses" },
        // ],
    },
];
export default menu_data;