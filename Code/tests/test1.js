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

    let date = returnOnlyYearMonth(stringDate);
    date = date.map((dateString, index) => {
        return (index === 1) ? parseInt(dateString) - 1 : parseInt(dateString)
    })
    date[1] = calendarData[date[1]];
    let returnedStr = date[1] + '/' + date[0];
    
    return returnedStr;

}

//debug
console.log(convertDateToLabel("2020-06"));

