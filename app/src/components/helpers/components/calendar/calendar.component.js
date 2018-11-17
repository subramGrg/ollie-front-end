import React from "react";

import "lib/react-dates/initialize";
import { DateRangePicker } from "lib/react-dates/src";

import "react-date-css";
import "./calendar.scss";

class Dates extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * sets focus of calendar i.e from/to input
     * @property {Function} setCalendarFocus drop-down.actions
     * @property {Function} setDesktopCalendarFocus drop-down.actions
     * @param {String} focusedInput
     * @param {boolean} [desktop=false]
     * @memberof Dates
     */
    handleFocus(focusedInput) {
        const {
            setCalendarFocus,
            setDesktopCalendarFocus,
            desktop,
        } = this.props;

        if (desktop) {
            setDesktopCalendarFocus(focusedInput);
        } else {
            setCalendarFocus(focusedInput);
        }
    }

    /**
     * sets from & to dates for api call 
     * @property {Function} setCalendarDates sets dates. in filter.actions
     * @param {Moment} dates
     * @memberof Dates
     */
    handleSelectedDates(dates) {
        this.props.setCalendarDates(dates);
    }

    /**
     * calls redux actions to make api calls
     * @property {Moment} calendar in drop-down.actions
     * @property {Function} setCalendarFocus drop-down.actions
     * @property {Function} setDesktopCalendarFocus in drop-down.actions
     * @property {Function} setCalendarResult in drop-down.actions
     * @property {Function} setYachtSearch api call in filter.actions
     * @memberof Dates
     */
    handleApply() {
        const {
            setYachtSearch,
            calendar,
            setDesktopCalendarFocus,
            setCalendarResult,
            setCalendarFocus,
        } = this.props;

        setCalendarResult(true);
        setYachtSearch(calendar, true);
        setDesktopCalendarFocus(null);
        setCalendarFocus(null);
    }

    componentDidMount() {
        const storageHasDates = sessionStorage.getItem("calendar");
        
        if (!storageHasDates) {
            return "no dates in storage";
        }
        // read from storage
        this.props.setDatesFromSession(storageHasDates);
    }

    render() {
        const {
            calendar,
            desktop,
            mobileFocusedInput,
            desktopFocusedInput,
            ahoyFont,
        } = this.props;
        const focusedInput = (desktop) ?
            desktopFocusedInput : mobileFocusedInput;
        const startDateText = (calendar.startDate) ?
            calendar.startDate.format("DD MMM") : "From";
        const endDateText = (calendar.endDate) ?
            calendar.endDate.format("DD MMM") : "To";

        return (
            <div styleName="wrapper">
                <DateRangePicker
                    startDatePlaceholderText={startDateText}
                    endDatePlaceholderText={endDateText}
                    navPrev={<i className="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i>}
                    navNext={<i className="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i>}
                    startDate={calendar.startDate}
                    startDateId={`${desktop}start_date_id`}
                    endDate={calendar.endDate}
                    endDateId={`${desktop}end_date_id`}
                    onDatesChange={dates => this.handleSelectedDates(dates)}
                    onFocusChange={focusedInput => this.handleFocus(focusedInput)}
                    focusedInput={focusedInput}
                    numberOfMonths={1}
                    firstDayOfWeek={1}
                    daySize={30}
                    transitionDuration={0}
                    parentElement=".desktop-calendar"
                    keepOpenOnDateSelect={true}
                    applySearch={() => this.handleApply()}
                    displayFormat="DD MMM YYYY"
                    ahoyFont={ahoyFont}
                    showClearButton
                />
            </div>
        );
    }
}

export default Dates;