import React, { Component } from 'react'
import { read, update, updateUser } from "./apiUser"
import { isAuthenticated } from "../auth"
import { Redirect } from 'react-router-dom'
import DefaultProfile from "../images/avatar.jpg"

export class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            error: "",
            redirectToProfile: false,
            filesize: 0,
            loading: false,
            about: ""
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token).then(data => {
            console.log(data)
            if (data.error) {
                this.setState({
                    redirectToProfile: true
                })
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: "",
                    about: data.about
                })
            }
        })

    }

    componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    isValid = () => {
        const { name, email, password, filesize } = this.state
        if (filesize > 100000) {
            this.setState({ error: "FileSize Should br less then 100 kb" })
            return false
        }
        if (name.length === 0) {
            this.setState({ error: "Name Is Required", loading: false })
            return false
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            this.setState({ error: "Email Is Invalid", loading: false })
            return false
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({ error: "Password must be 6 character length", loading: false })
            return false
        }
        return true
    }


    handlerChange = (name) => (e) => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        const filesize = name === 'photo' ? e.target.files[0].size : 0
        this.userData.set(name, value)
        this.setState({
            [name]: value,
            filesize,
            error: ""
        })
    }

    clickSubmit = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        if (this.isValid()) {
            // const { name, email, password } = this.state
            // const user = {
            //     name,
            //     email,
            //     password: password || undefined
            // }
            // console.log(user)
            const userId = this.props.match.params.userId
            const token = isAuthenticated().token
            // console.log(userId, token, user)
            update(userId, token, this.userData).then(data => {
                console.log(data)
                if (data.error) {
                    this.setState({
                        error: data.error,
                        loading: false
                    })
                } else {
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        })
                    })
                }
            })
        }
    }



    signupForm(name, email, password, about) {

        return <>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input type="file" className="form-control" onChange={this.handlerChange("photo")} accept="image/*" />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" placeholder="name" onChange={this.handlerChange("name")} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" className="form-control" placeholder="email" onChange={this.handlerChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea type="text" className="form-control" placeholder="About" onChange={this.handlerChange("about")} value={about} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="text" className="form-control" placeholder="password" onChange={this.handlerChange("password")} value={password} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
        </>
    }

    render() {
        const { id, name, email, password, error, redirectToProfile, loading, about } = this.state
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = id ? `http://localhost:8080/api/user/photo/${id}?${new Date().getTime()}`
            : DefaultProfile


        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className="text-center jumbotron">
                    <h2>Loading...</h2>
                </div> : ""}

                <img style={{ height: "200px", width: "auto" }} className="img-thumbnail" src={photoUrl} alt={name} />
                {this.signupForm(name, email, password, about)}


            </div>
        )
    }
}

export default EditProfile
