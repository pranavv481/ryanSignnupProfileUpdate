import React, { Component } from 'react'
import { isAuthenticated } from "../auth"
import { remove } from './apiUser';
import { signout } from "../auth";
import { Redirect } from 'react-router-dom';
export class DeleteUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    deleteAccount = () => {
        console.log("deleteAccount")
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token).then(data => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
            } else {
                signout(() => {
                    console.log("user is deleted")
                })
                this.setState({
                    redirect: true
                })
            }
        })
    }
    confirmDelete = () => {
        let answer = window.confirm("Are You Sure Want to Delete??")
        if (answer) {
            this.deleteAccount()
        }
    }
    render() {
        const { redirect } = this.state
        if (redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="d-inline-block">
                <button onClick={this.confirmDelete} className="btn btn-danger btn-raised">
                    Delete Profile
                </button>
            </div>
        )
    }
}

export default DeleteUser
