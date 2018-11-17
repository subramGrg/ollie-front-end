import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import Search from "yacht-search/yacht-search.container";

// FRONT END
// SEARCH AND YACHT DETAIL DATA FLOW ARCHITECTURE DIAGRAM
// https://www.draw.io/#G18PI2i3uen_hWTTqktTlGQa0XIMoMdnio
const mainRoot = document.getElementById("root");

if (mainRoot.dataset.pageType === "yacht-search") {
    ReactDOM.render(
        <Provider store={store}>
            <React.Fragment>
                <Search 
                    salePage={false}
                />
            </React.Fragment>
        </Provider>,
        mainRoot
    );
} else {
    ReactDOM.render(
        <Provider store={store}>
            <React.Fragment>
                <Search
                    salePage={true} />
            </React.Fragment>
        </Provider>,
        mainRoot
    );
}
