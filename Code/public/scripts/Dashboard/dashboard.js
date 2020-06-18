const RevDate = 'revenueDate';
const CostDate = 'costsDate';
const calendarData = {
    1:'Janeiro',
    2:'Fevereiro',
    3:'Março',
    4:'Abril',
    5:'Maio',
    6:'Junho',
    7:'Julho',
    8:'Agosto',
    9:'Setembro',
    10:'Outubro',
    11:'Novembro',
    12:'Dezembro',
}
const chartRevIn = 'chartRevenueInput'
const chartCosIn = 'chartCostsInput'


function drawChart(entryData, title) {
    var data = google.visualization.arrayToDataTable(entryData);
    console.log("Verificando entrada")
    console.log(data)
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

// Receive a date string 2020-02-10 or 2020/02/10 or 10-02-2020 or 10/02/2020
// Return date array [2020, 02, 10] for wherever case  
const returnDateStringArray = (stringDate) =>{
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
const returnOnlyYearMonth = (stringDate) =>{
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
const convertDateToLabel = (stringDate) =>{
    let date = returnOnlyYearMonth(stringDate);
    date = date.map((dateString, index) => {
        return parseInt(dateString)
    })
    date[1] = calendarData[date[1]];
    let returnedStr = date[1] + '/' + date[0];

    return returnedStr;
}

// today is this month and this year 2020-02
// type is revenueDate or costsDate
const Add = (today, type, Div, chart, title) =>{
    // thisMonthYear = [2020, 1]
    let thisMonthYear = returnOnlyYearMonth(today)
    thisMonthYear = thisMonthYear.map((dateString, index) => {
        return parseInt(dateString)
    })
    let nextMonth = thisMonthYear;
    // nextMonth = [2020, 2] or if thisMonthYear = [2020, 12]  [2021, 1] 
    if(thisMonthYear[1] < 12) nextMonth[1] = thisMonthYear[1] + 1;
    else{
        nextMonth[1] = 1;
        nextMonth[0] = thisMonthYear[0] + 1;
    }
    //Saving into session
    if(nextMonth[1]< 10) sessionStorage.setItem(type, nextMonth[0] + '-' + '0' + nextMonth[1]);
    else sessionStorage.setItem(type, nextMonth[0] + '-' + nextMonth[1]);    
    // Refresh Chart
    let pieData = {
        data: [
            ['Task', 'Hours per Day']
        ],
        title: title
    };
    let chartInput = completeObj(chart, pieData, sessionStorage.getItem(type));
    drawChart(chartInput.data, chartInput.title);

    // Convert to [Fevereiro/2020] and put on Div
    nextMonth[1] = calendarData[nextMonth[1]];
    Div.html(convertDateToLabel(nextMonth[1] + '/' + nextMonth[0]));
}

// today is this month and this year 2020-02
// type is revenueDate or costsDate
const Reduce = (today, type, Div, chart, title) =>{
    // thisMonthYear = [2020, 1]
    let thisMonthYear = returnOnlyYearMonth(today)
    thisMonthYear = thisMonthYear.map((dateString, index) => {
        return parseInt(dateString)
    })
    let nextMonth = thisMonthYear;
    // nextMonth = [2019, 12] or if thisMonthYear = [2020, 12]  [2020, 11] 
    if(thisMonthYear[1] > 1) nextMonth[1] = thisMonthYear[1] - 1;
    else{
        nextMonth[1] = 12;
        nextMonth[0] = thisMonthYear[0] - 1;
    }
    //Saving into session
    if(nextMonth[1]< 10) sessionStorage.setItem(type, nextMonth[0] + '-' + '0' + nextMonth[1]);
    else sessionStorage.setItem(type, nextMonth[0] + '-' + nextMonth[1]);    

    // Refresh Chart
    let pieData = {
        data: [
            ['Task', 'Hours per Day']
        ],
        title: title
    };
    let chartInput = completeObj(chart, pieData, sessionStorage.getItem(type));
    drawChart(chartInput.data, chartInput.title);

    // Convert to [Fevereiro/2020]
    nextMonth[1] = calendarData[nextMonth[1]];
    Div.html(convertDateToLabel(nextMonth[1] + '/' + nextMonth[0]))
}

