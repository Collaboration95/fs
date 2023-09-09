import { useState } from 'react'
import React, { useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PhoneBook from './components/personform'
import Persons from './components/persons'
const App = () => {

  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])
  const [persons, setPersons] = useState([])

  const laodperson=()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
      console.log("Data fetched from db.json")
    })
  }
  useEffect(laodperson,[])
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
    axios.
      post('http://localhost:3001/persons',newPerson)
      .then(response=>{
        console.log(response.data)
      })
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

    const personToShow = newFilter ?
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) :persons

  return (
    <>
      <PhoneBook addNewPerson={addNewPerson} newName={newName} handleChange={handleChange} newNumber={newNumber} handleNumber={handleNumber} />
      <Filter addNewFilter={addNewFilter} newFilter={newFilter} handleFilter={handleFilter} />
      <Persons personToShow={personToShow} />
    </>
  )
}

export default App