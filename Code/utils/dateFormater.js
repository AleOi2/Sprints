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
  
module.exports = {
    pickYearMonth,
    converToDate   
}