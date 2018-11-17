import React from "react";

import { SearchBox } from "helpers";

/**
 * @param {Event} event
 * @param {Object} props
 * @param {Function} setSearchText
 */
const handleChange = (event, props) => {
    props.setSearchText(
        event.target.value
    );
};

/*
* a stateless component
*/
const YachtName = (props) => {
    const value = (props.searchText) ?
            props.searchText : "";
            
    return <SearchBox
        icon="ahoyclub-search"
        htmlClass="yacht__name">
        
        <input
            type='text'
            placeholder="yacht name"
            onChange={(event) => handleChange(event, props)}
            value={value} />
    </SearchBox>;
};


export default YachtName;