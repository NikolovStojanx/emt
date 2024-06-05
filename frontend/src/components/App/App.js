import './App.css';
import React, {Component} from "react"
import Employees from '../Employees/EmployeeList/employees'
import Skills from '../Skills/skills'
import Types from '../Types/types'
import {BrowserRouter as Router, Redirect, Route, Routes, Navigate } from 'react-router-dom'
import Header from '../Header/header'
import EmployeesService from 'C:/Users/stoja/Desktop/za git/kol2022-g1-solution/emt/frontend/src/repository/employeesRepository.js'
import EmployeeAdd from '../Employees/EmployeeAdd/employeeAdd'
import EmployeeEdit from "../Employees/EmployeeEdit/EmployeeEdit";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
        skills: [],
        types: [],
        selectedEmployee: {}
    }
  }

  componentDidMount() {
    this.fetchData();
  }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/employees"}
                                   element={<Employees employees={this.state.employees}
                                                       onDelete={this.deleteEmployee}
                                                        onEdit={this.editEmployee}/>} />

                            <Route path={"/skills"} element={<Skills skills={this.state.skills} />} />

                            <Route path={"employees/add"}
                                   element={<EmployeeAdd
                                       skills={this.state.skills}
                                       types={this.state.types}
                                       onAddEmployee={this.addEmployee}/>}/>

                            <Route path={"/employees/edit/:id"} element={<EmployeeEdit
                                skills={this.state.skills}
                                types={this.state.types}
                                onEditEmployee={this.editEmployee}
                            employee={this.state.selectedEmployee}/>}/>

                            <Route path={"/employeeTypes"} element={<Types types={this.state.types} />} />

                            {/*<Route path={"/products/edit/:id"} exact render={() =>*/}
                            {/*    <ProductEdit categories={this.state.categories}*/}
                            {/*                 manufacturers={this.state.manufacturers}*/}
                            {/*                 onEditProduct={this.editProduct}*/}
                            {/*                 product={this.state.selectedProduct}/>}/>*/}
                            {/*<Route path={"/products"} exact render={() =>*/}
                            {/*    <Products products={this.state.products}*/}
                            {/*              onDelete={this.deleteProduct}*/}
                            {/*              onEdit={this.getProduct}/>}/>*/}


                            <Route path="*" element={<Navigate to="/employees" />}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        )
    }

  loadEmployees = () => {
    EmployeesService.fetchEmployees()
        .then((data) => {
          this.setState({
            employees: data.data
          })
        })
  }
  fetchData = () => {
      this.loadEmployees();
      this.loadTypes();
      this.loadSkills();
  }

  loadSkills = () => {
      EmployeesService.fetchSkills()
          .then((data) => {
              this.setState({
                  skills: data.data
              })
          })
  }

  loadTypes = () => {
      EmployeesService.fetchTypes()
          .then((data => {
              this.setState({
                  types: data.data
              })
          }))
  }

  deleteEmployee = (id) => {
      EmployeesService.deleteEmployee(id)
          .then(() => {
              this.loadEmployees();
          })
  }

  addEmployee = (name, email, skills, type) => {
      EmployeesService.addEmployee(name, email, skills, type)
          .then(() => {
              this.loadEmployees();
          });
  }



    getEmployee = (id) => {
        EmployeesService.getEmployee(id)
            .then((data) => {
                this.setState({
                    selectedEmployee: data.data
                });
            });
    }

  editEmployee = (id, name, email, skills) => {
      EmployeesService.editEmployee(id, name, email, skills)
          .then(() => {
              this.loadEmployees();
          })
  }
}

export default App;
