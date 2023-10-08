const Course = (props) => {
    return (
        <div>
          <h1>Web development curriculum</h1>
          {props.course.map(course => (
          <div key={course.id}>  
            <Header course = {course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        ))}
        </div>
        )
  }
  
  const Header = (props) => {
    return <h2>{props.course['name']}</h2>
  }
  
  const Total = (props) => {
    const initialValue = 0
    const total = props.course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)
    return <b>total of {total} exercises</b>
  }
  
  const Part = (props) => {
    return (
      <div>
        {props.course.parts.map(part =><p key={part.id}> {part.name} {part.exercises}</p>)}
      </div>
    )
  }
  
  const Content = (props) => {
    return (
        <Part course={props.course} />
    )
  }

  export default Course