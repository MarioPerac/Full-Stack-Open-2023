import axios from "axios";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'


const getAll = () => {

    return axios
        .get(baseURL + '/all')
        .then(response => {
            console.log('promise fulfilled')
            return response.data
        })
}

const getCityWeather = (cityInfo) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const lat = cityInfo.latlng[0]
    const lon = cityInfo.latlng[1]
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + api_key
    return axios.get(url).then(response => {
        console.log('promise fulfilled')
        return response.data
    })
}

const getByName = (name) => {
    return axios
        .get(baseURL + '/name/' + name)
        .then(response => {
            console.log('promise fulfilled')
            return response.data.name
        })
}

export default {
    getAll,
    getByName,
    getCityWeather
}