import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { useEffect } from 'react';

const ProductTable = ({products}) =>{
    const tableHead =  Object.keys(products[0]);
    return(
        <table>
            <thead>
                <tr>
                    {tableHead?.map((header,id)=>{
                         if(header !=="_id") return <th key={id}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
                    })}
                
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products?.reverse().map((product,id)=>(
                    <tr key={id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stocks}</td>
                        <td>{product.date.slice(0,10)}</td>
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