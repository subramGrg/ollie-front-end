import React from "react";

import { SelectableFilter } from "helpers";

import "./yacht-type.scss";

/**
 * call redux action to filter yachts by its type
 * @param {Event} event
 * @param {Function} props.setYachtType in filters.actions
 */
const handleClick = (event, props) => {
    props.setYachtType(
        event.target.dataset.type
    );
};

/**
 * creates yacht type button component
 * @type stateless function
 * @param {Event} event
 * @property {Function} setYachtType in filters.actions
 * @property {String} selectedOption in filters.reducer
 * @property {String} resetFilter in filters.reducer
 */
const YachtType = (props) => {
    return <div styleName="wrapper">
        <SelectableFilter
            handleClick={(event) => handleClick(event, props)}
            selectedOption={props.selectedOption}
            clearSelected={props.resetFilter}
            childrenWithIcon
            includeWrapper
            alwaysSelected >

            <React.Fragment>
                <span></span>
                <span data-type="all" key="all">all</span>
            </React.Fragment>
            <React.Fragment>
                <span
                    data-type="sailing"
                    styleName="sailing icon"
                    className="ahoyclub-sailingyacht"></span>
                <span data-type="sailing" key="sailing">sailing</span>
            </React.Fragment>
            <React.Fragment>
                <span
                    data-type="motor"
                    styleName="motor icon"
                    className="ahoyclub-motoryacht"></span>
                <span data-type="motor" key="motor">motor</span>
            </React.Fragment>
        </SelectableFilter>
    </div>;
};

export default YachtType;