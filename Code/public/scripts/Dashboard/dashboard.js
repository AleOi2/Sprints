function groupByDate(arr) {
    let grouped = {};
    let yearMonth;
    for (let element of arr) {
        yearMonth = Object.keys(element)[0];
        if (!(yearMonth in grouped)) {
            grouped[yearMonth] = {
                [element[yearMonth].Category.category]: parseInt(element[yearMonth].sum),
            }
        } else {
            grouped[yearMonth] = {
                ...grouped[yearMonth],
                [element[yearMonth].Category.category]: parseInt(element[yearMonth].sum),
            }
        }
    }
    return grouped;
}

// Convert to:
// {2020-06:{obj}, 2020-07:{obj},}
function parserData(revenueCost) {
    // Convert to:
    // {2020-06:{obj1 -> category1}, 2020-06:{obj2 -> category2}, 2020-07:{obj1},}
    let parsedData = revenueCost.map((element, index) => {
        return ({ [element.month_year]: element })
    })
    // Convert to:
    // {2020-06:{obj}, 2020-07:{obj}, 2020-08:{obj}}
    // obj:{ categoria: sumValue}
    return groupByDate(parsedData);

}

function completeObj(revenueCost, pieRevenueCostData, date) {
    // Convert revenueCost to:
    // {2020-06:{obj}, 2020-07:{obj},}
    let parsedData = parserData(revenueCost);
    let releases = []; let type;let index = 0;
    for( let element in parsedData[date]){
        type = Object.keys(element)[0]
        releases.push(Object.keys(parsedData[date])[index].toUpperCase().replace('.PNG', ''));
        releases.push(parsedData[date][element]);
        pieRevenueCostData.data.push(releases);
        releases = []
        index = index + 1
    }
    return pieRevenueCostData;
}

// Convert a stringDate to Year-Month: 2020-20-10 -> 2020-20 
const pickYearMonth = (stringDate) => {
    stringDate = stringDate.trim();
    let date = [];
    if (stringDate.match(/\d{4}-\d{1,2}-\d{1,2}/img)) {
        date = stringDate.match(/\d{4}-\d{1,2}-\d{1,2}/img)[0].split('-');
    }
    if (stringDate.match(/\d{4}\/\d{1,2}\/\d{1,2}/img)) {
        date = stringDate.match(/\d{4}\/\d{1,2}\/\d{1,2}/img)[0].split('/');
    }
    if (stringDate.match(/\d{1,2}-\d{1,2}-\d{4}/img)) {
        date = stringDate.match(/\d{1,2}-\d{1,2}-\d{4}/img)[0].split('-').reverse();
    }
    if (stringDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/img)) {
        date = stringDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/img)[0].split('/').reverse();
    }

    date = date.map((dateString, index) => {
        return (index === 1) ? parseInt(dateString) - 1 : parseInt(dateString)
    })

    return `${date[0]}-${(`0${date[1] + 1}`).slice(-2)}`;
};
