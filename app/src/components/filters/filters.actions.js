export const setSearchText = (text) => {
    return {
        type: "SET_SEARCH_TEXT",
        payload: text,
    };
};

export const setLocation = (payload) => {
    return {
        type: "SET_LOCATION",
        payload,
    };
};

export const clearFilters = () => {
    // clear session item
    sessionStorage.removeItem("filter");
    sessionStorage.removeItem("calendar");

    return {
        type: "RESET_FILTERS",
        payload: "",
    };
};

export const setSortBy = (sort) => {
    return {
        type: "SET_SORT_BY",
        payload: sort.sortBy,
        sortByDescending: sort.order,
    };
};

export const setRegions = (regions) => {
    return {
        type: "SET_REGIONS",
        payload: regions,
    };
};

export const setSelectedRegion = (region) => {
    return {
        type: "SET_SELECTED_REGION",
        payload: region,
    };
};

export const setGuests = (guests) => {
    return {
        type: "SET_GUESTS",
        payload: guests,
    };
};

export const setYachtType = (type) => ({
    type: "SET_YACHT_TYPE",
    payload: type,
});

export const setMemberSpecial = (payload) => ({
    type: "SET_MEMBER_SPECIAL",
    payload: payload,
});

export const setAllInclusive = (payload) => ({
    type: "SET_ALL_INCLUSIVE",
    payload,
});

export const setYachtSize = (size) => ({
    type: "SET_YACHT_SIZE",
    payload: size,
});

export const setCharter = (charter) => ({
    type: "SET_CHARTER_FILTER",
    payload: charter,
});

export const setPriceRange = (priceRange) => ({
    type: "SET_PRICE_RANGE",
    text: priceRange.text,
    value: priceRange.value,
});

export const setPriceRangeDropDown = () => ({
    type: "SET_PRICE_RANGE_DROP_DOWN",
});

export const setYachtIDs = (ids) => ({
    type: "SET_YACHT_IDS",
    payload: ids,
});

export const setYachtSearchByQueryString = (date) => ({
    type: "SET_YACHT_SEARCH_BY_QUERYSTRING",
    payload: date,
});

export const readLocalStorage = (payload) => ({
    type: "READ_LOCAL_STORAGE",
    payload,
});

export const remainingYachtLoaded = () => ({
    type: "REMAINING_YACHT_LOADED",
});

// FIXME: move to calendar.actions (create)
export const setCalendarDates = (payload) => ({
    type: "SET_CALENDAR_DATES",
    payload,
});