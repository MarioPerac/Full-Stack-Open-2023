import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Weather = ({ country }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {

    const cityInfo = country.capitalInfo
    countriesService.getCityWeather(cityInfo).then((data) => {
      const temp = data.main.temp
      const windSpeed = data.wind.speed
      const icon = data.weather[0].icon
      const imageSrc = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
      setWeather({ temp, windSpeed, imageSrc })
    }
    )

  }, [country])


  if (weather !== null) {
    return (
      <div>
        <p>temperature {(weather.temp - 273.15).toFixed(2)} Celcius</p>
        <img src={weather.imageSrc} />
        <p>wind {weather.windSpeed} m/s</p>
      </div>
    )
  }
  else
    return null

}
const Country = ({ country }) => {

  let id = 0
  if (country !== null) {
    let languages = []
    for (const key in country.languages) {
      const language = country.languages[key]
      languages.push(language)
    }


    return (
      <div><div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
        <h3>languages</h3>
        <ul>{
          languages.map(language => <li key={id++}><p>{language}</p></li>)
        }
        </ul>

        <img src={country.flags.png} alt={country.flags.alt} />
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>
            <Weather country={country} />
          </div>
        </div>

      </div>
    )
  } else
    return null
}



const Result = ({ searchedCountries, setSearchedCountries }) => {


  const onShow = (country) => {
    setSearchedCountries([{ ...country }])
  }
  const length = searchedCountries.length

  if (length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (length === 1) {
    return (
      <div>
        <Country country={searchedCountries[0]} />
      </div>
    )
  }
  else if (length === 0) {
    return (<div >No result for your search</div>)
  }
  else {
    return (
      <div>
        <ul>
          {searchedCountries.map(country =>
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => {
                onShow(country)
              }}>show</button>
            </li>)}
        </ul>
      </div>
    )
  }
}


function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [searchedCountries, setSearchedCountries] = useState([])

  const searchCountry = (event) => {
    event.preventDefault()
    if (countries.length !== 0) {
      const filteredCoun = countries.filter(countryName => (countryName.name.common.toLowerCase()).includes(value.toLowerCase()))
      setSearchedCountries(filteredCoun)
    }
  }


  const handleCountryChanged = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (!countries) {
      countriesService.getAll().then(array => {
        let countriesArray = []
        array.map(c => {
          countriesArray.push(c)
        })
        setCountries(countriesArray)
      })
    }
  }, [])


  return (
    <div>
      <form onSubmit={searchCountry}>
        find countries: <input value={value} onChange={handleCountryChanged}></input>
      </form>
      <Result searchedCountries={searchedCountries} setSearchedCountries={setSearchedCountries} />
    </div>
  )
}

export default App
