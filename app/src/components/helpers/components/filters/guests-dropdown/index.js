import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import GuestsDropFilter from "./guests-dropdown.component";
import * as filterActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            ...filterActions,
        }, dispatch),
    };
};

const mapStateToProps = (store) => ({
    guestNumber: store.filtersReducer.guests,
});

const GuestsDropDown = connect(
    mapStateToProps, mapDispatchToProps
)(GuestsDropFilter);

export { GuestsDropDown };