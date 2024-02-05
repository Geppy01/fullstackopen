import { useState } from 'react'

const DisplayNumbers = ({persons}) => {
  return(
    <ul>
      {persons.map(person =>
        <Number key={person.name} person={person}/>
      )}
    </ul>
  )
}

const Number = ({person}) => {
  return(
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} 
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons}/>
    </div>
  )
}

export default App
