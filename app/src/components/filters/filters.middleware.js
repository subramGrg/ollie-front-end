import {
	readLocalStorage
} from "./filters.actions";

// prepares filters to save
const getFiltersToSave = (action, getState) => {
	let filters = {
		...getState().filtersReducer,
	};

	// reset the remaining yachts loaded flag as false
	if (action.type === "SET_REGIONS") {
		filters = {
			...filters,
			yachtsLoaded: false,
		};
	}

	return filters;
};

// saves filters to session storage
const readFiltersInStorage = (type, dispatch, storageHasFilters) => {
	if (type === "SET_LOCAL_STORAGE") {
		return "dont read filters from storage";
	}

	// read from storage
	// change redux store
	dispatch(
		readLocalStorage(storageHasFilters)
	);
};

// saves dates to session storage
const saveDatesToStorage = (getState, action) => {
	let calendarObject = {
		...getState().modalReducer.calendar,
	};

	if (action.type === "SET_YACHT_SEARCH_BY_QUERYSTRING") {
		if (window.location.href.split("from")[1]) {
			const dates = window.location.href
				.split("from")[1]
				.split("to");

			calendarObject = {
				startDate: dates[0].replace(/=|&/g, ""),
				endDate: dates[1].replace(/=|&/g, ""),
			};
		}

		if (action.payload.startDate) {
			calendarObject = {
				startDate: action.payload.startDate,
				endDate: action.payload.endDate,
			};
		}
	}

	sessionStorage.setItem(
		"calendar",
		JSON.stringify(calendarObject)
	);
};

/**
 * Saves selected filters to local storage
 * or loads selected filters from local storage
 */
const filterMiddleware = ({
	getState,
	dispatch,
}) => next =>
		async (action) => {
			const targetedActions = [
				"SET_SEARCH_TEXT",
				"SET_SORT_BY",
				"SET_PRICE_RANGE",
				"SET_GUESTS",
				"SET_YACHT_TYPE",
				"SET_MEMBER_SPECIAL",
				"SET_ALL_INCLUSIVE",
				"SET_YACHT_SIZE",
				"SET_CHARTER_FILTER",
				"SET_YACHT_IDS",
				"SET_LOCATION",
				"SET_YACHTS_LOADING",
				"SET_REGIONS"
			];

			const saveOrReadStorage = targetedActions.includes(action.type);
			const storageHasFilters = sessionStorage.getItem("filter");

			const localStorageState = saveOrReadStorage &&
				storageHasFilters &&
				readFiltersInStorage(action.type,
					dispatch,
					storageHasFilters
				);

			next(action);

			if (saveOrReadStorage) {
				// save to storage
				const filtersToSave = getFiltersToSave(action, getState);

				sessionStorage.setItem(
					"filter",
					JSON.stringify(filtersToSave)
				);
			}

			// check action is associated to calendar 
			// cause dates in different reducer
			const isActionCalendar = [
				"SET_CALENDAR_RESULT",
				"SET_YACHT_SEARCH_BY_QUERYSTRING"
			].includes(action.type);

			if (action.payload && isActionCalendar) {
				saveDatesToStorage(getState, action);
			}
		};

export {
	filterMiddleware as
		default
};