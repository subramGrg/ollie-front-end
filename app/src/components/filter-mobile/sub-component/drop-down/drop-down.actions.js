import moment from "moment";

// FIXME: move to calendar.actions (create)
export const setCalendarFocus = (payload) => ({
    type: "SET_CALENDAR_FOCUS",
    payload,
});

export const setMobileFilter = () => ({
    type: "SET_MOBILE_FILTER",
});

export const setCalendarResult = (searched) => ({
    type: "SET_CALENDAR_RESULT",
    payload: searched,
});

export const setDesktopCalendarFocus = (payload) => ({
    type: "SET_DESKTOP_CALENDAR_FOCUS",
    payload,
});

export const setCalendarLocalStorage = (calendar) => {
    const {
        startDate,
        endDate,
    } = JSON.parse(calendar);
    const payload = {
        startDate: moment(startDate),
        endDate: moment(endDate),
    };

    return {
        type: "SET_CALENDAR_LOCAL_STORAGE",
        payload,
    };
};

export const setDatesFromSession = (payload) => {
    const {
        startDate,
        endDate,
    } = JSON.parse(payload);

    return {
        type: "SET_DATES_FROM_SESSION",
        payload: {
            startDate,
            endDate,
        },
    };
};