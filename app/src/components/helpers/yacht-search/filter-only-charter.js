// retains day/weekly charter
const filterDailyOrWeekly = (yachts, charterFlag, charterMode) =>
    yachts.filter(yacht =>
        yacht[charterFlag] &&
        yacht.Availabilities[0][charterMode] !== null);

// filters yachts by charter mode
// weekly is selected by default
export const filterByChaterType = (yachts, charters) => {
    // filter by daily/weekly mode
    switch (charters) {
        case "day-charter":
            return filterDailyOrWeekly(
                yachts,
                "AcceptsDayCharters",
                "HourlyRate"
            );
        case "weekly-charter":
            return filterDailyOrWeekly(
                yachts,
                "AcceptsWeeklyCharters",
                "WeeklyRate"
            );
        default:
            break;
    }
};