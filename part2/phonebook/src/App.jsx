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
      if(personObject.number.length===0){
        setNewName('')
        return alert(`${personObject.name} is already added to phonebook`)
      }
      else {
        let findPerson = persons.find(person => 
          person.name === personObject.name
        )
        const newPersonObject = {
          ...findPerson, 
          number: personObject.number
        }

        if(window.confirm(`${newPersonObject.name} is already added to phonebook, replace the old number with a new one?`))
          personService
            .update(findPerson.id, newPersonObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => 
                person.name !== newPersonObject.name
                 ? person 
                 : returnedPerson
            ))})
            .catch(error => {
              console.log('fail: ', error)
    })}}
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('fail: ', error)
    })}
    setNewName('')
    setNewNumber('')  
  }

  const handleRemoveClick = (name, id) => {
    if(window.confirm(`Delete ${name} ?`))
      personService
      .remove(id)
      .then(removedNote => {
        setPersons(persons.filter(person => 
          person.id !== removedNote.id
      ))})
      .catch(error => {
        console.log(error)
        alert(`${name} not found`)
        setPersons(persons.filter(person => 
          person.id !== removedNote.id
  ))})}

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
