import YachtSize from "./yacht-size.component";
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
        yachtSize: store.filtersReducer.yachtSize,
    };
};

const YachtSizeFilter = connect(mapStateToProps, mapDispatchToProps)(YachtSize);
export { YachtSizeFilter };