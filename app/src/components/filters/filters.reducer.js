const initalState = {
    sortBy: null,
    sortByDescending: {
        Name: false,
        Length: false,
        Weeklyrate: false,
    },
    searchText: null,
    locationObject: null,
    guests: 0,
    region: 0,
    regions: [],
    yachtType: null,
    memberSpecials: null,
    allInclusive: null,
    yachtSize: null,
    resetFilter: null,
    charters: "weekly-charter",
    price: {
        value: "all",
        text: "all",
        dropDownActive: false,
    },
    yachtIDs: null,
    yachtsLoaded: false,
    shareLinkActive: false,
};

const resetOptions = () => ({
    resetFilter: false,
    yachtsLoaded: true,
});

/*
*  any action type required to be shareable
*  has to be in share-filters.reducer.js as well
*/
export default (state = initalState, action) => {
    switch (action.type) {
        case "SET_SEARCH_TEXT":
            return {
                ...state,
                searchText: action.payload,
                ...resetOptions(),
            };

        case "SET_LOCATION":
            return {
                ...state,
                locationObject: action.payload,
                region: 0,
                ...resetOptions(),
            };

        case "SET_SORT_BY":
            return {
                ...state,
                sortBy: action.payload,
                sortByDescending: {
                    ...state.sortByDescending,
                    [action.payload]: action.sortByDescending,
                },
                ...resetOptions(),
            };

        case "SET_REGIONS":
            return {
                ...state,
                regions: action.payload,
                resetFilter: false,
            };

        case "SET_SELECTED_REGION":
            return {
                ...state,
                region: action.payload,
                locationObject: null,
                ...resetOptions(),
            };

        case "SET_PRICE_RANGE_DROP_DOWN":
            return {
                ...state,
                price: {
                    ...state.price,
                    dropDownActive: !state.price.dropDownActive,
                },
                ...resetOptions(),
            };

        case "SET_PRICE_RANGE":
            return {
                ...state,
                price: {
                    ...state.price,
                    value: action.value,
                    text: action.text,
                },
                ...resetOptions(),
            };

        case "SET_GUESTS":
            return {
                ...state,
                guests: action.payload,
                ...resetOptions(),
            };

        case "SET_YACHT_TYPE":
            return {
                ...state,
                yachtType: action.payload,
                ...resetOptions(),
            };

        case "SET_MEMBER_SPECIAL":
            return {
                ...state,
                memberSpecials: action.payload,
                ...resetOptions(),
            };

        case "SET_ALL_INCLUSIVE":
            return {
                ...state,
                allInclusive: action.payload,
                ...resetOptions(),
            };

        case "SET_YACHT_SIZE":
            return {
                ...state,
                yachtSize: action.payload,
                ...resetOptions(),
            };

        case "SET_CHARTER_FILTER":
            return {
                ...state,
                charters: action.payload,
                ...resetOptions(),
            };

        case "SET_YACHT_IDS":
            return {
                ...state,
                yachtIDs: action.payload,
            };

        case "READ_LOCAL_STORAGE":
            return {
                ...JSON.parse(action.payload),
            };

        case "REMAINING_YACHT_LOADED":
            return {
                ...state,
                yachtsLoaded: true,
            };

        case "RESET_FILTERS":
            return {
                ...state,
                searchText: null,
                locationObject: {
                    clear: true,
                },
                sortBy: null,
                region: 0,
                guests: 0,
                allInclusive: false,
                memberSpecials: false,
                yachtSize: null,
                resetFilter: true,
                yachtType: null,
                charters: "weekly-charter",
                price: {
                    ...state.price,
                    value: "all",
                    text: "all",
                },
                yachtIDs: null,
            };

        default:
            return state;
    }
};