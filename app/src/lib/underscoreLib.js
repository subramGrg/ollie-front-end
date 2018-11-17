import _ from "underscore";

export default _.mixin({
    inGroupsOf: (array, number, fillWith=null) => {
        const slices = [];
        let index = -number;

        if (number < 1) return array;

        while ((index += number) < array.length) {
            const s = array.slice(index, index + number);
            while(s.length < number) {
                s.push(fillWith);
            }
            slices.push(s);
        }
        return slices;
    },
});
