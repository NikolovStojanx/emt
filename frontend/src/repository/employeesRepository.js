import axios from '../custom-axios/axios';
import skills from "../components/Skills/skills";

const EmployeesService = {
    fetchEmployees: () => {
        return axios.get("/employees/show");
    },
    fetchTypes: () => {
        return axios.get("/employees/employeeTypes");
    },
    fetchSkills: () => {
        return axios.get("/employees/skills");
    },
    deleteEmployee: (id) => {
        return axios.delete(`/employees/delete/${id}`);
    },

    addEmployee: (name, email, skill, type) => {
        const data = {
            "name": name,
            "email": email,
            "skill": skill,
            "type": type
        };

        return axios.post("/employees/add", data);
    },
    editEmployee: (id, name, email, skills) => {
        const data = {
            "name": name,
            "email": email,
            "skills": skills
        }
        return axios.put(`/employees/edit/${id}`, );
    },
    getEmployee: (id) => {
        return axios.get(`employees/${id}`);
    }
}

export default EmployeesService;