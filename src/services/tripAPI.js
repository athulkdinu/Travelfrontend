import commanAPI from "./commanAPI"
import BASEURL from "./serverURL"

// 1. Add trip
export const addTripAPI = async (reqBody) => {
    return await commanAPI("POST", `${BASEURL}/trips`, reqBody)
}

// 2. Get trip by ID
export const getTripByIdAPI = async (id) => {
    return await commanAPI("GET", `${BASEURL}/trips/${id}`, {})
}

// 3. Update trip
export const updateTripAPI = async (id, reqBody) => {
    return await commanAPI("PUT", `${BASEURL}/trips/${id}`, reqBody)
}

// 4. Delete trip
export const deleteTripAPI = async (id) => {
    return await commanAPI("DELETE", `${BASEURL}/trips/${id}`, {})
}

// 5. Get all trips
export const getAllTripsAPI = async () => {
    return await commanAPI("GET", `${BASEURL}/trips`, {})
}

// 6. Get trips by user ID
export const getTripsByUserIdAPI = async (userId) => {
    return await commanAPI("GET", `${BASEURL}/trips?userId=${userId}`, {})
}

// 7. Get trips by vehicle type
export const getTripsByVehicleTypeAPI = async (vehicleType) => {
    return await commanAPI("GET", `${BASEURL}/trips?vehicleType=${vehicleType}`, {})
}

