import Filter from "./filter.mobile.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as modalActions from "./sub-component/drop-down/drop-down.actions";
import * as filtersActions from "filters/filters.api";
import * as searchActions from "yacht-search/search.api";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...modalActions,
        ...searchActions,
        ...filtersActions,
    }, dispatch),
}
);

const mapStateToProps = (store) => {
    return {
        selectedRegion: store.filtersReducer.region,
        regionsList: store.filtersReducer.regions,
        moreFilters: store.searchReducer.mobileFilter,
        locationObject: store.filtersReducer.locationObject,
        yachtsLoading: store.yachtsListReducer.yachtsLoading,
        yachts: store.yachtsListReducer.yachts,
        shareItFilters: store.shareItReducer.share,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);