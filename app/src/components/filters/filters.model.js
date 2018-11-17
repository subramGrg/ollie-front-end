const model = {
    currency: {
        type: "dropdown",
        group: "currency",
        value: {},
        options: [
            {
                abbreviation: "USD",
                symbol: "$"
            },
            {
                abbreviation: "EUR",
                symbol: "€"
            },
            {
                abbreviation: "GBP",
                symbol: "£"
            },
            {
                abbreviation: "HKD",
                symbol: "HK$"
            },
            {
                abbreviation: "AUD",
                symbol: "AU$"
            },
            {
                abbreviation: "CNY",
                symbol: "¥"
            },
            {
                abbreviation: "SAR",
                symbol: "﷼",
            },
            {
                abbreviation: "RUB",
                symbol: "₽",
            }
        ],
    },
    search: {
        name: "search",
        group: "search",
        type: "text",
        value: true,
    },
    sort: {
        type: "toggle",
        group: "sort",
        value: "",
        options: ["Name", "Length", "Price"]
    },
    price: {
        name: "price",
        type: "slider",
        group: "slider",
        min: 0,
        max: 1000000,
        value: {
            min: 0,
            max: 1000000,
        },
        unit: "$",
    },
    length: {
        name: "length",
        type: "slider",
        group: "slider",
        increment: 5,
        min: 0,
        max: 100,
        value: {
            min: 0,
            max: 100,
        },
        unit: "m",
    },
    year: {
        name: "year",
        type: "slider",
        group: "slider",
        increment: 1,
        min: 1970,
        max: new Date().getFullYear(),
        value: {
            min: 1970,
            max: new Date().getFullYear(),
        },
        unit: "",
    },
    superyacht: {
        name: "superyacht",
        type: "toggle",
        group: "toggle",
        value: false,
    },
    regions: {
        name: "regions",
        type: "radio",
        group: "radio",
        value: {},
        options: []
    },

    showFiltersClass: "",
};


export { model as default };