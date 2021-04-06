import RoutesHandler from "./RoutesController";
import TokenController from "./TokenController";

class Stores{
    private storeAPIEndpoint:string ='/api/stores/';
    private routeHandler;
    private tokenHandler;
    private token;

    constructor(router,cookie){
        this.routeHandler = new RoutesHandler(router);
        this.token = cookie;
    }
    public async deleteStore(_id){
        const res = await fetch(`${this.storeAPIEndpoint}${_id}`,{
            method:"DELETE",
            mode:"cors",
            headers:{
                "authorization": `Bearer ${this.token}`
            }
        });
        const data = await res.json();
        this.routeHandler.refreshRoute();
        return data;
        
    }
    public async updateStore(data){
        const updateData = await fetch(this.storeAPIEndpoint,{
            method:'PATCH',
            mode:"cors",
            body:JSON.stringify(data),
            headers:{
                "authorization": `Bearer ${this.token}`
            },
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
                "authorization": `Bearer ${this.token}`
            },
            body:JSON.stringify(data),
            
        });
        const result = await response.json();
        this.routeHandler.refreshRoute();
        return result;
    }
}
export default Stores;