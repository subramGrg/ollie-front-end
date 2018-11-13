import React from "react";

import {
    YachtTypeFilter,
    AllInclusiveFilter,
    YachtSizeFilter,
    SortByFilter,
    YachtName,
    PriceRangeDropDown
} from "helpers";

import "./more-filter.scss";

const getPrice = (salePage) => {
    const jsx = (salePage) ?
        "" : <React.Fragment>
            <p styleName="title">price range</p>

            <div styleName="price__range">
                <PriceRangeDropDown />
            </div>
        </React.Fragment>;

    return jsx;
};

const getSortBy = (salePage) => {
    return (salePage) ?
        <SortByFilter sortBy="SalePrice" /> : <SortByFilter />;
};

const MoreFilterOptions = ({ salePage, }) => <React.Fragment>

    <YachtName />

    <div styleName="selectable__wrapper">
        <p styleName="title">yacht type</p>
        <YachtTypeFilter />

        <p styleName="title">size</p>
        <YachtSizeFilter />

        {getPrice(salePage)}

        {(salePage) ?
            "" : <AllInclusiveFilter />}

        <p className="filters__sort">
            sort by
        </p>

        {getSortBy(salePage)}
    </div>
</React.Fragment>;

export { MoreFilterOptions };