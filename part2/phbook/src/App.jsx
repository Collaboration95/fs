import { useState } from 'react'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas' }
  // ]) 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addNewPerson = (event)=>{
    event.preventDefault();
    const isExist = persons.filter(person=>person.name===newName);
    if(isExist.length>0){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {name:newName,number:newNumber,id:persons.length+1};
    setPersons(persons.
      concat(newPerson))
    setNewName('')
    setNumber('')
    console.log(persons)
  }

  const addNewFilter = (event)=>{
    event.preventDefault();
    const filteredPersons = persons.filter(person=>person.name===newFilter);
    console.log(filteredPersons); 
    setFilter('');
  }

  const handleChange = (event)=>{
    setNewName(event.target.value);
  }
  const handleNumber = (event)=>{
    setNumber(event.target.value);
  }
  const handleFilter = (event)=>{
    setFilter(event.target.value);
  }

    const personsToShow = newFilter ?
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) :persons


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number : <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <form onSubmit={addNewFilter}>
      <div>
          filter with: <input value={newFilter} onChange={handleFilter}/>
        </div>
        <button type="submit">add</button>
        </form>
      <ul>
        {personsToShow.map((person,i)=>(
          <li key={i}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App