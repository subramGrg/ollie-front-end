import _ from "lib/underscoreLib";

export const sortByPrice = (dayOrWeekly, yachts) => {
    dayOrWeekly = (dayOrWeekly &&
            dayOrWeekly !== "weekly-charter") ?
        "HourlyRate" : "WeeklyRate";

    return _.sortBy(yachts, yacht =>
        yacht.Availabilities[0][dayOrWeekly]
    );
};