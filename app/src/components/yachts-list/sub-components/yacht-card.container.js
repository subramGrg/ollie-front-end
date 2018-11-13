import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import YachtCard from "./yacht-card.component";
import * as yachtListAction from "../yachts-list.actions";

const mapStateToProps = (state, ownProps) => {
    return {
        favouriteSpinning: state.yachtsListReducer.favouriteSpinning,
        pickedYacht: state.yachtsListReducer.pickedYacht,
        favouritesList: state.yachtsListReducer.favourites,
        charters: state.filtersReducer.charters,
        salePage: ownProps.salePage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            ...yachtListAction,
        }, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(YachtCard);