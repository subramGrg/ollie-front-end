import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LocationFilter from "./location.component";
import * as filterActions from "filters/filters.actions";

const mapDispatchToProps = (dispatch) => {
    return { 
        ...bindActionCreators({
            ...filterActions,
        }, dispatch),
    };
};

const Location = connect(null, mapDispatchToProps)(LocationFilter);
export { Location };
