import React from "react";
import autobind from "autobind-decorator";

import YachtsList from "yachts-list/yachts-list.container";
import Filters from "filters/filters.container";
import ForSaleFilter from "sale-filter/sale-filter.container";
import FilterMobile from "filter-mobile/filter.mobile.container";

import pluralize from "pluralize";
import moment from "moment";
import "./yacht-search.scss";

class YachtSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Checks if querystring is present
     * @returns { String }
     * @memberof YachtSearch
     */
    hasQueryString() {
        return window.location.href.split("?")[1];
    }

    /**
     * checks if shareable link  
     * @returns { String }  filters in base64 code
     * @memberof YachtSearch
     */
    getShareLink() {
        const url = window.location.search.split("?");
        try {
            const shareCode = url[1].split("=");

            if (shareCode[0] !== "filter") {
                throw Error();
            }

            return shareCode[1];
        } catch (error) {
            return false;
        }
    }

    @autobind
    regionIdInQuery() {
        const regionQueryString = this.hasQueryString();
        const regionToSelect = {};

        if (regionQueryString) {
            regionQueryString.split("&").forEach((elem) => {
                if (elem.includes("region")) {
                    regionToSelect.regionid = elem.split("=")[1];
                } else if (elem.includes("realm")) {
                    regionToSelect.realmid = elem.split("=")[1];
                } else if (elem.includes("port")) {
                    regionToSelect.portid = elem.split("=")[1];
                } else if (elem.includes("dest")) {
                    regionToSelect.name = elem.split("=")[1];
                }
            });
        }

        return regionToSelect;
    }

    @autobind
    dateFromInQuery() {
        const dateFromQueryString = window.location.href.split("?")[1];
        let dateFromToSelect;

        if (dateFromQueryString) {
            dateFromQueryString.split("&").forEach((elem) => {
                if (!elem.includes("from")) {
                    return;
                }

                dateFromToSelect = elem.split("=")[1];
            });
        }

        return dateFromToSelect;
    }

    @autobind
    dateToInQuery() {
        const dateToQueryString = window.location.href.split("?")[1];
        let dateToToSelect;

        if (dateToQueryString) {
            dateToQueryString.split("&").forEach((elem) => {
                if (!elem.includes("to")) {
                    return;
                }

                dateToToSelect = elem.split("=")[1];
            });
        }

        return dateToToSelect;
    }

    @autobind
    showMoreYachts() {
        const {
            setLoadMore,
            yachtOffSet,
        } = this.props;
        this.yachtOffset = yachtOffSet + 12;

        setLoadMore(
            this.yachtOffset
        );
    }

    @autobind
    showRegions() {
        // filters.api
        const {
            setRegions,
            getRegions,
        } = this.props;

        return getRegions()
            .then(regions => {
                regions.unshift({
                    ID: 0,
                    Name: "All",
                });
                setRegions(regions);
            });
    }

    @autobind
    loadSpinner() {
        return <p styleName="loader">
            Loading <span>.</span><span>.</span><span>.</span>
        </p>;
    }

    @autobind
    createView() {
        const {
            yachts,
            yachtsWithoutFilter,
            salePage,
            yachtsLoaded,
            yachtsLoading,
        } = this.props;

        const yachtCount = pluralize("yacht", yachts.length);
        const filterMessage = (yachts.length !== yachtsWithoutFilter.length) ?
            <span styleName="message">
                Filter applied to these results
            </span> : "";

        const totalYachts = (yachtsLoaded && !yachtsLoading) ?
            <React.Fragment>
                {yachts.length} {yachtCount} found

                {filterMessage}
            </React.Fragment> : <React.Fragment>
                <span styleName="loader"></span>
                <span styleName="loader"></span>
                <span styleName="loader"></span>
                <span styleName="loader"></span>
            </React.Fragment>;

        const yachtsFound = <p styleName="total">
            {totalYachts}
        </p>;

        const filter = (salePage) ?
            <ForSaleFilter /> : <Filters />;

        return (
            <div className="container" styleName="wrapper">
                <div
                    styleName="header-wrapper">
                    {yachtsFound}
                </div>

                <FilterMobile
                    yachtsFound={yachtsFound}
                    salePage={salePage} />

                <div styleName="result" >
                    <YachtsList
                        yachts={yachts}
                        showMoreYachts={this.showMoreYachts}
                        salePage={salePage} />

                    {filter}
                </div>
            </div>
        );
    }

    /**
     * calls endpoints synchronously
     * @property { Function } getAllYachts in search.api.js
     * @property { Function } remainingYachtLoaded in search.api.js
     * @property { Function } getYachtsForSale in search.api.js
     * @property { Function } setSharedFilters in share-filters.actions
     * @memberof YachtSearch
     */
    async getYachtsAndLocations(getYachts) {
        const {
            salePage,
            getAllYachts,
            remainingYachtLoaded,
            getYachtsForSale,
            setSharedFilters,
        } = this.props;

        if (salePage) {
            return getYachtsForSale();
        }

        if (getYachts) {
            const isItShareLink = this.getShareLink();

            // request for yachts
            // dont request when calendar used 
            await this.showRegions();
            await getAllYachts(false, 30);

            await getAllYachts(true, 4000, 30)
                .then(res => {
                    if (isItShareLink) {
                        return "skip cause of filters";
                    }

                    remainingYachtLoaded();
                });

            if (isItShareLink) {
                await setSharedFilters(isItShareLink);
            }
        }
    }

    /**
     * @property { Function } setLocation in filters.actions
     * @property { Function } setYachtSearchByQueryString in filters.actions
     * @memberof YachtSearch
     */
    componentDidMount() {
        // action from regions.actions.js
        const {
            setYachtSearchByQueryString,
            setLocation,
        } = this.props;
        let getYachts = true;

        if (this.dateFromInQuery() && this.dateToInQuery()) {
            // dates in querystring (eg:home & destination pages)
            const searchDates = {
                startDate: moment(this.dateFromInQuery()),
                endDate: moment(this.dateToInQuery()),
                first: true,
            };

            setYachtSearchByQueryString(searchDates);

            getYachts = false; // dont request for yachts
        }

        this.getYachtsAndLocations(getYachts);

        const queryString = this.hasQueryString();
        if (queryString && queryString.includes("region=")) {
            // directed from destination page
            // set yachts depending on region and destination
            setLocation(this.regionIdInQuery());
        }
    }

    render() {
        const {
            yachtsLoading,
        } = this.props;

        const yachtList = (yachtsLoading) ? this.loadSpinner()
            : this.createView();

        return (
            yachtList
        );
    }
}

export default YachtSearch;