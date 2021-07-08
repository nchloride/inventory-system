import RouterHandler from "./RoutesController";
import IProduct from "../../types/product";

class ProductsService {
    private router;
    private token;
    private apiEndPoint:string = "/api/products";
    constructor(router,token){
        this.router = new RouterHandler(router),
        this.token = token;
    }
    private async fetchData<T>(data:T , METHOD:string , params:string=""){
        const response = await fetch(`${this.apiEndPoint}/${params}`,{
            method:'POST',
            body: data && JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.token}`,
            }
        })
        const result = await response.json();
        this.router.refreshRoute();
        return result;
    }
    public async addProduct(data:IProduct){
        return this.fetchData(data,'POST');
    }
}
export default ProductsService