import React from "react";
import _ from "lib/underscoreLib";
import autobind from "autobind-decorator";

import YachtCard from "./sub-components/yacht-card.container";
import "./yacht-list.scss";

import {
    sortByPrice,
    sortBySalePrice
} from "helpers";

/**
 * Displays yachts and load more button
 * @param {yacht} Array Array of yachts
 * @class YachtsList
 */
class YachtsList extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Sort yachts by Length or Price.
     * @param {type} String sort by value.
     * @returns {yachts} Yachts sorted by type.
     * @memberof YachtsList
     */
    @autobind
    sortYachtsBy(type) {
        let {
            yachts,
        } = this.props;
        const {
            charterType,
            sortByDescending,
        } = this.props;
        
        // api return capitalised first letter so following converts it
        type = (type === "SalePrice") ?
            type : `${type[0].toUpperCase()}${type.slice(1).toLowerCase()}`;

        // remove empty price
        switch (type) {
            case "Weeklyrate":
                yachts = sortByPrice(charterType, yachts);
                break;
            case "SalePrice":
                yachts = sortBySalePrice(yachts, sortByDescending[type]);
                break;
            default:
                yachts = _.sortBy(yachts, type);
        }

        yachts = (sortByDescending[type] &&
            type !== "SalePrice") ?
            yachts.reverse() : yachts;

        return yachts;
    }

    /**
     * Groups yachts into 3 
     * @param {yachts} yachts Array of yachts
     * @returns {YachtsList} Array of grouped yachts
     * @memberof YachtsList
     */
    @autobind
    groupYachts(yachts) {
        const {
            yachtOffSet,
            salePage,
        } = this.props;

        // only 12 yachts 
        const yachtList = yachts.reduce((yachtArray, yacht, index) => {
            if (index < yachtOffSet) {
                yachtArray.push(<YachtCard
                    key={`yachts-${index}`}
                    yacht={yacht}
                    salePage={salePage}
                />);
            }

            return yachtArray;
        }, []);

        const emptyCard = <YachtCard empty />;

        return _.inGroupsOf(yachtList, 3, emptyCard)
            .map((elem, index) => {
                return <div styleName="row_wrapper" key={`${index}`}>
                    {elem[0]} {elem[1]} {elem[2]}
                </div>;
            });
    }

    /**
     * Generates components markup.
     * @returns {html} Object to render.
     * @memberof YachtsList
     */
    @autobind
    createView() {
        const html = {};
        const {
            sortType,
            showMoreYachts,
        } = this.props;

        // own component prop not redux 
        let {
            yachts,
        } = this.props;

        yachts = (sortType) ? this.sortYachtsBy(sortType) : yachts;

        html.yachtList = this.groupYachts(yachts);

        html.viewMore = "";
        if (yachts.length >= 12) {
            html.viewMore = <button
                onClick={showMoreYachts}
                className="btn">
                Load more yachts
            </button>;
        }

        return html;
    }

    componentDidMount() {
        const {
            getFavourites,
        } = this.props;

        getFavourites();
    }

    render() {
        const {
            yachtList,
            viewMore,
        } = this.createView();
        const htmlClass = (this.props.calendarActive) ? "calendar-active" : "";

        return (
            <div styleName={`list ${htmlClass}`}>
                {yachtList}

                <div styleName="more">
                    {viewMore}
                </div>
            </div>
        );
    }
}

export default YachtsList;
