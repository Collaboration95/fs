import { useState } from 'react'
import React, { useEffect } from 'react'
import Filter from './components/Filter'
import PhoneBook from './components/personform'
import Persons from './components/persons'
import personService from './services/persons'
const App = () => {

  const [persons, setPersons] = useState([])

  const laodperson=()=>{
    personService.getAll()
    .then(response=>{
      setPersons(response.data)
      console.log("Data fetched from json-server")
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
    personService.create(newPerson)
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