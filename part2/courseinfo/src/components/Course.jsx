const Header = ({name}) => {
    return(
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <TotalExercises parts={parts} />
      </ul>
    )
  }
  
  const Part = ({part}) => {
    return(
      <li>{part.name} {part.exercises}</li>
    )
  }
  
  const TotalExercises = ({parts}) => {
    let exercises = parts.map(part =>
      part.exercises
    )
    let totalExercises = exercises.reduce(
      (accumulator, currentValue) => accumulator+currentValue
    )
  
    return(
      <li><b>total of {totalExercises} exercises</b></li>
    )
  }
  
  const Course = ({course}) => {
    return(
      <ul>
        {course.map(course => 
          <li key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
          </li>)}
      </ul>
    )
  }

export default Course