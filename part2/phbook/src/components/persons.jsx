const Persons = ({personToShow})=>{
    return(
        <>
        <h2>Numbers</h2>
        <ul>
            {personToShow.map((person,i)=>(
            <li key={i}>{person.name} {person.number}</li>
            ))}
        </ul>
        </>
    )
  }

export default Persons;