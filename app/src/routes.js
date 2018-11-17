import React from "react";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	Link
} from "react-router-dom";

import ReactServer from "react-server/yacht-search/";

const Root = ({ store, }) => <Provider store={store}>
	<Router>
		<React.Fragment>
			<Link to="/charter">yacht-search</Link> &nbsp;
			<Link to="/yacht-for-sale">yacht-for-sale</Link>

			<Route path="/charter/:share?/:id?" component={ReactServer} />
		</React.Fragment>
	</Router>
</Provider>;

export default Root;