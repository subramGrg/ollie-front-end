const initialState = {
    offSet: 12,
    favourites: "",
    favouriteSpinning: false,
    pickedYacht: null,
    yachtsLoading: true,
    yachts: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_YACHTS":
            return {
                ...state,
                yachts: action.payload,
            };

        case "SET_YACHTS_LOADING":
            // in yacht-search, yacht list loading
            return {
                ...state,
                yachtsLoading: !state.yachtsLoading,
            };

        case "LOAD_MORE":
            // in yacht-search 
            return {
                ...state,
                offSet: action.payload,
            };

        case "SET_FAVOURITES":
            // in yacht-search 
            return {
                ...state,
                favourites: action.payload,
            };

        case "APPEND_YACHTS":
            return {
                ...state,
                yachts: [
                    ...state.yachts,
                    ...action.payload
                ],
            };

        case "SET_FAVOURITES_SPINNER":
            // in yacht-search 
            return {
                ...state,
                favouriteSpinning: action.payload.favouriteSpinning,
                pickedYacht: action.payload.yacht,
            };

        default:
            return state;
    }
};