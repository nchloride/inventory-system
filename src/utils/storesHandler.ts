class Stores{
    private storeAPIEndpoint:string ='/api/stores/';
    public async deleteStore(_id){
        const res = await fetch(`${this.storeAPIEndpoint}${_id}`,{
            method:"DELETE",
            mode:"cors",
        });
        const data = await res.json();
        return data;
        
    }
}
export default new Stores;