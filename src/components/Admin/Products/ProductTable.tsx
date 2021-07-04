import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';

const ProductTable = ({products}) =>{
    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stocks</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,id)=>(
                    <tr key={id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stocks}</td>
                        <td>
                            <button className="edit_button"><EditIcon/></button>
                            <button className="delete_button"><DeleteForever/></button>
                        </td>
                    </tr>   
                ))}
            </tbody>
        </table>
    )
}

export default ProductTable