import React from "react";
import Autosuggest from "react-autosuggest";

import { SearchBox } from "helpers/components";
import locationTheme from "./location.scss";

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            suggestions: [],
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.partMatch = this.partMatch.bind(this);
    }

    partMatch(name, inputLength, inputValue) {
        return name.toLowerCase().slice(0, inputLength) === inputValue;
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const returnArray = [];

        if (inputLength === 0) {
            return [];
        }

        const {
            regions,
        } = this.props;

        regions.forEach(region => {
            if (region.ID > 0) {

                if (this.partMatch(region.Name, inputLength, inputValue)) {
                    returnArray.push({
                        "name": region.Name,
                        "regionid": region.ID,
                    });
                }

                region.Realms.forEach(realm => {
                    if (this.partMatch(realm.Name, inputLength, inputValue)) {
                        returnArray.push({
                            "name": realm.Name,
                            "parentName": region.Name,
                            "regionid": region.ID,
                            "realmid": realm.ID,
                        });
                    }

                    realm.Ports.forEach(port => {
                        if (this.partMatch(port.Name, inputLength, inputValue)) {
                            returnArray.push({
                                "name": port.Name,
                                "parentName": realm.Name,
                                "regionid": region.ID,
                                "realmid": realm.ID,
                                "portid": port.ID,
                            });
                        } else {
                            if (port.Keywords) {
                                port.Keywords.split(", ").forEach(keyword => {
                                    if (this.partMatch(keyword, inputLength, inputValue)) {
                                        returnArray.push({
                                            "name": `${port.Name} (${keyword})`,
                                            "parentName": realm.Name,
                                            "regionid": region.ID,
                                            "realmid": realm.ID,
                                            "portid": port.ID,
                                        });
                                    }
                                });
                            }
                        }
                    });
                });
            }
        });

        // Check for duplicates and append the parent name in parenthesis
        returnArray.forEach((item, index) => {
            const name = item.name;
            let isDuplicate = false;
            returnArray.forEach((subitem, subindex) => {
                if (subindex > index && subitem.name === name) {
                    subitem.name += ` (${subitem.parentName})`;
                    isDuplicate = true;
                }
            });
            if (isDuplicate) {
                item.name += ` (${item.parentName})`;
            }
        });

        return returnArray;
    }

    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.name}
            </div>
        );
    }

    onChange(event, { newValue, }) {
        this.setState({
            value: newValue,
        });

        this.handleSearch(newValue);
    }

    onSuggestionsFetchRequested({ value, }) {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
        });
    }

    handleSearch(value) {
        const {
            setLocation,
        } = this.props;

        const {
            suggestions,
        } = this.state;

        let destination = [];

        suggestions.forEach(item => {
            if (item.name.toLowerCase() === value.toLowerCase()) {
                destination = item;
            }
        });
        
        if (destination.regionid) {
            setLocation(destination);
        } else {
            setLocation(value);
        }
    }

    render() {
        const {
            currentRegion,
            selectedLocation,
            handleClick,
        } = this.props;
        
        const suggestions = this.state.suggestions;
        
        let value = (currentRegion === 0) ? this.state.value : "";

        if (selectedLocation && selectedLocation.name) {
            value = decodeURI(selectedLocation.name);
        } else if (selectedLocation && selectedLocation.clear) {
            value = "";
        }

        const inputProps = {
            placeholder: "Where would you like to go?",
            value,
            onChange: this.onChange,
        };

        return (
            <div styleName="wrapper">
                <SearchBox
                    handleClick={handleClick}
                    icon="ahoyclub-Where">

                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        theme={locationTheme}
                        inputProps={inputProps} />
                        
                </SearchBox>
            </div>
        );
    }
}

export default Location;