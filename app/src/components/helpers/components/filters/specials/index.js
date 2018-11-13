import SpecialsFilter from "./specials.component";
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
        selectedOption: store.filtersReducer.memberSpecials,
    };
};

const Specials = connect(
    mapStateToProps, mapDispatchToProps
)(SpecialsFilter);

export { Specials };