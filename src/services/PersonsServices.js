import axios from 'axios'
const baseUrl = 'https://phbook-backend.herokuapp.com/api/persons'

// retrieves and returns all data from server 
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// posts newObject(param) to the server
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// removes object with 'id'(param) from the server
const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

// replaces the object with 'id'(param)
// with the `replaceObject'(param)
const updateNumber = (id, replaceObject) => {
    const request = axios.put(`${baseUrl}/${id}`, replaceObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, updateNumber }