import isToday from './isToday';
import {IStocks} from "../../types/inventory";




const intervalFilter = (denomination,stocks:IStocks[],storeCount) => {
    const stocksFilter = {
        all:stocks,
        day:stocks.filter(stock=> isToday(stock.date)).slice(0,storeCount),
    }
    return stocksFilter[denomination]
}

export default intervalFilter
 