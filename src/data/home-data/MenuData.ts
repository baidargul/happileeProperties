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
        title: "Sale",
        link: "#",
        sub_menus: [
            { link: "#", title: "Residential Properties" },
            { link: "#", title: "Apartments" },
            { link: "#", title: "Houses" },
            { link: "#", title: "Villas" },
            { link: "#", title: "Farmhouses" },
            { link: "#", title: "Studio Apartments" },
            { link: "#", title: "Penthouses" },
            { link: "#", title: "Commercial Properties" },
            { link: "#", title: "Offices" },
            { link: "#", title: "Shops/Showrooms" },
            { link: "#", title: "Commercial Lands" },
            { link: "#", title: "Warehouses" },
            { link: "#", title: "Industrial Buildings" },
            { link: "#", title: "Sheds" },
            { link: "#", title: "Agricultural Lands" },
            { link: "#", title: "Hotels/Resorts" },
            { link: "#", title: "Guest Houses" },
            { link: "#", title: "Plots & Lands" },
            { link: "#", title: "Residential Plots" },
            { link: "#", title: "Commercial Plots" },
          ],
    },
    {
        id: 2,
        has_dropdown: true,
        title: "Rent",
        link: "#",
        sub_menus: [
            { link: "#", title: "Residential Rentals" },
            { link: "#", title: "Apartments" },
            { link: "#", title: "Houses" },
            { link: "#", title: "Villas" },
            { link: "#", title: "Studio Apartments" },
            { link: "#", title: "Serviced Apartments" },
            { link: "#", title: "Penthouses" },
            { link: "#", title: "Farmhouses" },
            { link: "#", title: "PG/Co-living Spaces" },
            { link: "#", title: "Commercial Rentals" },
            { link: "#", title: "Offices" },
            { link: "#", title: "Retail Shops/Showrooms" },
            { link: "#", title: "Commercial Lands" },
            { link: "#", title: "Warehouses" },
            { link: "#", title: "Industrial Buildings" },
            { link: "#", title: "Sheds" },
            { link: "#", title: "Co-working Spaces" },
          ],
    },
    // {
    //     id: 3,
    //     has_dropdown: false,
    //     title: "Post Your Property",
    //     // class_name:"mega-dropdown-sm",
    //     link: "#",
    //     // menu_column: [
    //     //     {
    //     //         id: 1,
    //     //         mega_title: "Essential",
    //     //         mega_menus: [
    //     //             { link: "/about_us_01", title: "About us -1" },
    //     //             { link: "/about_us_02", title: "About us -2" },
    //     //             { link: "/agency", title: "Agency" },
    //     //             { link: "/agency_details", title: "Agency Details" },
    //     //             { link: "/agent", title: "Agent" },
    //     //             { link: "/agent_details", title: "Agent Details" },
    //     //         ]
    //     //     },
    //     //     {
    //     //         id: 2,
    //     //         mega_title: "Features",
    //     //         mega_menus: [
    //     //             { link: "/project_01", title: "Project -1" },
    //     //             { link: "/project_02", title: "Project -2" },
    //     //             { link: "/project_03", title: "Project -3" },
    //     //             { link: "/project_04", title: "Project -4" },
    //     //             { link: "/project_details_01", title: "Project Details" },
    //     //             { link: "/service_01", title: "Service -1" },
    //     //             { link: "/service_02", title: "Service -2" },
    //     //             { link: "/service_details", title: "Service Details" },
    //     //         ]
    //     //     },
    //     //     {
    //     //         id: 3,
    //     //         mega_title: "Others",
    //     //         mega_menus: [
    //     //             { link: "/compare", title: "Property Compare" },
    //     //             { link: "/pricing_01", title: "Pricing -1" },
    //     //             { link: "/pricing_02", title: "Pricing -2" },
    //     //             { link: "/contact", title: "Contact Us" },
    //     //             { link: "/faq", title: "FAQ's" },
    //     //             { link: "/not-found", title: "404-Error" },
    //     //         ]
    //     //     },
    //     // ]
    // },
    {
        id: 4,
        has_dropdown: true,
        title: "Development",
        link: "#",
        sub_menus: [
            { link: "#", title: "Project Listings" },
            { link: "#", title: "New Developments" },
            { link: "#", title: "Listings for brand-new project announcements." },
            { link: "#", title: "Ongoing Projects" },
            { link: "#", title: "Details on projects currently under development including Project Name, Type, and Location." },
            { link: "#", title: "Completed Projects" },
            { link: "#", title: "Information on projects that have been completed and are ready for occupancy." },
          ],
    },
    // {
    //     id: 5,
    //     has_dropdown: true,
    //     title: "Search Properties",
    //     link: "#",
    //     sub_menus: [
    //         { link: "#", title: "Advanced Search Features" },
    //         { link: "#", title: "Property Type" },
    //         { link: "#", title: "Configuration" },
    //         { link: "#", title: "Price Range" },
    //         { link: "#", title: "Location Details" },
    //         { link: "#", title: "Amenities" },
    //       ],
    // },
    {
        id: 6,
        has_dropdown: false,
        title: "Contact Us",
        link: "/contact",
        // sub_menus: [
        //     { link: "#", title: "Ongoing Projects" },
        //     { link: "#", title: "Completed Projects" },
        //     { link: "#", title: "Upcoming Projects" },
        // ],
    },
];
export default menu_data;