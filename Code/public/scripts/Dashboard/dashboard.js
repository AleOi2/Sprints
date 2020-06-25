const RevDate = 'revenueDate';
const CostDate = 'costsDate';
const TableDate = 'tableDate';
const calendarData = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
}
const chartRevIn = 'chartRevenueInput'
const chartCosIn = 'chartCostsInput'
const categType = 'categoryType'
const predData = 'predictionDatas';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pizza Component
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawChart(entryData, title) {
    var data = google.visualization.arrayToDataTable(entryData);
    var options = {
        title: title,
        backgroundColor: 'white',
        chartArea: {
            left: 50,
            top: '10%',
            width: '90%',
            height: '90%'
        },
        fontSize: 22,
        legend: {
            position: 'right',
            textStyle: {
                color: 'blue',
                fontSize: 18
            }
        },
        titleTextStyle: {
            fontSize: 30
        }

    };
    var chart1 = new google.visualization.PieChart(document.getElementsByClassName('piechart')[(title ===
        'Revenue') ? 0 : 1]);
    chart1.draw(data, options);
}

function groupByDate(arr) {
    let grouped = {}; let yearMonth;
    for (let element of arr) {
        yearMonth = Object.keys(element)[0];
        if (!(yearMonth in grouped)) {
            grouped[yearMonth] = {
                [element[yearMonth].Category.label]: parseInt(element[yearMonth].sum),
            }
        } else {
            grouped[yearMonth] = {
                ...grouped[yearMonth],
                [element[yearMonth].Category.label]: parseInt(element[yearMonth].sum),
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
    let releases = []; let type; let index = 0;
    for (let element in parsedData[date]) {
        type = Object.keys(element)[0]
        releases.push(Object.keys(parsedData[date])[index].toUpperCase().replace('.PNG', ''));
        releases.push(parsedData[date][element]);
        pieRevenueCostData.data.push(releases);
        releases = []
        index = index + 1
    }
    return pieRevenueCostData;
}

// Receive a date string 2020-02-10 or 2020/02/10 or 10-02-2020 or 10/02/2020
// Return date array [2020, 02, 10] for wherever case  
const returnDateStringArray = (stringDate) => {
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

    return date;
}

// Convert a stringDate to Year-Month: 2020-20-10 -> 2020-20 
const pickYearMonth = (stringDate) => {
    stringDate = stringDate.trim();
    let date = [];
    date = returnDateStringArray(stringDate);
    date = date.map((dateString, index) => {
        return (index === 1) ? parseInt(dateString) - 1 : parseInt(dateString)
    })

    return `${date[0]}-${(`0${date[1] + 1}`).slice(-2)}`;
};

// Similar to returnDateStringArray but .. only consider month and year 
// Receive a date string 2020-02 or 2020/02 or 02-2020 or 02/2020
// Return date array [2020, 02] for wherever case  
const returnOnlyYearMonth = (stringDate) => {
    if (stringDate.match(/\d{4}-\d{1,2}/img)) {
        date = stringDate.match(/\d{4}-\d{1,2}/img)[0].split('-');
    }
    if (stringDate.match(/\d{4}\/\d{1,2}/img)) {
        date = stringDate.match(/\d{4}\/\d{1,2}/img)[0].split('/');
    }
    if (stringDate.match(/\d{1,2}-\d{4}/img)) {
        date = stringDate.match(/\d{1,2}-\d{4}/img)[0].split('-').reverse();
    }
    if (stringDate.match(/\d{1,2}\/\d{4}/img)) {
        date = stringDate.match(/\d{1,2}\/\d{4}/img)[0].split('/').reverse();
    }
    return date;
}


//Receive month-year (String) -> "2020-06"
// Convert to Junho/2020
const convertDateToLabel = (stringDate) => {
    let date = returnOnlyYearMonth(stringDate);
    date = date.map((dateString, index) => {
        return parseInt(dateString)
    })
    date[1] = calendarData[date[1]];
    let returnedStr = date[1] + '/' + date[0];

    return returnedStr;
}

const AddDate = (today, Div, type) => {
    // thisMonthYear = [2020, 1]
    let thisMonthYear = returnOnlyYearMonth(today)
    thisMonthYear = thisMonthYear.map((dateString, index) => {
        return parseInt(dateString)
    })
    let nextMonth = thisMonthYear;
    // nextMonth = [2020, 2] or if thisMonthYear = [2020, 12]  [2021, 1] 
    if (thisMonthYear[1] < 12) nextMonth[1] = thisMonthYear[1] + 1;
    else {
        nextMonth[1] = 1;
        nextMonth[0] = thisMonthYear[0] + 1;
    }
    //Saving into session
    if (nextMonth[1] < 10) sessionStorage.setItem(type, nextMonth[0] + '-' + '0' + nextMonth[1]);
    else sessionStorage.setItem(type, nextMonth[0] + '-' + nextMonth[1]);
    // Convert to [Fevereiro/2020] and put on Div
    Div.html(convertDateToLabel(nextMonth[1] + '/' + nextMonth[0]));

}

// today is this month and this year 2020-02
// type is revenueDate or costsDate
const AddPizza = (today, type, Div, chart, title) => {
    // change session storage date from date button
    AddDate(today, Div, type)
    // Refresh Chart
    let pieData = {
        data: [
            ['Task', 'Hours per Day']
        ],
        title: title
    };
    let chartInput = completeObj(chart, pieData, sessionStorage.getItem(type));
    drawChart(chartInput.data, chartInput.title);
}

const ReduceDate = (today, Div, type) => {
    // thisMonthYear = [2020, 1]
    let thisMonthYear = returnOnlyYearMonth(today)
    thisMonthYear = thisMonthYear.map((dateString, index) => {
        return parseInt(dateString)
    })
    let nextMonth = thisMonthYear;
    // nextMonth = [2019, 12] or if thisMonthYear = [2020, 12]  [2020, 11] 
    if (thisMonthYear[1] > 1) nextMonth[1] = thisMonthYear[1] - 1;
    else {
        nextMonth[1] = 12;
        nextMonth[0] = thisMonthYear[0] - 1;
    }
    //Saving into session
    if (nextMonth[1] < 10) sessionStorage.setItem(type, nextMonth[0] + '-' + '0' + nextMonth[1]);
    else sessionStorage.setItem(type, nextMonth[0] + '-' + nextMonth[1]);

    // Convert to [Fevereiro/2020]
    Div.html(convertDateToLabel(nextMonth[1] + '/' + nextMonth[0]))
}

// today is this month and this year 2020-02
// type is revenueDate or costsDate
const ReducePizza = (today, type, Div, chart, title) => {
    // change session storage date from date button
    ReduceDate(today, Div, type);
    // Refresh Chart
    let pieData = {
        data: [
            ['Task', 'Hours per Day']
        ],
        title: title
    };
    let chartInput = completeObj(chart, pieData, sessionStorage.getItem(type));
    drawChart(chartInput.data, chartInput.title);
}

// Functions for Table component
// Recicle groupByDate and parseData
function groupByDate2(arr) {
    let grouped = {}; let yearMonth;
    for (let element of arr) {
        yearMonth = Object.keys(element)[0];
        if (!(yearMonth in grouped)) {
            grouped[yearMonth] = {
                [element[yearMonth].Category.category.toUpperCase().replace('.PNG', '')]: parseInt(element[yearMonth].sum),
            }
        } else {
            grouped[yearMonth] = {
                ...grouped[yearMonth],
                [element[yearMonth].Category.category.toUpperCase().replace('.PNG', '')]: parseInt(element[yearMonth].sum),
            }
        }
    }
    return grouped;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Table Component
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Data parser for prediction input
const predictionParser = (prediction) => {
    prediction = prediction.map((predict) => {
        return {
            valuePredict: predict.valuePredict,
            category_id: predict.category_id,
            users_id: predict.users_id,
            label: predict.Category.label,
            category: predict.Category.category,
            type: predict.Category.type,
        }
    })
    let predictionParsed = {}
    for (let element of prediction) {
        predictionParsed[element.category.toUpperCase().replace('.PNG', '')] = element

    }
    return predictionParsed;
}

// Convert to:
// {2020-06:{obj}, 2020-07:{obj},}
function parserData2(revenueCost) {
    // Convert to:
    // {2020-06:{obj1 -> category1}, 2020-06:{obj2 -> category2}, 2020-07:{obj1},}
    let parsedData = revenueCost.map((element, index) => {
        return ({ [element.month_year]: element })
    })
    // Convert to:
    // {2020-06:{obj}, 2020-07:{obj}, 2020-08:{obj}}
    // obj:{ categoria: sumValue}
    return groupByDate2(parsedData);
}


function completeObjTable(revenueCost, pieRevenueCostData, date) {
    // Convert revenueCost to:
    // {2020-06:{obj}, 2020-07:{obj},}
    let parsedData = parserData2(revenueCost);
    let type; let index = 0;
    for (let element in parsedData[date]) {
        type = Object.keys(element)[0]
        pieRevenueCostData.data[Object.keys(parsedData[date])[index].toUpperCase().replace('.PNG', '')] =
            parsedData[date][element];
        index = index + 1
    }
    return pieRevenueCostData;
}

const AddTable = (today, type, Div, revenueData, costsData, categTypes, predictionData) => {
    // change session storage date from date button
    AddDate(today, Div, type);
    let merge = { data: {}, };
    // let mergeData = [...revenueData, ...costsData];
    let mergeData =  costsData;
    // convert [{month_year,category_id,sum, User:{}, Categor:{}},{month_year,category_id,sum, User:{}, Categor:{}},...]
    // to {data:{Educação:200, Lazer: 9, ...}}
    let merged = completeObjTable(mergeData, merge, sessionStorage.getItem(type), categTypes);
    categTypes = categTypes.map((element) => {
        return element.toUpperCase().replace('.PNG', '')
    })
    completeTable(merged, categTypes, predictionData);
}


const ReduceTable = (today, type, Div, revenueData, costsData, categTypes, predictionData) => {
    // change session storage date from date button (table component)
    ReduceDate(today, Div, type);
    let merge = { data: {}, };
    // let mergeData = [...revenueData, ...costsData];
    let mergeData =  costsData;
    //Complete all revenue and costs data -> merged = {data:[[Educaçao:200], [Saúde:10], [Viagem:80]]}
    let merged = completeObjTable(mergeData, merge, sessionStorage.getItem(type), categTypes);
    //merged = {data:[[Educaçao:200], [Saúde:10], [Viagem:80]]}
    //categTypes = ["Educação", "Empréstimo(R), Mercado, Moradia ,..."]
    completeTable(merged, categTypes, predictionData);

}

const completeTable = (merged, categTypes, predictionData) => {
    let diff; let real; let prediction;
    for (let element of categTypes) {
        $("#" + element + "1").html(predictionData[element].label.toUpperCase())
        $("#" + element + "2").html(predictionData[element].valuePredict)
        $("#" + element + "3").html((merged.data[element]) ? merged.data[element] : 0)
        if (merged.data[element]) diff = predictionData[element].valuePredict - merged.data[element]
        else diff = predictionData[element].valuePredict
        $("#" + element + "4").html(diff)

        real = (merged.data[element]) ? merged.data[element] : 0;
        prediction = (parseFloat(predictionData[element].valuePredict))?parseFloat(predictionData[element].valuePredict):0;

        if (real === 0 && prediction === 0) {
            console.log(1)
            // print green
            $("#" + element + "6").css({ width: "100%", borderRadius: '10px' });
            $("#" + element + "7").css({ width: "0%", });

            $("#" + element + "5").css({ color: 'green' });
            $("#" + element + "5").attr('class', "fas fa-thumbs-up fa-2x");
        } else if (real > 0 && prediction == 0) {
            console.log(2)
            // print red
            $("#" + element + "6").css({ width: "0%" });
            $("#" + element + "7").css({ width: "100%", borderRadius: '10px' });

            $("#" + element + "5").css({ color: 'red' });
            $("#" + element + "5").attr('class', "fas fa-thumbs-down  fa-2x");

        } else if (real === 0 && prediction > 0) {
            console.log(3)
            // print green
            $("#" + element + "6").css({ width: "100%", borderRadius: '10px' });
            $("#" + element + "7").css({ width: "0%", });

            $("#" + element + "5").css({ color: 'green' });
            $("#" + element + "5").attr('class', "fas fa-thumbs-up fa-2x");
        } else if (real > prediction) {
            // print red
            $("#" + element + "6").css({ width: "0%" });
            $("#" + element + "7").css({ width: "100%", borderRadius: '10px' });

            $("#" + element + "5").css({ color: 'red' });
            $("#" + element + "5").attr('class', "fas fa-thumbs-down  fa-2x");

        } else if (real > 0 && real <= prediction) {
            let greenWidth = real / prediction * 100;
            let redWidth = 100 - real / prediction * 100;
            console.log("Devemos estar aqui")
            $("#" + element + "6").css({ 
                width: greenWidth.toString() + "%" ,
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px'
            });
            $("#" + element + "7").css({
                width: redWidth.toString() + "%",
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px'
            });

            $("#" + element + "5").css({ color: 'green' });
            $("#" + element + "5").attr('class', "fas fa-thumbs-up fa-2x");
        }
    }
}

// Open modal
const openModal = (index, categType) => {
    $("#Modal" + index).appendTo("body").modal('show');
    $("#Modal" + index).modal('show');
    let prediction = $("#" + categType[index] + "2").html()
    $("#newValue" + index).val(prediction);

}

// Merge All functions
const renderAllReduce = (
    today, type,
    DivRevenue, chartRevenue, titleRevenue,
    DivCost, chartCost, titleCost,
    DivTable, categTypes, predictionData
) => {
    ReducePizza(today, type, DivRevenue, chartRevenue, titleRevenue);
    ReducePizza(today, type, DivCost, chartCost, titleCost);
    ReduceTable(today, type, DivTable, chartRevenue, chartCost, categTypes, predictionData);
}

const renderAllAdd = (
    today, type,
    DivRevenue, chartRevenue, titleRevenue,
    DivCost, chartCost, titleCost,
    DivTable, categTypes, predictionData
) => {
    AddPizza(today, type, DivRevenue, chartRevenue, titleRevenue);
    AddPizza(today, type, DivCost, chartCost, titleCost);
    AddTable(today, type, DivTable, chartRevenue, chartCost, categTypes, predictionData);
}

