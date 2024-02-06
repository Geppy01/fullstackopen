import { useState } from 'react'

const DisplayNumbers = ({persons, filter}) => {

  /*if filter has not been indicated then
      return all the persons
    else
      return only persons that start with the indicated filter*/
  const personsToShow = filter.length === 0
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().startsWith(
        filter.toLowerCase()
  ))

  return(
    <ul>
      {personsToShow.map(person =>
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
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    console.log(personObject)
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
      <div>
        filter shown with <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
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
      <DisplayNumbers persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App
