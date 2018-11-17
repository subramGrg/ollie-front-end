import React from "react";

import {
    YachtTypeFilter,
    YachtSizeFilter,
    SortByFilter,
    YachtName,
    FilterPanel
} from "helpers";

import "./sale-filter.scss";

/**
 * Filter panel on yacht-search
 * @class Filter
 * @extends {React.Component}
 */
class ForSaleFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
    * only when "sort by" option has changed. 
    */
    shouldComponentUpdate(nextProps) {
        const {
            sortBy,
            priceRange,
        } = this.props;

        return (nextProps.sortBy !== sortBy) ||
            (nextProps.priceRange.dropDownActive !== priceRange.dropDownActive);
    }

    /**
     * @property {Function} setAllInclusive in filters.actions
     * @memberof Filter
     */
    render() {
        return (
            <div styleName="wrapper">
                <FilterPanel>
                    <React.Fragment>
                        <div styleName="option__wrapper">
                            <YachtName />
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
                        <p className="filters__sort">
                            Sort by
                        </p>

                        <SortByFilter 
                            sortBy="SalePrice" />
                    </React.Fragment>
                </FilterPanel>
            </div>
        );
    }
}

export default ForSaleFilter;