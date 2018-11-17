import ShareFilter from "./share-filters.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as shareFiltersActions from "./share-filters.actions";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...shareFiltersActions,
    }, dispatch),
});

const mapStateToProps = (store) => {
    return {
        toShareFilters: store.shareItReducer.share,
        resetFilter: store.filtersReducer.resetFilter,
        selectedOption: store.filtersReducer.allInclusive,
    };
};

const ShareFiltersButton = connect(
    mapStateToProps, mapDispatchToProps
)(ShareFilter);

export { ShareFiltersButton };