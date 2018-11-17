import Selectable from "./selectable.component";
import { connect } from "react-redux";

const mapStateToProps = (store) => {
    return {
        resetFilter: store.filtersReducer.resetFilter,
    };
};

const SelectableFilter = connect(mapStateToProps)(Selectable);

export { SelectableFilter };