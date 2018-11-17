import React from "react";
import autobind from "autobind-decorator";

import _ from "lib/underscoreLib";
import slugify from "slugify";

import { blobUrl } from "../../../config";

import yachtCard from "./yacht-card.scss";
import yachtCardStyle from "./yacht-card-favourite.scss";
import Special from "../../../../../Assets/svg/members-special.svg";

import Location from "./location";
import ForSaleSVG from "assets/images/yacht-for-sale.svg";

class YachtCard extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * creates stats for yacht
     * @param {Object} yacht details
     * @returns {React.Children} stat info length, guests etc...
     * @memberof YachtCard
     */
    @autobind
    getStats(yacht) {

        if (!yacht) {
            // no yacht details
            return "";
        }

        const {
            Length,
            Bedrooms,
            MaxPassengers,
            MaxCrew,
            IsForSale,
        } = yacht;
        
        const statList = [];
        let yachtStats = {
            Length,
            MaxPassengers,
            Bedrooms,
            MaxCrew,
        };

        yachtStats = (this.props.salePage) ? 
            { ...yachtStats, IsForSale, } : yachtStats;
            
        _.each(yachtStats, (value, key) => {
            if (value && value > 0) {
                const statValue = this.formatStat(value, key);

                statList.push(
                    <p key={key} styleName="yachtCard.stats__info">
                        {statValue}
                    </p>
                );
            }
        });

        return statList;
    }

    /**
     * returns corresponding stat item
     * @param {String} value
     * @param {String} key
     * @returns { React.Children }
     * @memberof YachtCard
     */
    formatStat(value, key) {
        switch (key) {
            case "Length":
                return <span
                    className="ahoyclub-yacht"
                    styleName="yachtCard.ahoyclub-yacht">

                    <span className="value">{value}m</span>
                </span>;
            case "MaxPassengers":
                return <span className="ahoyclub-guests">
                    <span className="value">{value}</span>
                </span>;
            case "Bedrooms":
                return <span className="ahoyclub-bedrooms">
                    <span className="value">{value}</span>
                </span>;
            case "MaxCrew":
                return <span className="ahoyclub-crew">
                    <span className="value">{value}</span>
                </span>;
            case "IsForSale":
                return <ForSaleSVG
                    styleName="yachtCard.for__sale_svg" />;
            default:
            // nothing
        }
    }

    /**
     * return currency symbol
     * @param { String } currency
     * @returns { String }
     * @memberof YachtCard
     */
    convertToSymbol(currency) {
        switch (currency) {
            case "EURO":
                return "€";
            case "POUND":
                return "£";
            case "AUD":
                return "A$";
            case "AED":
                return currency;
            default:
                return "$";
        }
    }

    clickFave(yID) {
        const {
            updateFavourites,
            setFavouritesSpinner,
            favouriteSpinning,
        } = this.props;

        if (!favouriteSpinning) {
            setFavouritesSpinner({
                favouriteSpinning: true,
                yacht: yID,
            });
            updateFavourites(yID);
        }
    }

    /**
     * Formats rate
     * @param { Number } rate
     * @returns 
     * @memberof YachtCard
     */
    @autobind
    formatRate(rate) {
        const {
            CurrencyCode,
        } = this.props.yacht.Availabilities[0];
        const currency = this.convertToSymbol(CurrencyCode);

        return `${currency}${rate.toLocaleString(
            undefined,
            { minimumFractionDigits: 0, }
        )}`;
    }

    /**
     * Creates sales rate
     * @returns { JSX }
     * @memberof YachtCard
     */
    @autobind
    getSalesRate() {
        const {
            SalePrice,
        } = this.props.yacht;

        const minSalePrice = 1;

        const saleRate = (SalePrice === null || SalePrice < minSalePrice) ?
            "POA" : this.formatRate(SalePrice);

        return <React.Fragment>
            <span
                styleName="yachtCard.club">

                <img
                    src="https://img.ahoyclub.com/cdn/img/ahoyclub-member.png"
                    styleName="yachtCard.logo" />
                {saleRate}

            </span>
        </React.Fragment>;
    }

    /**
     * Creates JSX showing charter rates
     * @returns { JSX }
     * @memberof YachtCard
     */
    @autobind
    getCharterRate() {
        const {
            Availabilities,
            AcceptsDayCharters,
        } = this.props.yacht;
        const {
            WeeklyRate,
            RetailRate,
            CurrencyCode,
            HourlyRate,
            HourlyRetailRate,
        } = Availabilities[0];

        if (this.props.charters === "day-charter" &&
            HourlyRate < 1) {
            return <span
                className="price"
                key="price">
                &nbsp;
            </span>;
        }

        const isDayCharter = this.props.charters === "day-charter" &&
            AcceptsDayCharters;
        const yachtRate = (isDayCharter) ?
            HourlyRate : WeeklyRate;
        const charterBy = (isDayCharter) ?
            "hour " : "week";
        const currency = this.convertToSymbol(CurrencyCode);

        let retailRate;
        if (RetailRate) {
            const retail = this.formatRate(RetailRate);

            retailRate = <span
                styleName="yachtCard.retail">
                Retail {retail}
            </span>;
        }

        if (isDayCharter) {
            retailRate = <span
                styleName="yachtCard.retail">
                Retail {currency}{HourlyRetailRate}
            </span>;
        }

        let gstTag = "";
        if (CurrencyCode === "AUD") {
            gstTag = <span
                styleName="yachtCard.inc_GST">
                (All prices inc. GST.)
            </span>;
        }

        return <React.Fragment>
            <span
                styleName="yachtCard.club">
                <img
                    src="https://img.ahoyclub.com/cdn/img/ahoyclub-member.png"
                    styleName="yachtCard.logo" />
                Rate {this.formatRate(yachtRate)} / {charterBy}
            </span>

            {retailRate}
            {gstTag}
        </React.Fragment>;
    }

    /**
     * Creates charter rate html
     * @returns { React.Children }
     * @memberof YachtCard
     */
    @autobind
    charterRate() {
        const {
            salePage,
        } = this.props;

        return <p
            styleName="yachtCard.price"
            key="price" >

            {(salePage) ?
                this.getSalesRate() : this.getCharterRate()}
        </p>;
    }

    /**
     * creates favourites icon
     * @param {String} charters is day charter
     * @param {Object} yacht 
     * @memberof YachtCard
     */
    @autobind
    getHeartImage() {
        const {
            pickedYacht,
            favouriteSpinning,
            yacht,
            favouritesList,
        } = this.props;

        const yachtID = yacht.CRM_yacht_id.replace("YAC-", "");

        let heartImage = "/Assets/public/svg/heart-white.svg";
        let tooltipWriting = "Add To Favourites";

        if (pickedYacht === yachtID && favouriteSpinning) {
            heartImage = "/Assets/public/svg/spin-pink.svg";
            tooltipWriting = "Please Wait...";
        } else if (favouritesList.includes(yachtID)) {
            heartImage = "/Assets/public/svg/heart-love.svg";
            tooltipWriting = "Remove From Favourites";
        }

        return <div
            styleName="yachtCardStyle.hovertext"
            onClick={() => this.clickFave(yachtID)} >

            <img src={heartImage} />

            <span styleName="yachtCardStyle.tooltiptext">
                {tooltipWriting}
            </span>
        </div>;
    }

    /**
    * creates member html
    * @param {Boolean} SilentMember
    * @param {Boolean} AllInclusive
    * @param {Boolean} IsMember 
    * @memberof YachtCard
    */
    @autobind
    getMemberHTML() {
        const {
            SilentMember,
            AllInclusive,
            IsMember,
        } = this.props.yacht;
        
        return <span styleName="yachtCard.member">
            {(AllInclusive) ?
                <p
                    styleName="yachtCard.all_inclusive">
                    all inclusive
            </p> : ""}

            {(IsMember && !SilentMember) ?
                <img
                    src="https://img.ahoyclub.com/cdn/img/ahoy_member.png" />
                : ""}
        </span>;
    }

    /**
     * creates detail link
     * @param {String} charters is day charter
     * @param {Object} yacht 
     * @memberof YachtCard
     */
    @autobind
    yachtDetailLink({ charters, yacht, salePage, }) {
        const {
            Name,
            CRM_yacht_id,
            AcceptsDayCharters,
        } = yacht;

        const slugName = slugify(Name)
            .toLowerCase()
            .replace(/\./g, "");
        const subURL = (salePage) ? 
            "forsale" : slugName;

        const href = `/yacht-details/${subURL}/${CRM_yacht_id}`;

        return (!salePage && charters === "day-charter" && AcceptsDayCharters) ?
            `${href}#daycharter` : href;
    }

    /**
     * returns location info 
     * @returns { React.Child }
     * @memberof YachtCard
     */
    @autobind
    getLocationHTML() {
        const html = this.props.salePage ?
            "" : <div styleName="yachtCard.location">
                <Location
                    yacht={this.props.yacht} />
            </div>;

        return html;
    }

    shouldComponentUpdate(nextProps) {
        // this method should return boolean
        const isItYacht = (this.props.yacht) ?
            true : false;

        return isItYacht &&
            ((this.props.charters !== nextProps.charters) ||
                (this.props.yacht.ID !== nextProps.yacht.ID) ||
                (this.props.favouritesList !== nextProps.favouritesList) ||
                (this.props.favouriteSpinning !== nextProps.favouriteSpinning));
    }

    render() {
        if (this.props.empty) {
            return <div
                styleName="yachtCard.detail yachtCard.empty">
            </div>;
        }

        const yacht = this.props.yacht;
        const {
            IsMember,
            Availabilities,
            YachtPhotos,
            AllInclusive,
            SpecialActive,
            Name,
        } = yacht;

        const {
            favouritesList,
            salePage,
        } = this.props;

        const priceHTML = Availabilities.length > 0
            && this.charterRate();

        const isMember = (!salePage && IsMember || AllInclusive) ?
            this.getMemberHTML() : "";

        const imgSrc = (YachtPhotos.length > 0) ?
            `${blobUrl}yacht-images/${YachtPhotos[0].ThumbnailURL}`
            : "No Image";

        const heart = (!salePage &&
            (favouritesList !== "No Member")) ?
            this.getHeartImage() : "";

        const memberSpecial = (!salePage && SpecialActive) ?
            "members special" : "";

        return (
            <div styleName="yachtCard.detail" >
                <div styleName="yachtCard.memberSpecial">

                    <Special
                        styleName="yachtCard.special__svg" />
                    {memberSpecial}

                </div>

                {heart}

                <a href={this.yachtDetailLink(this.props)}>

                    <div styleName="yachtCard.image__wrapper">
                        <img styleName="yachtCard.yacht_image" src={imgSrc} />
                    </div>

                    <div styleName="yachtCard.content">
                        <p styleName="yachtCard.name">
                            {Name}
                        </p>

                        {priceHTML}

                        <div styleName="yachtCard.stats">
                            {this.getStats(yacht)}
                        </div>

                        {this.getLocationHTML()}

                        {isMember}

                    </div>
                </a>
            </div>
        );
    }
}

export default YachtCard;