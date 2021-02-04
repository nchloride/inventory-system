import {GetServerSideProps} from "next";


export const BranchTable = () =>{
    return (
        <table>
            <thead></thead>
            <tbody></tbody>
        </table>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    return{
        props:{

        }
    }
  }

  export default BranchTable;