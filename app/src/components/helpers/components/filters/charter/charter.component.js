import React from "react";
import { SelectableFilter as Selectable, Specials } from "helpers/components";

import "./charter.scss";

/**
 * changes charter to weekly/day 
 * @param {String} order by type
 * @property {Function} setCharter in filters.actions
 */
const handleClick = (props, event) => {
    props.setCharter(
        event.target.dataset.type
    );
};

const Charter = (props) => {
    return <div styleName="wrapper">
        <Selectable
            handleClick={(event) => handleClick(props, event)}
            selectedOption={props.selectedOption}
            clearSelected={props.resetFilter}
            childrenWithIcon
            alwaysSelected>

            <React.Fragment>
                <span></span>
                <p
                    data-type="weekly-charter"
                    key="weekly-charter">
                    weekly charter
                </p>
            </React.Fragment>
            <React.Fragment>
                <span></span>
                <p
                    data-type="day-charter"
                    key="day-charter">
                    day charter
                </p>
            </React.Fragment>
        </Selectable>

        <Specials />
    </div>;
};

export default Charter;