import YachtType from "./yacht-type.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as filtersActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...filtersActions,
    }, dispatch),
});

const mapStateToProps = (store) => ({
    resetFilter: store.filtersReducer.resetFilter,
    selectedOption: store.filtersReducer.yachtType,
});

const YachtTypeFilter = connect(mapStateToProps, mapDispatchToProps)(YachtType);
export { YachtTypeFilter };