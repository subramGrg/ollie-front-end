import _ from "lib/underscoreLib";

const filterForSale = ({ yachts, }) => {
    if (!yachts) {
        return null;
    }

    // filter by sale
    return yachts.filter(yacht => yacht.IsForSale);
};

const sortBySalePrice = (yachts, sortByDescending) => {
    // keep null cause its price on application (POA)
    const nullSalePrice = [];

    const filteredYachts = yachts.filter(yacht => {
        if (yacht.SalePrice === null) {
            nullSalePrice.push(yacht);
        }

        return yacht.SalePrice !== null;
    });

    const sortedYachts = (sortByDescending) ?
        _.sortBy(filteredYachts, "SalePrice").reverse() : 
        _.sortBy(filteredYachts, "SalePrice");

    return (sortByDescending) ?
        [...sortedYachts, ...nullSalePrice] :
        [...nullSalePrice, ...sortedYachts];
};

export { filterForSale, sortBySalePrice };