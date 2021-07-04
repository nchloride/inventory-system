import RouterHandler from "./RoutesController";

class ProductsService {
    private router;
    private token;
    constructor(router,token){
        this.router = new RouterHandler(router),
        this.token = token;
    }
    private fetchData(){

    }
}
export default ProductsService