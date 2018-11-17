import React from "react";

import "./guests-dropdown.scss";
import { SearchBox } from "helpers";

/**
 * @param {Event} event
 * @param {Object} props
 * @param {Function} setGuests in filters.actions
 */
const handleClick = (event, props) => {
    let {
        guestNumber,
    } = props;

    switch (event.target.textContent) {
        case "-":
            if (guestNumber > 0) {
                guestNumber--;
            }
            break;

        case "+":
            guestNumber++;
            break;

        default:
            // nothing
    }

    props.setGuests(guestNumber);
};

/*
* a stateless component
*/
const Guests = (props) => {
    const guests = (props.guestNumber === 0) ? "" : props.guestNumber;
    return <SearchBox
        onClick={(event) => handleClick(event, props)}
        htmlClass="guest__dropdown">

        <span styleName="pointer minus">-</span>

        <span
            className="ahoyclub-guests"
            styleName="guest__font">
        </span>

        {guests}

        <span styleName="pointer add">+</span>
    </SearchBox>;
};


export default Guests;