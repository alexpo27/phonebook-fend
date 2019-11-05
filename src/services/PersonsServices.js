import axios from 'axios'
const baseUrl = '/api/persons'

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
// TODO: fix this part. put request not working, error 404
const updateNumber = (id, updatedObj) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedObj)
    return request.then(response => response.data)
}
 
export default { getAll, create, remove, updateNumber }