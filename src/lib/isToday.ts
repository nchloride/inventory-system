function isToday (date:string):boolean{
    return Date().toString().slice(4,15) === new Date(date).toString().slice(4,15);
}

export default isToday;