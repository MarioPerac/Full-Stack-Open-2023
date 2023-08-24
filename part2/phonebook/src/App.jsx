import { useState } from 'react'


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
const Person = ({ person }) => {
  return (
    <div>
      <p >{person.name} {person.number}</p>
    </div>
  )
}
const Persons = ({ persons }) => {
  let id = 0
  return (
    <div>
      {persons.map(p => <Person key={id++} person={p} />)}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '222-222-222' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)

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
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(newName + ' is already added to phonebook')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPersons={filterPersons} searchName={searchName} handleSearchNameChanged={handleSearchNameChanged} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChanged={handleNameChanged} newNumber={newNumber} handleNumberChanged={handleNumberChanged} />
      <h3>Numbers</h3>
      <div>
        <Persons persons={personsToShow} />
      </div>
    </div>
  )
}
export default App