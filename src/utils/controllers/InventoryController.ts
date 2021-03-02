import RoutesController from "./RoutesController"
export default  class InventoryController{
    private apiEndpoint:string = '/api/inventory';
    private routesController;
    constructor(router){
        this.routesController =new RoutesController(router);
    }
    
    public async setStocks(data){
        try{
            const res = await fetch(this.apiEndpoint,{
                method:"POST",
                mode:"cors",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)        
            });
            const responseData = await res.json();
            // this.router.push(this.router.asPath);
            this.routesController.refreshRoute();
            return responseData;
        }
        catch(error){
            return error
        }
    }
}