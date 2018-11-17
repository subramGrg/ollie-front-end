const initialState = {
    mobileFilter: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_MOBILE_FILTER":
            return {
                ...state,
                mobileFilter: !state.mobileFilter,
            };
        default:
            return state;
    }
};