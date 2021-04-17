import RoutesHandler from "./RoutesController";
import TokenController from "./TokenController";

interface IUpdateData{
    name:string,
    address:string,
    username:string,
    newPassword:string,
    branch:string,
    rate:number

}
export  class EmployeeController{
    private employeeEndpoint = "/api/employees/";
    private routeHandler;
    private token;
    constructor(router, token){
        this.routeHandler = new RoutesHandler(router);
        this.token=token;
    }
    private async fetchData(data = [],method:string,endpoint = this.employeeEndpoint){
        try{
            const res = await fetch(endpoint,{
            method,
            mode:"cors",
            body: data && JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${this.token}`
            }
            })
            this.routeHandler.refreshRoute();
           return await res.json();
        }
        catch(e){
            return e;
        }
    }
    public async setEmployee (employee){
        return this.fetchData(employee,"POST");
    }
    public async getEmployees(){
        return this.fetchData(null,"GET");
    }
    public async deleteEmployee(id:string){
        return this.fetchData([],"DELETE",`${this.employeeEndpoint}${id}`)
    }
    public async updateEmployee(data){
        return this.fetchData(data,"PATCH");
    }

} 
export default EmployeeController;