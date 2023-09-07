const Course =({course})=>{
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
      </>
    )
  }


  
const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
  <>
  {parts.map((part,i)=>{
    return (
      <Part key={i} part={part}/>
    )
  })}
    <h3>total of {parts.reduce((total,start)=>{return total+start.exercises;},0)} exercises</h3>    
  </>
  )
}
export default Course
