import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import YachtNameFilter from "./yacht-name.component";
import * as filterActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => {
    return { 
        ...bindActionCreators({
            ...filterActions,
        }, dispatch),
    };
};

const mapStateToProps = (store) => ({
    searchText: store.filtersReducer.searchText,
});

const YachtName = connect(mapStateToProps, mapDispatchToProps)(YachtNameFilter);
export { YachtName };