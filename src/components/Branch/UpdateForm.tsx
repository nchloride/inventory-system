import React from 'react'

const UpdateForm = ({store:{_id,location,branch},setOpenUpdateForm}) => {
    return (
        <div>
            <h1>{_id}</h1>
            <h1>{location}</h1>
            <h1>{branch}</h1>
            <button onClick={()=> setOpenUpdateForm(false)}>X</button>
        </div>
    )
}


export default UpdateForm
