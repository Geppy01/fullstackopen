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

export default DisplayNumbers