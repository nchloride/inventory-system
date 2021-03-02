

export const InventoryTablePending = ({stocks})=>{
    return (
        <table>
            <thead>
                <tr>
                    <th>Branch</th>
                    <th>Quantity</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Date</th>   
                </tr>
            </thead>
            <tbody>
                {stocks?.map(stock=>{
                    if(!stock.submittedBy)
                        return(
                            <tr key={stock._id}>
                                <td>{stock.branch}</td>
                                <td>{stock.stocks}</td>
                                <td>{stock.name}</td>
                                <td>{stock.price}</td>
                                <td>{stock.date}</td>
                            </tr>
                        )
                }
                )}
            </tbody>
        </table>
    )
}
export default InventoryTablePending;