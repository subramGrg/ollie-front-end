import axios from "axios";
import {
    apiToken,
    apiDomain
} from "../../config";
import { setYachtsLoading } from "yachts-list/yachts-list.actions";
import { http } from "lib";
import {
    setYachtIDs,
    setCalendarDates,
    remainingYachtLoaded
} from "filters/filters.actions";

// FIXME: regions not supported anymore
export const getRegions = () => async () => {
    const response = await axios({
        method: "GET",
        url: `${apiDomain}/locations`,
        headers: {
            "api-token": apiToken,
        },
    });

    return response.data;
};

const setYachtSearch = (searchDates, showDates = false) => (dispatch) => {
    if (!searchDates.startDate || !searchDates.endDate) {
        return "start date not selected";
    }

    const url = `${apiDomain}/charters/available`;
    const headers = {
        "api-token": apiToken,
    };

    if (!searchDates.first) {
        dispatch(setYachtsLoading());
    }

    http(url, {
        method: "GET",
        headers,
        body: {},
        params: {
            page: 0,
            with_photos: true,
            datefrom: searchDates.startDate.format("YYYY-MM-DD"),
            dateto: searchDates.endDate.format("YYYY-MM-DD"),
        },
    })
        .then(yachts => {
            // for search by dates
            dispatch(
                setYachtIDs(yachts.data.Results)
            );
        })
        .then(() => {
            if (!searchDates.first) {
                dispatch(setYachtsLoading());
            }

            // set remaining yachts as loaded
            // also display total yachts
            dispatch(
                remainingYachtLoaded()
            );

            if (showDates) {
                return "retain picked dates on picker";
            }

            dispatch(
                setCalendarDates({
                    startDate: searchDates.startDate,
                    endDate: searchDates.endDate,
                })
            );
        });
};

export { setYachtSearch };
export * from "./filters.actions";