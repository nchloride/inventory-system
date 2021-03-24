

export const InventoryTablePending = ({stocks})=>{
    function isToday (date:string):boolean{
        return Date().toString().slice(4,15) === new Date(date).toString().slice(4,15);
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Branch</th>
                    <th>Quantity</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Date</th>   
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {stocks?.map(stock=>{
                    if(isToday(stock.date))
                        return(
                            <tr key={stock._id}>
                                <td>{stock.branch}</td>
                                <td>{stock.stocks}</td>
                                <td>{stock.name}</td>
                                <td>{stock.price}</td>
                                <td>{stock.date}</td>
                                <td><strong>{!stock.submittedBy? "Pending" : "Approving"}</strong></td>
                            </tr>
                        )
                    
                }  
                )}
            </tbody>
        </table>
    )
}
export default InventoryTablePending;