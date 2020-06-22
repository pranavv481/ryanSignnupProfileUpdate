export const signup = (user) => {
    return fetch("http://localhost:8080/api/signup",
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

export const signin = (user) => {
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

export const authenticate = (jwt, next) => {
    localStorage.setItem("jwt", JSON.stringify(jwt))
    next()
}

export const signout = (next) => {
    localStorage.removeItem('jwt')
    next()
    return fetch("http://localhost:8080/api/signout",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",

        })
        .then(response => {
            console.log(response)
            response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const isAuthenticated = () => {
    localStorage.getItem("jwt")
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}