import AllInclusive from "./all-inclusive.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as filtersActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...filtersActions,
    }, dispatch),
});

const mapStateToProps = (store) => {
    return {
        resetFilter: store.filtersReducer.resetFilter,
        selectedOption: store.filtersReducer.allInclusive,
    };
};

const AllInclusiveFilter = connect(
    mapStateToProps, mapDispatchToProps
)(AllInclusive);

export { AllInclusiveFilter };