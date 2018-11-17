import React from "react";

import "./filter-panel.scss";

/**
*  @param { String } calendarSearch in drop-down.actions
*  @param { String } clearFilters in filters.action
*  @param { String } setCalendarResult in drop-down.action
*/
const resetFilters = ({ clearFilters, setCalendarResult, calendarSearch, }) => {
    clearFilters();

    if (!calendarSearch) {
        return "dont set result of calendar";
    }
    // hide calendar picker
    setCalendarResult(false);
};

const FilterPanel = (props) => {
    const html = React.Children.map(props.children, child => {
        const component = (child) ?
            <div styleName="section">
                {child}
            </div> : "";

        return component;
    });

    return <React.Fragment>
        {html}

        <div styleName="reset">
            <button
                styleName="reset__btn"
                onClick={() => resetFilters(props)} >
                Reset filters
            </button>
        </div>
    </React.Fragment>;
};

export default FilterPanel;