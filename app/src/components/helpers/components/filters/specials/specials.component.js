import React from "react";
import { SelectableFilter } from "helpers/components";

import "./specials.scss";

/**
 * toggles button as active/off
 * @property {String} selectedOption in filters.reducer
 * @property {Function} setMemberSpecial in filters.action
*/
const handleClick = (props, event) => {
    const buttonValue = event.target.innerHTML.toLowerCase();
    const specials = (props.selectedOption &&
        props.selectedOption.toLowerCase() === buttonValue
    ) ? null : buttonValue;
    
    props.setMemberSpecial(specials);
};

/**
* @property {String} resetFilter in filters.reducer
* @property {String} selectedOption in filters.reducer
*/
const Specials = (props) => {
    return <SelectableFilter
        clearSelected={props.resetFilter}
        handleClick={(event) => handleClick(props, event)}
        selectedOption={props.selectedOption} >

        specials
    </SelectableFilter>;
};

export default Specials;