import { setYachtSearch } from "filters/filters.api";
import { getAllYachts } from "./search.api";

const searchMiddleware = store => next => async (action) => {
    if (action.type === "SET_YACHT_SEARCH_BY_QUERYSTRING") {
        // await getAllYachts(true)(store.dispatch);
        
        // stop from showing loading 
        action.payload.first = true;
        await setYachtSearch(action.payload)(store.dispatch);
    }

    return next(action);
};

export { searchMiddleware as default };