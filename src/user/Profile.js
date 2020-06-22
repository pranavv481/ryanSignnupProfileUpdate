import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { read } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg"
import DeleteUser from './DeleteUser';
import { Link } from 'react-router-dom';
export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToSignin: false,
            user: "",
        }
    }



    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token).then(data => {
            // console.log(data)
            if (data.error) {
                this.setState({
                    redirectToSignin: true
                })
            } else {
                this.setState({
                    user: data
                })
            }
        })

    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId
        this.init(userId)
    }


    render() {
        const { user } = this.state

        const photoUrl = user._id ? `http://localhost:8080/api/user/photo/${user._id}?${new Date().getTime()}`
            : DefaultProfile
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img style={{ height: "200px", width: "auto" }} className="img-thumbnail" src={photoUrl}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name} />

                    </div>
                    <div className="col-md-6">
                        <div className="lead">
                            <p>Hello {user.name}</p>
                            <p>Email:{user.email}</p>
                            <p>Joined:{new Date(user.created).toDateString()}</p>
                        </div>
                        {isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block">
                                <Link to={`/user/edit/${user._id}`} className="btn btn-primary btn-raised mr-3  ">
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-5 mb-5">
                        <hr />
                        <p className="lead">{user.about}</p>
                        <hr />
                    </div>
                </div>

            </div>
        )
    }
}

export default Profile
