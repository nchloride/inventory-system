


const Table = ({arrayData}) =>{
    const tableHeaders = Object.keys(arrayData[0]);

    return (
        <table>
            <thead>
                <tr>
                    {tableHeaders.map((header,id)=>{
                        if(header !=="_id") return  <th key={id}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    arrayData.map((data,id)=>{
                        return (
                            <tr>
                                {tableHeaders.map((header,id)=>{
                                    if(header !=="_id") return  <td key={id}>{data[header]}</td>
                                })}
                            </tr>
                        ) 
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;