import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PriceRangeDropDownFilter from "./price-range-dropdown.component";
import * as filterActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            ...filterActions,
        }, dispatch),
    };
};

const mapStateToProps = (store) => ({
    selectedOption: store.filtersReducer.price.text,
    resetFilter: store.filtersReducer.resetFilter,
});

const PriceRangeDropDown = connect(
    mapStateToProps, mapDispatchToProps
)(PriceRangeDropDownFilter);

export { PriceRangeDropDown };