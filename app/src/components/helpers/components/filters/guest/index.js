import GuestFilter from "./guest.component";
import * as filtersActions from "filters/filters.actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        filtersActions, dispatch
    ),
});

const mapStateToProps = (store) => ({
    guestNumber: store.filtersReducer.guests,
});

const Guest = connect(mapStateToProps, mapDispatchToProps)(GuestFilter);

export { Guest };