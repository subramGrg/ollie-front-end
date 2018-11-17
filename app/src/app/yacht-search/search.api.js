import { apiToken, apiDomain } from "config";
import { http } from "lib";
import {
    setYachtsLoading,
    appendYachts
} from "yachts-list/yachts-list.actions";
import {
    remainingYachtLoaded
} from "filters/filters.actions";

export const getAllYachts = (
    disableLoading = false, yacthsToGet = null, yachtPage = 0
) => (dispatch) => {

    const url = `${apiDomain}/charters/search`;
    const headers = {
        "Content-Type": "application/json",
        "api-token": apiToken,
    };

    return http(url, {
        method: "GET",
        headers,
        body: {},
        params: {
            with_photos: true,
            limit: yacthsToGet,
            after: yachtPage,
        },
    })
        .then(yachts => {
            yachts = yachts.data.Results;

            // randomise the order of featured yachts
            const featuredYachts = yachts.filter(y => y.Featured)
                .map((a) => ({ sort: Math.random(), value: a, }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value);
            const sortedYachts = [
                ...featuredYachts,
                ...yachts.slice(featuredYachts.length)
            ];

            dispatch(
                appendYachts(sortedYachts)
            );
        })
        .then(result => {
            if (!disableLoading) {
                dispatch(
                    setYachtsLoading()
                );
            }
        });
};

export const getYachtsForSale = () => (dispatch) => {
    const url = `${apiDomain}/charters/search`;
    const headers = {
        "Content-Type": "application/json",
        "api-token": apiToken,
    };

    return http(url, {
        method: "GET",
        headers,
        body: {},
        params: {
            is_for_sale: 1,
        },
    })
        .then(yachts => {
            dispatch(
                appendYachts(yachts.data.Results)
            );
        })
        .then(result => {
            dispatch(
                remainingYachtLoaded()
            );

            dispatch(
                setYachtsLoading()
            );
        });
};