import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd = (props) => {
    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        email: "",
        type: "",
        skills: ""
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const { name, email, type, skills } = formData;

        props.onAddEmployee(name, email, type, skills);
        navigate("/employees");
    };

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Employee name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                            placeholder="Enter employee name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Employee Type</label>
                        <select
                            name="type"
                            className="form-control"
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected>Select type</option>
                            {props.types.map((term, index) => (
                                <option key={index} value={term}>{term}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Employee Skill</label>
                        <select
                            name="skills"
                            className="form-control"
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected>Select skill</option>
                            {props.skills.map((term) => (
                                <option key={term.id} value={term.id}>{term.name}</option>
                            ))}
                        </select>
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAdd;
