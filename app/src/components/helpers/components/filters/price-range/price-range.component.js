import React from "react";

import { SearchBox } from "helpers";
import "./price-range.scss";

/**
* @property {Function} setPriceRangeDropDown in filter.actions
*/
const handleClick = (setPriceRangeDropDown) => {
    setPriceRangeDropDown();
};

/**
* @property {String} priceRange title of button
* @property {String} dropDownActive used to change chevron
* @property {Fucntion} setPriceRangeDropDown show/hide drop down
* @memberof Guest
*/
const PriceRange = ({ priceRange, dropDownActive, setPriceRangeDropDown, }) => {
    const title = (priceRange === "all") ?
        "price range" : priceRange;
    const ahoyFont = (dropDownActive) ?
        "ahoyclub-up" : "ahoyclub-down";

    return (
        <SearchBox
            icon={ahoyFont}
            onClick={() => handleClick(setPriceRangeDropDown)}>

            <button
                styleName="option"
                data-type="guests">
                {title}
            </button>
        </SearchBox>
    );
};

export default PriceRange;