import YachtsList from "yachts-list/yachts-list.component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as yachtActions from "../yachts-list/yachts-list.actions";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...yachtActions,
    }, dispatch),
});

const mapStateToProps = (store, ownProps) => {
    return {
        salePage: ownProps.salePage,
        yachtsLoading: store.yachtsListReducer.yachtsLoading,
        charterType: store.filtersReducer.charters,
        sortType: store.filtersReducer.sortBy,
        searchText: store.filtersReducer.searchText,
        locationObject: store.filtersReducer.locationObject,
        yachtOffSet: store.yachtsListReducer.offSet,
        sortByDescending: store.filtersReducer.sortByDescending,
        calendarActive: store.modalReducer.desktopCalendarFocusedInput ||
            store.modalReducer.calendarFocusedInput,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(YachtsList);