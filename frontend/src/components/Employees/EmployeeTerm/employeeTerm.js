import React from 'react'
import {Link} from 'react-router-dom'
const employeeTerm = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.email}</td>
            <td scope={"col"} className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"}
                    onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
                {/*<a title={"Edit"} className={"btn"}*/}
                {/*    onClick={() => props.onEdit(props.term.id)}>*/}
                {/*    Edit*/}
                {/*</a>*/}
                <Link className={"btn btn-info ml-2"}
                    onClick={() => props.onEdit(props.term.id)}
                to={`/employees/edit/${props.term.id}`}>
                    Edit {props.term.email}
                </Link>
            </td>

        </tr>
    )
}

export default employeeTerm;