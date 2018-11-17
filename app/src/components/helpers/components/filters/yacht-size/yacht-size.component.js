import React from "react";
import { SelectableFilter } from "helpers";

import "./yacht-size.scss";

/**
 * fires redux action that sets yacht size
 * compares yacht size in store with current selected yacht size
 * @param {Event} event
 * @param {Object} props
 * @property {Function} setYachtSize a closure
 */
const handleClick = (props, event) => {
    const payload = (props.yachtSize === event.target.dataset.type) ?
        null : event.target.dataset.type;
    props.setYachtSize(payload);
};

const YachtSize = (props) => {
    return <div styleName="wrapper">
        <SelectableFilter
            handleClick={(event) => handleClick(props, event)}
            selectedOption={props.yachtSize}
            clearSelected={props.resetFilter}
            includeWrapper
            childrenWithIcon >

            <React.Fragment>
                <span
                    styleName="icon"
                    className="ahoyclub-motoryacht"
                    data-type="luxury">
                </span>
                <p
                    styleName="title"
                    data-type="luxury"
                    key="luxury">
                    <span
                        styleName="desktop"
                        data-type="luxury">
                        0-24m <br /> luxury
                    </span>
                    <span
                        styleName="mobile"
                        data-type="luxury">
                        luxury yachts<br />
                        <span
                            data-type="luxury"
                            styleName="large">
                            0-24
                        </span> <br />
                        metres
                    </span>

                </p>
            </React.Fragment>
            <React.Fragment>
                <span
                    styleName="icon super"
                    className="ahoyclub-motoryacht"
                    data-type="super">
                </span>
                <p
                    styleName="title"
                    data-type="super"
                    key="super">
                    <span
                        styleName="desktop"
                        data-type="super">
                        25m-65m <br />
                        super
                    </span>

                    <span
                        styleName="mobile"
                        data-type="super">
                        super yachts<br />
                        <span
                            data-type="super"
                            styleName="large">
                            25-65
                        </span> <br />
                        metres
                    </span>
                </p>
            </React.Fragment>
            <React.Fragment>
                <span
                    styleName="icon motor"
                    className="ahoyclub-motoryacht"
                    data-type="mega">
                </span>
                <p
                    styleName="title"
                    data-type="mega"
                    key="mega">
                    <span
                        styleName="desktop"
                        data-type="mega">
                        66m+ <br /> mega
                    </span>

                    <span
                        styleName="mobile"
                        data-type="mega">
                        mega yachts<br />

                        <span
                            styleName="large"
                            data-type="mega">
                            66+
                        </span> <br />
                        metres
                    </span>
                </p>
            </React.Fragment>
        </SelectableFilter>
    </div>;
};

export default YachtSize;