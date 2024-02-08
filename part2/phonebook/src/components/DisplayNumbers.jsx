const DisplayNumbers = ({persons, filter, onClick}) => {
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
          <Number key={person.id} person={person} onClick={onClick}/>
      )}
    </ul>
  )
}

const Number = ({person, onClick}) => {
  return(
    <li>{person.name} {person.number} <button onClick={() => onClick(person.name, person.id)}>delete</button></li>
  )
}

export default DisplayNumbers