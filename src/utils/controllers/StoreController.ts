import RoutesHandler from "./RoutesController";
import TokenController from "./TokenController";

class Stores{
    private storeAPIEndpoint:string ='/api/stores/';
    private routeHandler;
    private tokenHandler;
    private token;
    constructor(router){
        this.routeHandler = new RoutesHandler(router);
    }
    public async deleteStore(_id){
        const res = await fetch(`${this.storeAPIEndpoint}${_id}`,{
            method:"DELETE",
            mode:"cors",
            headers:{
                "authorization": `Bearer ${TokenController.getCookie}`
            }
        });
        const data = await res.json();
        this.routeHandler.refreshRoute();
        return data;
        
    }
    public async getStores(){
        return  await (await fetch(`${this.storeAPIEndpoint}`)).json();
    }
    public async updateStore(data){
        const updateData = await fetch(this.storeAPIEndpoint,{
            method:'PATCH',
            mode:"cors",
            body:JSON.stringify(data),
        })
        const response = await updateData.json();
        this.routeHandler.refreshRoute();
        return response;
    }
    public async addStore(data){
        const response = await fetch("/api/stores",{
            method:"POST",
            mode:"cors",
            headers:{
                "authorization": `Bearer ${TokenController.getCookie}`
            },
            body:JSON.stringify(data),
            
        });
        const result = await response.json();
        this.routeHandler.refreshRoute();
        return result;
    }
}
export default Stores;