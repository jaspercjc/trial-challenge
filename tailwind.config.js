/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/js/**/*.{js,ts,vue}"],
    theme: {
        extend: {
            colors: {
                primary: "#032E43",
                "primary-font": "#FFFFFF",

                secondary: "#F6F6F8",
                "secondary-font": "#032E43",
            },
        },
    },
    plugins: [],
};
