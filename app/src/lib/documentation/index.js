import React from "react";
import { Provider } from "react-redux";
import store from "store";

import Search from "yacht-search/search.container";

<Provider store={store}>
    <React.Fragment>
        <Search />
    </React.Fragment>
</Provider>;