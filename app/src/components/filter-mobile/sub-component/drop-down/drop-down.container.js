import { DropDown } from "./drop-down.component";
import { connect } from "react-redux";

const mapStateToProps = (store) => {
    return {
        moreFilters: store.searchReducer.mobileFilter,
    };
};

export default connect(mapStateToProps)(DropDown);