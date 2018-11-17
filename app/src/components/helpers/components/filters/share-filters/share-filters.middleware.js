import {
	readLocalStorage,
	setYachtSearchByQueryString
} from "filters/filters.actions";
import {
	initialiseShare
} from "./share-filters.actions";

import { shareHasDates } from "./share-filter.helper";

const shareFilterMiddleware = ({
	dispatch,
}) => next => (action) => {
	if (action.type === "SET_SHARED_FILTERS") {
		const storageHasFilters = JSON.parse(
			sessionStorage.getItem("filter")
		);

		let decodedFilters;
		try {
			decodedFilters = JSON.parse(
				atob(action.payload)
			);
		} catch (error) {
			console.log("Decoding Base 64 error");

			return next(action);
		}

		sessionStorage.setItem(
			"filter",
			JSON.stringify({
				...storageHasFilters,
				...decodedFilters,
			})
		);

		// preselect share store with filter options
		// in url
		dispatch(
			initialiseShare(decodedFilters)
		);

		// read from storage
		// change redux store
		dispatch(
			readLocalStorage(sessionStorage.getItem("filter"))
		);

		const {
			valid,
			startDate,
			endDate,
		} = shareHasDates(action.payload);

		if (valid) {
			const searchDates = {
				startDate,
				endDate,
			};

			dispatch(
				setYachtSearchByQueryString(searchDates)
			);
		}
	}

	next(action);
};

export { shareFilterMiddleware as default };