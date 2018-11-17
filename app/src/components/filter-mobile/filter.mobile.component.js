import React from "react";
import autobind from "autobind-decorator";

import DropDown from "./sub-component/drop-down/drop-down.container";
import {
    Calendar,
    Location,
    Charter,
    Guest,
    GuestsDropDown,
    SearchBox,
    MoreFilterOptions,
    ShareFiltersButton
} from "helpers";

import "./filter.mobile.scss";

/**
 * Creates filter for mobile
 * @instance in yacht-search.component
 * @class FilterMobile
 * @extends {React.Component}
 */
class FilterMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedButton: null,
        };
    }

    /**
     * reset filtered result
     * @param { String } getAllYachts in search.api.js
     * @param { String } setYachtsLoading in search.api.js
     * @param { String } clearFilters in filters.actions.js
     * @param { String } setCalendarResult in modal.actions.js
     * @memberof Filterk
    */
    @autobind
    resetResult() {
        const {
            clearFilters,
            getAllYachts,
            setCalendarResult,
            calendarSearch,
            setYachtsLoading,
        } = this.props;

        clearFilters();

        if (!calendarSearch) {
            return "dont set result of calendar";
        }
        // search from calendar picker
        setYachtsLoading();
        setCalendarResult(false);
        getAllYachts();
    }

    /**
     * hides/shows dropdown filters
     * @param {Event} event
     * @property {Function} setMobileFilter drop-down.actions
     * @memberof FilterMobile
     */
    @autobind
    handleClick(event) {
        const button = event.target.dataset.type;
        const activeButton = (this.state.selectedButton === button) ?
            null : button;

        this.setState({
            selectedButton: activeButton,
        });

        // show/hide extra filters
        this.props.setMobileFilter();
    }

    /**
     * compares if current button is clicked
     * @param {String} elem click button
     * @returns {Boolean}
     * @memberof FilterMobile
     */
    @autobind
    isActive(elem) {
        return (elem === this.state.selectedButton) ?
            "active" : "";
    }

    /**
     * creates HTML for total yachts & clear
     * @returns {HTMLElement}
     * @memberof FilterMobile
     */
    @autobind
    totalYachts() {
        return <div
            styleName="wrapper"
            key="mobileNav">

            {this.props.yachtsFound}

            <div
                styleName="mobile__filter"
                onClick={this.resetResult}>

                clear
            </div>
        </div>;
    }

    /**
     * creates the dropdown after clicking "more" on mobile
     * @property {String} selectedButton show corresponding filters 
     * @returns {React.Component} guest or assorted filters
     * @memberof FilterMobile
     */
    @autobind
    dropDownFilters() {
        switch (this.state.selectedButton) {
            case "guests":
                return <GuestsDropDown />;
            case "more":
                return <MoreFilterOptions />;
            default:
                return null;
        }
    }

    /**
     * creates filter options
     * @property {Function} handleClick yacht-search.component
     * @returns {HTMLElement}
     * @memberof FilterMobile
     */
    @autobind
    filters() {
        const {
            regionsList,
            selectedRegion,
            locationObject,
            shareItFilters,
        } = this.props;

        const isMoreActive = (this.isActive("more")) ?
            "ahoyclub-up" : "ahoyclub-down";
        // check if share it object has any filters
        const shareItButton = (Object.keys(shareItFilters).length > 0) ?
            <ShareFiltersButton /> : "";

        return <div
            styleName="menu"
            key="filters">
            
            {shareItButton}

            <div styleName="option__wrapper">
                <Location
                    regions={regionsList}
                    currentRegion={selectedRegion}
                    selectedLocation={locationObject} />
            </div>

            <div styleName="option__wrapper">
                <Calendar
                    ahoyFont="ahoyclub-calendar"
                    mobile />
            </div>

            <div
                styleName={`option__wrapper extra__filter ${this.isActive("guests")}`}
                onClick={this.handleClick}>

                <Guest
                    isActive={this.isActive("guests")} />

                {/* FIXME: move to a component */}
                <SearchBox
                    icon={isMoreActive}
                    htmlClass={`more__filter ${this.isActive("more")}`}
                    iconDataType="more">

                    <button
                        className="more__filter_mobile"
                        styleName={`item ${this.isActive("more")}`}
                        data-type="more">
                        More
                    </button>
                </SearchBox>
            </div>

            <DropDown>
                {this.dropDownFilters()}
            </DropDown>

            <div styleName="option__wrapper">
                <Charter />
            </div>
        </div>;
    }

    /**
     * @returns {Object} has filter & nav View
     * @property {String} yachtsLoading checks if there's yachts
     * @memberof FilterMobile
     */
    @autobind
    createComponent() {
        const {
            yachtsLoading,
        } = this.props;

        if (yachtsLoading) {
            return "yachts still loading";
        }

        return {
            filters: this.filters(),
            totalYachts: this.totalYachts(),
        };
    }

    render() {
        const {
            totalYachts,
            filters,
        } = this.createComponent();
        const {
            salePage,
        } = this.props;

        return (
            <React.Fragment>
                {(salePage) ?
                    <div styleName="sale__wrapper">
                        <MoreFilterOptions salePage={salePage} />
                    </div>
                    : filters}

                {totalYachts}
            </React.Fragment>
        );
    }
}

export default FilterMobile;