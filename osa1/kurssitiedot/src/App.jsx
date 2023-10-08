const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.kurssi.name} {props.tehtavat.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part kurssi={props.parts[0]} tehtavat={props.parts[0]}/>
      <Part kurssi={props.parts[1]} tehtavat={props.parts[1]}/>
      <Part kurssi={props.parts[2]} tehtavat={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} /> 
    </div>
  )
} 

export default App
