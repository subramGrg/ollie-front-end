import moment from "moment";

const initialState = {
    calendar: {
        startDate: null,
        endDate: null,
    },
    calendarFocusedInput: null,
    mobileFilter: false,
    desktopCalendarFocusedInput: null,
    calendarSearch: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_CALENDAR_DATES":
            return {
                ...state,
                calendar: {
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                },
            };
        case "SET_CALENDAR_FOCUS":
            return {
                ...state,
                calendarFocusedInput: action.payload,
            };
        case "SET_DESKTOP_CALENDAR_FOCUS":
            return {
                ...state,
                desktopCalendarFocusedInput: action.payload,
            };
        case "SET_CALENDAR_RESULT":
            return {
                ...state,
                calendarSearch: action.payload,
            };
        case "SET_MOBILE_FILTER":
            return {
                ...state,
                mobileFilter: !state.mobileFilter,
            };
        case "SET_CALENDAR_LOCAL_STORAGE":
            return {
                ...state,
                calendar: action.payload,
            };
        case "SET_DATES_FROM_SESSION":
            return {
                ...state,
                calendar: {
                    startDate: moment(action.payload.startDate),
                    endDate: moment(action.payload.endDate),
                },
            };
        case "RESET_FILTERS":
            return {
                calendar: {
                    startDate: null,
                    endDate: null,
                },
                calendarFocusedInput: null,
                mobileFilter: false,
                desktopCalendarFocusedInput: null,
                calendarSearch: false,
            };
        default:
            return state;
    }
};