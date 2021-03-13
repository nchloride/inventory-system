import RoutesHandler from "./RoutesController";
import TokenController from "./TokenController";

export  class EmployeeController{
    private employeeEndpoint = "/api/employees/";
    private routeHandler;
    constructor(router){
        this.routeHandler = new RoutesHandler(router);
    }
    public async setEmployee (employee){
        try{
            const res = await fetch(`${this.employeeEndpoint}`,{
            method:"POST",
            mode:"cors",
            body:JSON.stringify(employee),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${TokenController.getCookie}`
            }
            })
            this.routeHandler.refreshRoute();
           return await res.json();
        }
        catch(e){
            return e;
        }

    }
    public async getEmployees(){
        try {
            const employees = await fetch(this.employeeEndpoint,{
                method:"GET",
                mode:'cors',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${TokenController.getCookie}`
                }
            });
            return await employees.json();
        } catch (error) {
            return error
        }
    }
    public async deleteEmployee(id:string){
        try {
            const res = await fetch(`${this.employeeEndpoint}${id}`,{
                method:"DELETE",
                mode:"cors"
            });
            const data = await res.json();
            this.routeHandler.refreshRoute();
            return data;
        } catch (error) {
            return error;
        }
    }

} 
export default EmployeeController;