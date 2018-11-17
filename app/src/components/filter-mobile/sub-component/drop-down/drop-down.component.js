import React from "react";

import "./drop-down.scss";

// FIXME: Move component to /helpers/
/**
 * creates dropdown component
 * @property {String} moreFilters in search.reducer
 */
const DropDown = ({ moreFilters, children, }) => {
    const state = (moreFilters) ?
        "show" : "hide";

    return (
        <div styleName={`wrapper ${state}`}>
            {children}
        </div>
    );
};

export { DropDown };