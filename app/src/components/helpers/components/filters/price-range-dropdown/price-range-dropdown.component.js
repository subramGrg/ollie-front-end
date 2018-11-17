import React from "react";

import "./price-range-dropdown.scss";
import { SelectableFilter } from "helpers";

/**
* @property {Function} setPriceRange in filter.actions 
* @param {Event} Event 
*/
const handleClick = (event, props) => {
    props.setPriceRange({
        text: event.target.dataset.type,
        value: event.target.dataset.priceRange,
    });
};

/*
* a stateless component
*/

// FIXME: make D.R.Y 
const PriceRangeDropDown = (props) => {
    return <SelectableFilter
        selectedOption={props.selectedOption}
        clearSelected={props.resetFilter}
        handleClick={(event) => handleClick(event, props)}
        alwaysSelected>

        <span
            styleName="price"
            data-price-range="all"
            data-type="all">
            all
        </span>
        <span
            styleName="price"
            data-price-range="0-25000"
            data-type="0-25k">
            0-25k
        </span>
        <span
            styleName="price"
            data-price-range="25000-50000"
            data-type="25k-50k">
            25k-50k
        </span>
        <span
            styleName="price"
            data-price-range="50000-100000"
            data-type="50k-100k">
            50k-100k
        </span>
        <span
            styleName="price"
            data-price-range="100000-250000"
            data-type="100k-250k">
            100k-250k
        </span>
        <span
            styleName="price"
            data-price-range="250000-500000"
            data-type="250k-500k">
            250k-500k
        </span>
        <span
            styleName="price"
            data-price-range="500000-750000"
            data-type="500k-750k">
            500k-750k
        </span>
        <span
            styleName="price"
            data-price-range="750000"
            data-type="750k+">
            750k+
        </span>
    </SelectableFilter>;
};

export default PriceRangeDropDown;