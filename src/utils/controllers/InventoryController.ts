
import RoutesController from "./RoutesController"


enum EMethods{
    get = 'GET',
    post ='POST',
    put ='PUT',
    delete = 'DELETE',
    patch= 'PATCH'
}
export default  class InventoryController{
    private apiEndpoint:string = '/api/inventory';
    private routesController;
    private token
    constructor(router,token){
        this.routesController =new RoutesController(router);
        this.token = token
    }
    private async fetchData<T>(data:Partial<T>,endpoint:string,method:EMethods){
        try{
            const res = await fetch(this.apiEndpoint,{
                method,
                mode:"cors",
                headers:{
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                },
                ...(data && {body:JSON.stringify(data)})
            });
            const responseData = await res.json();
            
            if(responseData.message){
                this.routesController.refreshRoute();
            }

            return responseData;
        }
        catch(error){
            return error
        }
    }
    public async setStocks(data){
        return await this.fetchData(data,this.apiEndpoint,EMethods.post)
    }
}