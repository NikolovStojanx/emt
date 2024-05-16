import axios from '../custom-axios/axios';

const EmployeesService = {
    fetchEmployees: () => {
        return axios.get("/employees/show");
    },
    fetchTypes: () => {
        return axios.get("/employees/employeeTypes");
    },
    fetchSkills: () => {
        return axios.get("/employees/skills");
    }
}

export default EmployeesService;