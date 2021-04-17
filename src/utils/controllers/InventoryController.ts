
import RoutesController from "./RoutesController"
export default  class InventoryController{
    private apiEndpoint:string = '/api/inventory';
    private routesController;
    private token
    constructor(router,token){
        this.routesController =new RoutesController(router);
        this.token = token
    }
    
    public async setStocks(data){
        try{
            const res = await fetch(this.apiEndpoint,{
                method:"POST",
                mode:"cors",
                headers:{
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                },
                body:JSON.stringify(data)        
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
}