import React from "react";
import _ from "lib/underscoreLib";

/**
 * creates an <li> containing availability detail
 * @returns {HTMLElement} <li>
 * @property {Object} detail text
 * @property {Boolean} refit show together with build year?
 */
const component = (detail, refit = false) => {
    const label = detail.key.replace("_", " ");
    let html = `${label}: ${detail.value}`;

    html = (refit && detail.refitYear) ?
        `${html} | last refit ${detail.refitYear} `
        : html;

    return <li
        key={label}>
        {html}
    </li>;
};

/**
 * return list of availability detail
 * build year & last refit are together
 * @returns {HTMLElement} <li> containing detail
 * @property {String} key text
 * @property {String} value text
 * @property {String} refitYear
 */
const view = (key, value, refitYear) => {
    if (!value) {
        return "";
    }
    const details = {
        key,
        value,
        refitYear,
    };

    switch (key) {
        case "build_year":
            return component(details, true);
        case "refit_year":
            return null;
        default:
            break;
    }

    return component(details);
};

/**
 * create availability detail
 * @returns {HTMLElement} <ul> containing availability detail
 */
const Location = (props) => {
    const details = {
        build_year: props.yacht.BuiltYear,
        refit_year: props.yacht.RefitYear,
        summer_area: props.yacht.SummerOperatingArea,
        winter_area: props.yacht.WinterOperatingArea,
    };
    const element = _.map(details, (value, key) => {
        return view(
            key,
            value,
            details.refit_year
        );
    });

    return <ul>
        {element}
    </ul>;
};

export default Location;