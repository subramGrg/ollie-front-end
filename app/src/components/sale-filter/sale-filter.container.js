import Filter from "./sale-filter.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as filtersActions from "filters/filters.api";
import * as yachtActions from "yachts-list/yachts-list.actions";
import * as dropDownActions from "filter-mobile/sub-component/drop-down/drop-down.actions";
import * as searchActions from "yacht-search/search.api";
import { 
    setCalendarResult
}from "filter-mobile/sub-component/drop-down/drop-down.actions";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...yachtActions,
        ...filtersActions,
        ...searchActions,
        ...dropDownActions,
        setCalendarResult,
    }, dispatch),
});

const mapStateToProps = (store, ownProps) => {
    return {
        handleSubmit: ownProps.handleSubmit,
        regions: store.filtersReducer.regions,
        sortBy: store.filtersReducer.sortBy,
        selectedRegion: store.filtersReducer.region,
        searchText: store.filtersReducer.searchText,
        locationObject: store.filtersReducer.locationObject,
        regionsList: store.filtersReducer.regions,
        sortByDescending: store.filtersReducer.sortByDescending,
        calendarSearch: store.modalReducer.calendarSearch,
        dropDownFilter: store.searchReducer.mobileFilter,
        priceRange: store.filtersReducer.price,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);