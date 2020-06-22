export const read = (userId, token) => {
    return fetch(`http://localhost:8080/api/user/${userId}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: "GET",

        })
        .then(response => response.json())
        .catch(err => {
            console.log(err)
        })
}

export const list = (userId, token) => {
    return fetch(`http://localhost:8080/api/users`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: "GET",

        })
        .then(response => response.json())
        .catch(err => {
            console.log(err)
        })
}

export const remove = (userId, token) => {
    return fetch(`http://localhost:8080/api/user/${userId}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: "DELETE",

        })
        .then(response => response.json())
        .catch(err => {
            console.log(err)
        })
}

export const update = (userId, token, user) => {
    console.log("user data update", user)
    return fetch(`http://localhost:8080/api/user/${userId}`,
        {
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: "PUT",
            body: user

        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateUser = (user, next) => {
    if (localStorage.getItem("jwt")) {
        let auth = JSON.parse(localStorage.getItem('jwt'))
        auth.user = user
        localStorage.setItem("jwt", JSON.stringify(auth))
        next()
    }
} 