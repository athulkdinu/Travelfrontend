import commanAPI from "./commanAPI"
import BASEURL from "./serverURL"

// 1. Register new user
export const registerUserAPI = async (reqBody) => {
    return await commanAPI("POST", `${BASEURL}/users`, reqBody)
}

// 2. Get all users
export const getAllUsersAPI = async () => {
    return await commanAPI("GET", `${BASEURL}/users`, {})
}

// 3. Get user by ID
export const getUserByIdAPI = async (id) => {
    return await commanAPI("GET", `${BASEURL}/users/${id}`, {})
}

// 4. Update user
export const updateUserAPI = async (id, reqBody) => {
    return await commanAPI("PUT", `${BASEURL}/users/${id}`, reqBody)
}

// 5. Delete user
export const deleteUserAPI = async (id) => {
    return await commanAPI("DELETE", `${BASEURL}/users/${id}`, {})
}

// 6. Get user by email
export const getUserByEmailAPI = async (email) => {
    return await commanAPI("GET", `${BASEURL}/users?email=${email}`, {})
}

// 7. Get user by username
export const getUserByUsernameAPI = async (username) => {
    return await commanAPI("GET", `${BASEURL}/users?username=${username}`, {})
}

