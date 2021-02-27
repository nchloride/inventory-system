export default function DateTimeNow():string{
    const dateNow = new Date();
    const YYYY = dateNow.getFullYear();
    const mm = (dateNow.getMonth()+1).toString().length ===1? "0"+(dateNow.getMonth()+1).toString():(dateNow.getMonth()+1).toString() ;
    const dd = dateNow.getDate();
    const HH = dateNow.getHours();
    const MM = dateNow.getMinutes();
    const ss = dateNow.getSeconds();
    return `${YYYY} ${mm} ${dd}T${HH} ${MM} ${ss}`.replaceAll(" ","-");
}