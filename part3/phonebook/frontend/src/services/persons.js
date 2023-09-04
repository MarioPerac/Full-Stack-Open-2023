import axios from "axios";

const baseURL = '/api/persons'


const getAll = () => {
    return axios
        .get(baseURL)
        .then(response => {
            console.log('promise fulfilled')
            return response.data
        })
}

const create = newPerson => {

    return axios.post(baseURL, newPerson).then(response => response.data)
}

const update = (id, newPerson) => {
    const idURL = baseURL + '/' + id
    return axios.put(idURL, newPerson).then(response => response.data)
}

const deleteById = (id) => {
    const idURL = baseURL + '/' + id
    console.log(idURL)
    return axios.delete(idURL)
}

export default {
    getAll,
    create,
    deleteById,
    update
}