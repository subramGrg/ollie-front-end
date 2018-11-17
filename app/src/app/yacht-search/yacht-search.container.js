import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux";

import Search from "yacht-search/yacht-search.component";
import * as filterActions from "filters/filters.api";
import * as yachtsActions from "yachts-list/yachts-list.actions";
import * as searchActions from "./search.api";
import * as modalActions from "filter-mobile/sub-component/drop-down/drop-down.actions";
import * as filterShareActions
    from "helpers/components/filters/share-filters/share-filters.actions";

import {
    filterYachts,
    filterByChaterType,
    filterForSale
} from "helpers";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...filterActions,
        ...yachtsActions,
        ...searchActions,
        ...modalActions,
        ...filterShareActions,
    }, dispatch),
});

const mapStateToProps = (store, ownProps) => {
    const yachtsLoading = store.yachtsListReducer.yachtsLoading;

    let yachts = (ownProps.salePage) ?
        filterForSale(store.yachtsListReducer) : store.yachtsListReducer.yachts;

    // remove yachts with no availabilites
    yachts = yachts.filter(yacht =>
        yacht.Availabilities.length > 0
    );
    yachts = filterByChaterType(
        yachts,
        store.filtersReducer.charters
    );

    const yachtList = filterYachts(store, yachts);

    return {
        yachts: yachtList,
        yachtsWithoutFilter: yachts,
        yachtsLoading,
        yachtOffSet: store.yachtsListReducer.offSet,
        yachtsLoaded: store.filtersReducer.yachtsLoaded,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);