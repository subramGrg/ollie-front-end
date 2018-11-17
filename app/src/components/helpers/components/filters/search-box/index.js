import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Search from "./search-box.component";
import * as filterActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => {
    return { 
        ...bindActionCreators({
            ...filterActions,
        }, dispatch),
    };
};

const SearchBox = connect(null, mapDispatchToProps)(Search);
export { SearchBox };
