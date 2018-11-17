import React from "react";
import autobind from "autobind-decorator";
import slugify from "slugify";

import "./selectable.scss";

/**
 * Creates selectable options
 * @class Selectable
 * @extends {React}
 */
class Selectable extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * calls closure
     * @param {Event} event
     * @property {Function} handleClick a closure
     * @memberof Selectable
     */
    @autobind
    handleClick(event) {
        this.props.handleClick(event);
    }

    /**
     * checks if button should be active
     * if props.alwaysSelected true, first button always selected 
     * @param {String} elem is data-type
     * @property {String} alwaysSelected one option active (not redux)
     * @property {String} clearSelected clear active options (not redux)
     * @property {String} selectedOption clicked option (not redux)
     * @memberof Selectable
     */
    @autobind
    isActive(elem, index) {
        const {
            alwaysSelected,
            clearSelected,
            selectedOption,
        } = this.props;
        
        // check button in state == to cliked button
        // check if only one option has to be active eg: yacht-type
        let htmlClass = (
            (selectedOption && selectedOption.toLowerCase() ===
                slugify(elem.toLowerCase())
            ) || (index === 0 && alwaysSelected && !selectedOption)
        ) ? "active" : "";
        
        if (clearSelected) {
            // reset filter has been clicked
            htmlClass = (
                alwaysSelected && index === 0
            ) ? "active" : "";
        }

        return htmlClass;
    }

    /**
     * creates HTML button
     * @param {React.children} elem
     * @returns {HTMLElement} <button>
     * @memberof Selectable
     */
    @autobind
    createButton(elem, index) {
        const htmlClass = elem.props.children[1].key;
        
        return <button
            onClick={this.handleClick}
            styleName={`option ${this.isActive(htmlClass, index)}`}
            data-type={slugify(htmlClass)}>

            {elem.props.children}
        </button>;
    }

    /**
     * creates filter option component
     * @returns React.Childrent
     * @memberof Selectable
     */
    @autobind
    createComponent() {
        const {
            handleClick,
            childrenWithIcon,
            children,
        } = this.props;

        return React.Children.map(children, (elem, index) => {
            if (childrenWithIcon) {
                // has ahoy font/icon
                return this.createButton(elem, index);
            }

            const dataType = (elem.props && elem.props["data-type"]) ?
                elem.props["data-type"] : elem;
            const dataPriceRange = (
                elem.props && elem.props["data-price-range"]
            ) ? elem.props["data-price-range"] : "";
            
            return <button
                onClick={handleClick}
                data-type={slugify(dataType)}
                data-price-range={dataPriceRange}
                styleName={`option ${this.isActive(dataType, index)}`}>

                {elem}
            </button>;
        });
    }

    /**
     * @property {Boolean} alwaysSelected a button is always selected
     * @memberof Selectable
     */
    render() {
        const options = (this.props.includeWrapper) ?
            <div styleName="wrapper">
                {this.createComponent()}
            </div> : this.createComponent();

        return (options);
    }
}

export default Selectable;