import React from "react";

import "./radio.scss";

export default class Radio extends React.PureComponent {
    constructor(props) {
        super(props);

        this.createHTML = this.createHTML.bind(this);
        this.createRadio = this.createRadio.bind(this);
        this.createSelect = this.createSelect.bind(this);
    }

    createRadio(checked, region) {
        const {
            regionSelect,
        } = this.props;

        return (<div
            styleName="region-item"
            key={region.ID} >

            <input
                styleName="button"
                type="radio"
                name="region"
                value={region.ID}
                id={region.ID}
                onClick={(e) => regionSelect(e)}
                defaultChecked={checked} />

            <label styleName="label" htmlFor={region.ID}>
                {region.Name}
            </label>
        </div>);
    }

    createSelect(region) {
        return <option
            key={region.ID}
            value={region.ID} >
            {region.Name}
        </option>;
    }

    createHTML() {
        const {
            regions,
            currentRegion,
            dropDown,
            regionSelect,
        } = this.props;

        if (regions.length < 1) {
            return "Regions not loaded";
        }

        const regionID = parseInt(currentRegion);
        const list = regions.map((region, index) => {
            let checked = false;

            switch (regionID) {
                case (region.ID):
                    checked = true;
                    break;
                default:
                    if (index === 0) {
                        checked = true;
                    }
            }

            const html = dropDown ? this.createSelect(region)
                : this.createRadio(checked, region);
            return (html);
        });

        return dropDown ? <select
            value={regionID}
            onChange={regionSelect}>
            {list}
        </select> : list;
    }

    render() {
        return (
            <React.Fragment>
                {this.createHTML()}
            </React.Fragment>
        );
    }
}