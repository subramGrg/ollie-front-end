export const filterYachts = (store, yachts) => {
    const {
        price,
        yachtSize,
        allInclusive,
        memberSpecials,
        yachtType,
        guests,
        selectedRegion,
        locationObject,
        searchText,
        yachtIDs,
        forSale,
    } = store.filtersReducer;

    // filter by search text
    if (searchText && searchText.length > 0) {
        yachts = yachts.filter((yacht) =>
            yacht.Name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    // filter by location text
    if (locationObject && locationObject.regionid) {
        yachts = yachts.filter((yacht) => {
            if (yacht.Availabilities.length < 1) {
                return false;
            }
            let returnValue = false;
            const searchPortID = parseInt(locationObject.portid, 10);
            const searchRealmID = parseInt(locationObject.realmid, 10);
            const searchRegionID = parseInt(locationObject.regionid, 10);

            yacht.Availabilities.forEach(availability => {

                const YachtAvailability = availability.LocationAvailability;

                if (YachtAvailability && YachtAvailability.length > 0) {
                    YachtAvailability.forEach(locationAvailability => {

                        const {
                            PortID,
                            RealmID,
                            RegionID,
                        } = locationAvailability;

                        if (PortID && searchPortID) {
                            if (PortID === searchPortID) {
                                returnValue = true;
                            }
                        } else if (RealmID && searchRealmID) {
                            if (RealmID === searchRealmID) {
                                returnValue = true;
                            }
                        } else if (RegionID && searchRegionID) {
                            if (RegionID === searchRegionID) {
                                returnValue = true;
                            }
                        }
                    });
                }
            });

            return returnValue;
        });
    }

    // filter by region
    if (selectedRegion && selectedRegion > 0) {
        const parsedRegion = parseInt(selectedRegion, 10);

        yachts = yachts.filter((yacht) => {
            if (yacht.Availabilities.length < 1) {
                return false;
            }

            let returnValue = false;

            yacht.Availabilities.forEach(availability => {
                if (availability.LocationAvailability && availability.LocationAvailability.length > 0) {
                    availability.LocationAvailability.forEach(locationAvailability => {
                        if (locationAvailability.RegionID === parsedRegion && locationAvailability.RealmID == null) {
                            returnValue = true;
                        }
                    });
                }
            });

            return returnValue;
        });
    }

    // filter by guests
    if (guests > 0) {
        yachts = yachts.filter((yacht) => {
            return yacht.MaxPassengers >= guests ? true : false;
        });
    }

    // filter by yacht type
    if (yachtType && yachtType !== "all") {
        yachts = yachts.filter(yacht => {
            if (!yacht.YachtType) {
                return false;
            }

            const type = yacht
                .YachtType
                .toLowerCase()
                .replace(/\s/g, "")
                .split("/");
            return (type.includes(yachtType));
        });
    }

    // filter by member specials
    if (memberSpecials) {
        yachts = yachts.filter(yacht => yacht.SpecialActive);
    }

    // filter by all inclusive
    if (allInclusive) {
        yachts = yachts.filter(yacht => yacht.AllInclusive);
    }

    // filter by yacht size
    if (yachtSize) {
        yachts = yachts.filter(yacht => {
            const category = yacht.YachtCategory
                .toLowerCase()
                .split("yacht")[0]
                .trim();

            if (yachtSize === category) {
                return true;
            }
        });
    }

    // within price range
    if (price.value !== "all") {
        // filter by price range
        const priceValue = price.value.split("-");
        const min = priceValue[0];
        const max = priceValue[1];

        yachts = yachts.filter(yacht => {
            if (!yacht.Availabilities || yacht.Availabilities.length < 1) {
                return false;
            }

            const {
                WeeklyRate,
            } = yacht.Availabilities[0];
            const inRange = (max) ?
                WeeklyRate > min && WeeklyRate < max : WeeklyRate > min;

            return inRange;
        });
    }

    // find yachts available in selected dates
    // disregard if any other filtered options
    let yachtsAvailableID;
    if (yachtIDs && yachtIDs.length > 0) {
        yachtsAvailableID = yachtIDs.filter(yacht => {
            return (yacht.Charters && yacht.Charters.length > 0) ?
                false : true;
        });
    }

    // yachts searched by dates
    if (yachtsAvailableID && yachtsAvailableID.length > 0) {
        yachts = yachts.map(yacht => {
            const isYachtAvailable = yachtsAvailableID
                .find(yac => yac.ID === yacht.ID);

            return (isYachtAvailable) ?
                yacht : undefined;
        });

        // search by dates might have undefined so, remove
        yachts = yachts.filter(yacht => yacht);
    }

    // filter by for-sale
    if (forSale) {
        yachts = yachts.filter(yacht => yacht.IsForSale);
    }

    return yachts;
};