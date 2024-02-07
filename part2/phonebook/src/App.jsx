import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayNumbers from './components/DisplayNumbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      id: persons.length + 1,
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <DisplayNumbers persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App
