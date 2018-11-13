import React from "react";
import { SelectableFilter } from "helpers";

import "./sort-by.scss";

/**
 * calls redux action to change sort by
 * @param {String} order by type
 * @property {Function} setSortBy in filters.actions
 * @property {String} sortByDescending in filters reducer
 */
const handleClick = (props, event) => {
    let sort = event.target.dataset.type;

    // price has different name in api
    if (sort === "price") {
        sort = "WeeklyRate";
    }

    const orderBy = (sort === "SalePrice") ?
        sort : `${sort[0].toUpperCase()}${sort.slice(1).toLowerCase()}`;
    props.setSortBy({
        sortBy: orderBy,
        order: !props.sortByDescending[orderBy],
    });
};

const SortBy = (props) => {
    return <div styleName="wrapper">
        <SelectableFilter
            handleClick={(event) => handleClick(props, event)}
            selectedOption={props.selectedOption}
            clearSelected={props.resetFilter}
            childrenWithIcon >

            <React.Fragment>
                <span
                    data-type="Length"
                    styleName="chevron"
                    className={`${props.sortByDescending.Length ?
                        "ahoyclub-down" : "ahoyclub-up"} selectable__chevron`}>
                </span>
                <p
                    data-type="Length"
                    key="Length">
                    length
                </p>
            </React.Fragment>
            <React.Fragment>
                <span
                    data-type={props.sortBy}
                    styleName="chevron"
                    className={`${props.sortByDescending[props.sortBy] ?
                        "ahoyclub-down" : "ahoyclub-up"} selectable__chevron`}>
                </span>
                <p
                    data-type={props.sortBy}
                    key={props.sortBy}>
                    price
                </p>
            </React.Fragment>
        </SelectableFilter>
    </div>;
};

SortBy.defaultProps = {
    sortBy: "Weeklyrate",
};

export default SortBy;