// Convert String to Date
//2020-02-27 07:18
const converToDate = (stringDate) =>{
    stringDate = stringDate.trim();
  
    let date = [];
    if(stringDate.match(/\d{4}-\d{1,2}-\d{1,2}/img)){
      date = stringDate.match(/\d{4}-\d{1,2}-\d{1,2}/img)[0].split('-');
    }
    if(stringDate.match(/\d{4}\/\d{1,2}\/\d{1,2}/img)){
      date = stringDate.match(/\d{4}\/\d{1,2}\/\d{1,2}/img)[0].split('/');
    }
    if(stringDate.match(/\d{1,2}-\d{1,2}-\d{4}/img)){
      date = stringDate.match(/\d{1,2}-\d{1,2}-\d{4}/img)[0].split('-').reverse();
    }
    if(stringDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/img)){
      date = stringDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/img)[0].split('/').reverse();
    }
  
    date = date.map((dateString, index) =>{
      return (index === 1)?parseInt(dateString) - 1:parseInt(dateString)
    })
  
    let time = [];
    if(stringDate.match(/\d{1,2}:\d{1,2}/img)){
      time = stringDate.match(/\d{1,2}:\d{1,2}/img)[0].split(':');
  
    } 
    if(stringDate.match(/\d{1,2}:\d{1,2}:\d{1,2}/img)){
      time = stringDate.match(/\d{1,2}:\d{1,2}:\d{1,2}/img)[0].split(':');
  
    } 
    if(stringDate.match(/\d{1,2}:\d{1,2}:\d{1,2}:\d{3}/img)){
      time = stringDate.match(/\d{1,2}:\d{1,2}:\d{1,2}:\d{3}/img)[0].split(':');
  
    }      
  
    time = time.map((timeString) =>{
      return parseInt(timeString);
    })
  
    return convertedDate = new Date(...date.concat(time));
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



module.exports = {
    pickYearMonth,
    converToDate,
}