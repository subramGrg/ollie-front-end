import CharterFilter from "./charter.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as filtersActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...filtersActions,
    }, dispatch),
});

const mapStateToProps = (store) => ({
    selectedOption: store.filtersReducer.charters,
    sortByDescending: store.filtersReducer.sortByDescending,
    resetFilter: store.filtersReducer.resetFilter,
});

const Charter = connect(mapStateToProps, mapDispatchToProps)(CharterFilter);
export { Charter };