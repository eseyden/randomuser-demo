import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                red: "rgb(237,28,36)",
                brown: "rgb(78,54,41)",
                gold: "rgb(255,199,44)",
                gray: "rgb(152,164,174)",
                maroon: "rgb(112,0,46)",
                sunset: "rgb(249,66,58)",
                copper: "rgb(237,139,0)",
                wheat: "rgb(239,232,212)",
                tan: "rgb(223,209,167)",
                forest: "rgb(29,60,52)",
                sky: "rgb(187,221,230)",
            },
        },
    },
    plugins: [],
};
/*

            colors: {
                red: "#ED1C24",
                brown: "#4E3629",
                gold: "#FFC72C",
                gray: "#98A4AE",
            },
 */
