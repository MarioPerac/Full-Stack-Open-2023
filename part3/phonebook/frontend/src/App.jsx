import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ filterPersons, searchName, handleSearchNameChanged }) => {
  return (
    <div>
      <form onSubmit={filterPersons}>
        <div>
          filter show with <input value={searchName} onChange={handleSearchNameChanged} />
        </div>
      </form>
    </div>
  )
}
const PersonForm = ({ addPerson, newName, handleNameChanged, newNumber, handleNumberChanged }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChanged} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
const Person = ({ person, onDelete }) => {

  return (
    <div>
      <p >{person.name} {person.number}  <button onClick={() => onDelete(person)}>delete</button> </p>
    </div>
  )
}
const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(p => <Person key={p.id} person={p} onDelete={onDelete} />)}
    </div>
  )
}

const Notification = ({ message, notificationColor }) => {

  const messageStyle =
  {
    color: notificationColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10

  }
  if (message === null) {
    return null
  }
  else {
    return (<div style={messageStyle}>
      {message}
    </div>)
  }
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChanged = (event) => {

    setNewNumber(event.target.value)
  }

  const handleSearchNameChanged = (event) => {
    setSearchName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!isAddedPerson()) {

      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage('Added ' + newName)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)

        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data)
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        })
    }
    else {

      const person = persons.find(p => p.name === newName)
      console.log("osoba: ", person)
      let copyPerson = { ...person }
      console.log(copyPerson)
      if (person.number !== newNumber && window.confirm(newName + ' is already added to phonebook, replace the old number with a new one ?')) {
        copyPerson.number = newNumber
        personService
          .update(person.id, copyPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setSuccessMessage('A number is changed')
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          }
          )
          .catch(error => {
            setErrorMessage(error.response.data)
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
          })


      }
      else {
        setErrorMessage(newName + ' is already added to phonebook')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)

      }
    }
  }

  const isAddedPerson = () => {
    const result = persons.some(person => person.name === newName)

    return result
  }

  const filterPersons = (event) => {
    event.preventDefault()
    if (searchName === '')
      setShowAll(true)
    else
      setShowAll(false)
  }
  const filterPersonsByNames = () => {
    return persons.filter(p => (p.name.toLowerCase()).includes(searchName.toLowerCase()))
  }

  const personsToShow = showAll ? persons : filterPersonsByNames()

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = (person) => {
    if (window.confirm('Delete ' + person.name + ' ?')) {
      personService.deleteById(person.id).then(response => {
        setPersons(persons.filter(p => p !== person))

        setSuccessMessage('Person: ' + person.name + ' deleted')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }).catch(error => {
        setErrorMessage('Information of ' + person.name + 'has already been removed from server')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} notificationColor={'green'} />
      <Notification message={errorMessage} notificationColor={'red'} />
      <Filter filterPersons={filterPersons} searchName={searchName} handleSearchNameChanged={handleSearchNameChanged} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChanged={handleNameChanged} newNumber={newNumber} handleNumberChanged={handleNumberChanged} />
      <h3>Numbers</h3>
      <div>
        <Persons persons={personsToShow} onDelete={deletePerson} />
      </div>
    </div>
  )
}
export default App