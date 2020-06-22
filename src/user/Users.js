import React, { Component } from 'react'
import { list } from './apiUser';
import { Link } from 'react-router-dom';
import DefaultProfile from "../images/avatar.jpg"

export class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ users: data })
            }
        })
    }



    render() {
        const { users } = this.state

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                <div className="row">
                    {users.map((user, i) => (
                        <div className="card col-md-4" key={i}>
                            <img style={{ height: "200px", width: "auto" }} className="img-thumbnail" src={`http://localhost:8080/api/user/photo/${user._id}`}
                                onError={i => (i.target.src = `${DefaultProfile}`)}
                                alt={user.name} />
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">{user.email}</p>
                                <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary">View Profile</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Users
