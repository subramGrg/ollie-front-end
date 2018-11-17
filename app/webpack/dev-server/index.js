import React from "react";
import ReactDOM from "react-dom";
import store from "store";

import Root from "routes";

// FRONT END
// SEARCH AND YACHT DETAIL DATA FLOW ARCHITECTURE DIAGRAM
// https://www.draw.io/#G18PI2i3uen_hWTTqktTlGQa0XIMoMdnio
ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
);