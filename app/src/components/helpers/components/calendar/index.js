import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Dates from "./calendar.component";
import * as dropDownActions from "filter-mobile/sub-component/drop-down/drop-down.actions";
import * as filterActions from "filters/filters.api";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...filterActions,
        ...dropDownActions,
    }, dispatch,
    ),
});

const mapStateToProps = (store) => {
    return {
        calendar: store.modalReducer.calendar,
        mobileFocusedInput: store.modalReducer.calendarFocusedInput,
        desktopFocusedInput: store.modalReducer.desktopCalendarFocusedInput,
        yachts: store.yachtsListReducer.yachts,
        yachtsBooked: store.yachtsListReducer.bookedDatesForCalendar,
        filter: store.modalReducer.mobileFilter,
    };
};

const Calendar = connect(mapStateToProps, mapDispatchToProps)(Dates);
export { Calendar };