import SortBy from "./sort-by.component";
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
        selectedOption: store.filtersReducer.sortBy,
        sortByDescending: store.filtersReducer.sortByDescending,
        resetFilter: store.filtersReducer.resetFilter,
    };
};

const SortByFilter = connect(mapStateToProps, mapDispatchToProps)(SortBy);
export { SortByFilter };