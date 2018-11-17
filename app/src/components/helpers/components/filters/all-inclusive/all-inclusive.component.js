import React from "react";
import { SelectableFilter } from "helpers";

import "./all-inclusive.scss";

/**
 * @property {Function} setAllInclusive in filters.action 
*/
const handleClick = (props, event) => {
    const status = (props.selectedOption &&
        props.selectedOption.toLowerCase() === 
        event.target.dataset.type.toLowerCase()
    ) ? null : "all-inclusive";

    props.setAllInclusive(status);
};

/**
* @property {Function} setAllInclusive in filters.action
* @property {String} resetFilter in filters reducer
* @property {String} selectedOption in filters reducer
*/
const AllInclusive = (props) => {
    return <div styleName="wrapper">
        <SelectableFilter
            clearSelected={props.resetFilter}
            handleClick={(event) => handleClick(props, event)}
            selectedOption={props.selectedOption} >
            all inclusive
        </SelectableFilter>

        <p>
            Yachts with rates that include Food, Beverages & Fuel
        </p>
    </div >;
};

export default AllInclusive;