import {
    applyMiddleware,
    createStore,
    combineReducers
} from "redux";
import thunk from "redux-thunk";

import { createLogger } from "redux-logger";

// reducers
import filtersReducer from "filters/filters.reducer";
import searchReducer from "yacht-search/yacht-search.reducer";
import yachtsListReducer from "yachts-list/yachts-list.reducer";
import modalReducer
    from "filter-mobile/sub-component/drop-down/drop-down.reducer";
import shareItReducer
    from "helpers/components/filters/share-filters/share-filters.reducer";

// middleware
import yachtSearchMiddleware from "yacht-search/yacht-search.middleware";
import filterMiddleware from "filters/filters.middleware";
import shareFilterMiddleware from
    "helpers/components/filters/share-filters/share-filters.middleware";

const middlewares = [yachtSearchMiddleware];

const isYachtSearch = document.getElementById("root")
    .dataset.pageType === "yacht-search";

if (isYachtSearch) {
    // add share it middleware
    middlewares.push(shareFilterMiddleware);
    // add session storage middleware
    middlewares.push(filterMiddleware);
}

if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger({
        collapsed: true,
    }));
}

const reducers = combineReducers({
    filtersReducer,
    searchReducer,
    yachtsListReducer,
    modalReducer,
    shareItReducer,
});
const store = createStore(
    reducers,
    applyMiddleware(thunk, ...middlewares)
);

export default store;