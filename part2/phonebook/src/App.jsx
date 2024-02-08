import {useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/persons'
import DisplayNumbers from './components/DisplayNumbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('fail: ', error)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const checkIfPersonAlreadyExists = (persons.filter(person => 
      person.name === personObject.name
    ).length > 0) ? true : false

    if(checkIfPersonAlreadyExists)
    {
      setNewName('')
      return(
        alert(`${personObject.name} is already added to phonebook`)
      )
    }

    personService
      .create(personObject)
      .then(returnedPerson=> {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('fail: ', error)
      })
  }

  const handleRemoveClick = (name, id) => {
    if(window.confirm(`Delete ${name} ?`)){
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== response.data.id))
      })
      .catch(error => {
        console.log(error)
        alert(`${name} not found`)
        setPersons(persons.filter(person => person.id !== response.data.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter valueFilter={newFilter} onChangeFilter={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange}
        valueNumber={newNumber} onChangeNumber={handleNumberChange}
      /> 
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} filter={newFilter} onClick={handleRemoveClick}/>
    </div>
  )
}

export default App
