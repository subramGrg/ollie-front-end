import filter from "./filter-panel.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as filtersActions from "filters/filters.api";
import {
    setCalendarResult
} from "filter-mobile/sub-component/drop-down/drop-down.actions";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...filtersActions,
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

const FilterPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(filter);

export { FilterPanel };