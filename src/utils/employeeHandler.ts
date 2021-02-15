export default new class Employee{
    private employeeEndpoint = "/api/employees/";
    public async setEmployee (employee){
        try{
            const res = await fetch(`${this.employeeEndpoint}`,{
            method:"POST",
            mode:"cors",
            body:JSON.stringify(employee)
            })
           return await res.json();
        }
        catch(e){
            return e;
        }

    }
    public async getEmployees(){
        try {
            const employees = await fetch(this.employeeEndpoint);
            return await employees.json();
        } catch (error) {
            return error
        }
    }

} 