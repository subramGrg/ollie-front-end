import moment from "moment";

export const shareHasDates = (json) => {
    let decodedFilters;
    try {
        decodedFilters = JSON.parse(
            atob(json)
        );
    } catch (error) {
        console.log("Decoding dates error");

        return {
            valid: false,
        };
    }

    const {
        startDate,
        endDate,
    } = decodedFilters.calendar;

    if (!startDate && !endDate) {
        return {
            valid: false,
        };
    }

    // set search dates strings in share filter
    return {
        valid: true,
        startDate: moment(startDate),
        endDate: moment(endDate),
    };
};