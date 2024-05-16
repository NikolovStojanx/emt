import React from "react"

const employees = (props) => {
    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"row"}>
                    <table className={"table table-striped"}>
                        <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.employees.map((term) => {
                            return (
                                <tr>
                                    <td>{term.name}</td>
                                    <td>{term.email}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default employees;