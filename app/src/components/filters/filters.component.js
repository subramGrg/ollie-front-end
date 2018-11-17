import React from "react";
import autobind from "autobind-decorator";

import DropDown from
    "filter-mobile/sub-component/drop-down/drop-down.container";
import {
    YachtTypeFilter,
    AllInclusiveFilter,
    ShareFiltersButton,
    YachtSizeFilter,
    SortByFilter,
    Calendar,
    Charter,
    YachtName,
    Location,
    Guest,
    GuestsDropDown,
    PriceRange,
    PriceRangeDropDown,
    FilterPanel
} from "helpers";

import "./filters.scss";

/**
 * Filter panel on yacht-search
 * @class Filter
 * @extends {React.Component}
 */
class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSortBy: null,
        };
    }

    /**
     * active clicked sort option
     * @param {String} type as active
     * @memberof Filter
     */
    changeSortActive(type) {
        type = (this.state.selectedSortBy === type) ?
            null : type;

        this.setState({
            selectedSortBy: type,
        });
    }

    /**
    * only when "sort by" option has changed. 
    */
    shouldComponentUpdate(nextProps) {
        const {
            sortBy,
            locationObject,
            priceRange,
            dropDownActive,
        } = this.props;

        return (nextProps.sortBy !== sortBy) ||
            (nextProps.locationObject !== locationObject) ||
            (nextProps.priceRange.dropDownActive !==
                priceRange.dropDownActive) ||
            (nextProps.dropDownFilter !== dropDownActive);
    }

    /**
    * creates the dropdown after clicking "more" on mobile
    * @property {Boolean} guestsDropDown show corresponding filters 
    * @returns {React.Component} guest or assorted filters
    * @memberof FilterMobile
    */
    @autobind
    dropDownFilters() {
        if (this.props.dropDownFilter) {
            return <GuestsDropDown />;
        }
    }

    /**
     * hides/shows dropdown filters
     * @param {Event} event
     * @property {Function} setMobileFilter drop-down.actions
     * @memberof FilterMobile
     */
    @autobind
    handleGuestDropDown(event) {
        if (event.target.classList.contains("guest__option")) {
            // show/hide extra filters
            this.props.setMobileFilter();
        }
    }

    /**
     * @property {Function} setAllInclusive in filters.actions
     * @property { Object } shareItFilters in share-filters.reducer
     * @memberof Filter
     */
    render() {
        const {
            regionsList,
            selectedRegion,
            locationObject,
            priceRange,
            dropDownFilter,
            shareItFilters,
        } = this.props;

        const isPriceRangeActive = (priceRange.dropDownActive) ?
            "active" : null;
        // check if share it object has any filters
        const shareItButton = (Object.keys(shareItFilters).length > 0) ?
            <ShareFiltersButton /> : "";

        return (
            <div styleName="wrapper">
                {shareItButton}
                
                <FilterPanel>
                    <React.Fragment>
                        <div styleName="option__wrapper">
                            <Location
                                regions={regionsList}
                                selectedLocation={locationObject}
                                currentRegion={selectedRegion} />
                        </div>

                        <div styleName="option__wrapper">
                            <Calendar
                                ahoyFont="ahoyclub-calendar"
                                desktop={true} />
                        </div>

                        <div
                            styleName="option__wrapper"
                            onClick={this.handleGuestDropDown}>

                            <Guest />
                            <DropDown>
                                {(dropDownFilter) ?
                                    <GuestsDropDown /> : ""}
                            </DropDown>
                        </div>

                        <div styleName="option__wrapper">
                            <YachtName />
                        </div>

                        <div
                            styleName="option__wrapper">

                            <PriceRange />

                            <div className="price__range">
                                <DropDown>
                                    {(isPriceRangeActive) ?
                                        <PriceRangeDropDown /> : ""}
                                </DropDown>
                            </div>
                        </div>
                    </React.Fragment>

                    <React.Fragment>
                        <p styleName="name">
                            yacht type
                        </p>

                        <YachtTypeFilter />
                    </React.Fragment>

                    <React.Fragment>
                        <p styleName="name">
                            yacht size (metres)
                        </p>

                        <YachtSizeFilter />
                    </React.Fragment>

                    <React.Fragment>
                        <Charter />
                    </React.Fragment>

                    <React.Fragment>
                        <AllInclusiveFilter />
                    </React.Fragment>

                    <React.Fragment>
                        <p className="filters__sort">
                            Sort by
                        </p>

                        <SortByFilter />
                    </React.Fragment>
                </FilterPanel>
            </div>
        );
    }
}

export default Filter;