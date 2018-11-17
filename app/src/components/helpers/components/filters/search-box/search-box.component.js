import React from "react";

import "./search-box.scss";

/**
 * Creates text box in yacht-search filter panel
 * stateless component SearchBox
 */
const SearchBox = (props) => {
    const {
        icon,
        children,
        htmlClass,
        onClick,
        iconDataType,
    } = props;
    const componentName = (htmlClass) ? htmlClass : "";
    const iconFont = (icon) ?
        <span 
            className={`${icon} ahoy__font`}
            data-type={iconDataType}>
        </span> : null;
    
    return (
        <div 
            styleName="wrapper"
            className={componentName}
            onClick={onClick}>

            {iconFont}
            {children}
        </div>
    );
};

export default SearchBox;