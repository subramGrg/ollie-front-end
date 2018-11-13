import PriceRangeFilter from "./price-range.component";
import * as filtersActions from "filters/filters.actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        filtersActions, dispatch
    ),
});

const mapStateToProps = (store) => ({
    priceRange: store.filtersReducer.price.text,
    dropDownActive: store.filtersReducer.price.dropDownActive,
});

const PriceRange = connect(
    mapStateToProps, mapDispatchToProps
)(PriceRangeFilter);

export { PriceRange };