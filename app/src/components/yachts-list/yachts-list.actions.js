import { http } from "lib";

export const setYachts = (yachts) => {
    // randomise featured
    return {
        type: "SET_YACHTS",
        payload: yachts,
    };
};

export const setYachtsLoading = () => ({
    type: "SET_YACHTS_LOADING",
});

export const setLoadMore = (offset) => {
    return {
        type: "LOAD_MORE",
        payload: offset,
    };
};

export const setFavourites = (payload) => {
    return {
        type: "SET_FAVOURITES",
        payload,
    };
};

export const setFavouritesSpinner = (payload) => {
    return {
        type: "SET_FAVOURITES_SPINNER",
        payload,
    };
};

export const getFavourites = () => (dispatch) => {
    const url = "/Umbraco/Api/Fave/GetFaves";

    http(url)
        .then(faves => {
            dispatch(
                setFavourites(faves.data)
            );
        })
        .catch();
};

export const updateFavourites = (id) => (dispatch) => {
    const url = `/Umbraco/Api/Fave/FaveYacht?yachtID=${id}`;

    http(url)
        .then(() => {
            dispatch(
                getFavourites()
            );
        })
        .then(() => {
            dispatch(
                setFavouritesSpinner(false)
            );
        })
        .catch();
};

export const appendYachts = (yachts) => {
    return {
        type: "APPEND_YACHTS",
        payload: yachts,
    };
};