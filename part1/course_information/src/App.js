const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};


const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {sum(props.tot[0].exercises, props.tot[1].exercises, props.tot[2].exercises)}</p>
    </div>
  )
}

const sum = (p1, p2, p3) => {
  return p1 + p2 + p3
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total tot={course.parts} />
    </div>
  )
}

export default App
