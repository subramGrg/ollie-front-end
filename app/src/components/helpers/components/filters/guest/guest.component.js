import React from "react";
import pluralize from "pluralize";

import { SearchBox } from "helpers";
import "./guest.scss";

// FIXME: turn to stateless
class Guest extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @property {String} isActive ownprop from filter.mobile
     * @memberof Guest
     */
    render() {
        const {
            isActive,
            guestNumber,
        } = this.props;
        const guests = (guestNumber === 0) ? "" : guestNumber;
        const guestText = (guests) ? pluralize("guest", guests) : "guest";
        const htmlClass = (isActive) ? 
            isActive : "";

        return (
            <SearchBox
                htmlClass={`guests ${htmlClass}`}
                icon="ahoyclub-guests"
                iconDataType="guests">

                <button
                    className={`guest__option ${htmlClass}`}
                    data-type="guests">
                    {guests} {guestText}
                </button>
            </SearchBox>
        );
    }
}

export default Guest;