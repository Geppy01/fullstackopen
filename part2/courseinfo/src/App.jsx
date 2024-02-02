const Header = ({name}) => {
  return(
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  return(
    <>
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </ul>
    </>
  )
}

const Part = ({part}) => {
  return(
    <li>{part.name} {part.exercises}</li>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  //Gets each "exercises" value from course.parts and set it in the same index of getExercises
  const getExercises = course.parts.map(({exercises}) => exercises)

  /*Array.reduce() function:
    On the first call starts from accumulator and currentValue:
      - IF initialValue is specified (accumulator + currentValue, initialValue):
        - accumulator = initialValue and currentValue = getExercises[0]
      - ELSE accumulator = getExercises[0] and currentValue = getExercises[1] */
  const totalExercises = getExercises.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue
  )

  return(
    <div>
      <Course course={course} />
      <p><b>total of {totalExercises} exercises</b></p>
    </div>
  )
}

export default App
