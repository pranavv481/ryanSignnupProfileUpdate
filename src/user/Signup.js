import React, { Component } from 'react'
import { signup } from "../auth";
export class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }

    handlerChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
            error: ""
        })
    }

    clickSubmit = (e) => {
        e.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name,
            email,
            password
        }
        // console.log(user)
        signup(user).then(data => {
            //  console.log(data)
            if (data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                })
            }
        })
    }



    signupForm(name, email, password) {

        return <>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" placeholder="name" onChange={this.handlerChange("name")} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" className="form-control" placeholder="email" onChange={this.handlerChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="text" className="form-control" placeholder="password" onChange={this.handlerChange("password")} value={password} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">SignUp</button>
        </>
    }



    render() {
        const { name, email, password, error, open } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    Signup
            </h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    Successfully Created User
                </div>
                {this.signupForm(name, email, password)}
            </div >
        )
    }
}

export default Signup
