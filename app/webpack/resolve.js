const path = require("path");

const resolve = {
    modules: [
        "src/components",
        "src/app",
        "src",
        "node_modules"
    ],
    alias: {
        "react-date-css": path.resolve(
            __dirname, 
            "../src/lib/react-dates/lib/css/_datepicker.css"
        ),
    },
};

module.exports = resolve;