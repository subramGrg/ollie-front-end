const initalState = {
    share: {},
};

/*
* store that looks after shareable link
*/
export default (state = initalState, action) => {
    switch (action.type) {
        case "SET_SEARCH_TEXT":
            return {
                share: {
                    ...state.share,
                    searchText: action.payload,
                },
            };

        case "SET_PRICE_RANGE":
            return {
                share: {
                    ...state.share,
                    price: {
                        value: action.value,
                        text: action.text,
                    },
                },
            };

        case "SET_GUESTS":
            return {
                share: {
                    ...state.share,
                    guests: action.payload,
                },
            };

        case "SET_YACHT_TYPE":
            return {
                share: {
                    ...state.share,
                    yachtType: action.payload,
                },
            };

        case "SET_MEMBER_SPECIAL":
            return {
                share: {
                    ...state.share,
                    memberSpecials: action.payload,
                },
            };

        case "SET_ALL_INCLUSIVE":
            return {
                share: {
                    ...state.share,
                    allInclusive: action.payload,
                },
            };

        case "SET_YACHT_SIZE":
            return {
                share: {
                    ...state.share,
                    yachtSize: action.payload,
                },
            };

        case "SET_CHARTER_FILTER":
            return {
                share: {
                    ...state.share,
                    charters: action.payload,
                },
            };

        case "SET_LOCATION":
            return {
                share: {
                    ...state.share,
                    locationObject: action.payload,
                    region: 0,
                },
            };

        case "SET_SORT_BY":
            return {
                share: {
                    ...state.share,
                    sortBy: action.payload,
                    sortByDescending: {
                        ...state.sortByDescending,
                        [action.payload]: action.sortByDescending,
                    },
                },
            };

        case "SET_CALENDAR_DATES":
            return {
                share: {
                    ...state.share,
                    calendar: {
                        startDate: action.payload.startDate &&
                            action.payload.startDate.format("YYYY-MM-DD"),
                        endDate: action.payload.endDate &&
                            action.payload.endDate.format("YYYY-MM-DD"),
                    },
                },
            };

        case "INITIALISE_SHARE":
            return {
                share: action.payload,
            };

        case "RESET_FILTERS":
            return {
                share: {},
            };

        default:
            return state;
    }
};