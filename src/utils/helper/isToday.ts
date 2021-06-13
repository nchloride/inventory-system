
function dateToday():string{
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDate().toString().length ===1? `0${date.getDate()}`:date.getDate();
    const month = (date.getMonth() + 1).toString().length ===1? `0${date.getMonth()}`:date.getMonth();
    
    return `${year}-${month}-${day}`;
}

function isToday (date : string | Date) : boolean {
  //  return dateToday() === (date).toString().slice(0,10);
    return Date().toString().slice(4,15) === new Date(date).toString().slice(4,15);

}

export default isToday;