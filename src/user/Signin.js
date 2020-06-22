import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from "../auth";
export class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToRender: false,
            loading: false
        }
    }

    handlerChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
            error: ""
        })
    }

    authenticate(jwt, next) {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }

    clickSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        const { email, password } = this.state
        const user = {
            email,
            password
        }
        // console.log(user)
        signin(user).then(data => {
            // console.log(data)
            if (data.error) {
                this.setState({
                    error: data.error,
                    loading: false
                })
            } else {
                authenticate(data, () => {
                    this.setState({
                        redirectToRender: true
                    })
                })
            }
        })
    }

    signin(user) {
        return fetch("http://localhost:8080/api/signin",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .catch(err => {
                console.log(err)
            })
    }

    signinForm(email, password) {

        return <>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" className="form-control" placeholder="email" onChange={this.handlerChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="text" className="form-control" placeholder="password" onChange={this.handlerChange("password")} value={password} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Signin</button>
        </>
    }



    render() {
        const { email, password, error, redirectToRender, loading } = this.state
        if (redirectToRender) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    Signin
            </h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? <div className="text-center jumbotron">
                    <h2>Loading...</h2>
                </div> : ""}

                {this.signinForm(email, password)}
            </div >
        )
    }
}

export default Signin
