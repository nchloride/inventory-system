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
    public async getStores(){
        return  await (await fetch(`${this.storeAPIEndpoint}`)).json();
    }
    public async updateStore(data){
        const updateData = await fetch(this.storeAPIEndpoint,{
            method:'PATCH',
            mode:"cors",
            body:JSON.stringify(data),
        })
        const response = await updateData.json()
        return response;
    }
}
export default new Stores;