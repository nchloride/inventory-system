import RoutesHandler from "./RoutesController";
import TokenController from "./TokenController";

enum EMethods{
    get = 'GET',
    post ='POST',
    put ='PUT',
    delete = 'DELETE',
    patch= 'PATCH'
}

class BranchService{
    private storeAPIEndpoint:string ='/api/stores/';
    private routeHandler;
    private tokenHandler;
    private token;

    constructor(router,cookie){
        this.routeHandler = new RoutesHandler(router);
        this.token = cookie;
    }
    private async fetchData<T>(body:Partial<T>,endpoint:string,method:EMethods){
        try {
            const res = await fetch(endpoint,{
                method,
                mode:"cors",
                headers:{
                    "authorization": `Bearer ${this.token}`
                },
                ...(body && {body:JSON.stringify(body)})
            });
            const data = await res.json();

            this.routeHandler.refreshRoute();

            return data;
        } catch (error) {
            return error
        }
    }
    public async deleteStore(_id){
        return await this.fetchData(null,`${this.storeAPIEndpoint}${_id}`,EMethods.delete)
    }
    public async updateStore(data){
        return await this.fetchData(data,this.storeAPIEndpoint,EMethods.patch);
    }
    public async addStore(data){
        return await this.fetchData(data,this.storeAPIEndpoint,EMethods.post)
    }
}
export default BranchService;