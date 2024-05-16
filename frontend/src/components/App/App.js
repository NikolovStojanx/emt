import './App.css';
import React, {Component} from "react"
import Employees from '../Employees/employees'
import Skills from '../Skills/skills'
import Types from '../Types/types'
import {BrowserRouter as Router, Redirect, Route, Routes, Navigate } from 'react-router-dom'
import EmployeesService from 'C:/Users/stoja/Desktop/za git/kol2022-g1-solution/frontend/src/repository/employeesRepository.js'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
        skills: [],
        types: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
        <Router>
            <Routes>
            <main>
                <div className="container">
                    <Route path={"/employees"} exact render={() => <Employees employees={this.state.employees}/>}/>
                    <Route path={"/skills"} exact render={() => <Skills skills={this.state.skills}/>}/>
                    <Route path={"/employeeTypes"} exact render={() => <Types types={this.state.types}/>}/>
                </div>
            </main>
            </Routes>
            <Redirect to={"/employees"}/>

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
}

export default App;
