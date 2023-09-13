import { useState } from 'react'
import countryService from './services/country'
import Filter from './components/Filter'
import Countries from './components/Countries'
import { useEffect } from 'react'

function App() {
  const [newFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilter = (event)=>{
    setFilter(event.target.value);
    countryService.getLocalAll().then(response => {
      const data = response.data[0].filter(country => ['common', 'official'].some(key => country.name[key].toLowerCase().includes(event.target.value.toLowerCase())));
      setCountries(data);
    }
    )  
  }

  const handleShow = (event)=>{

    countryService.getLocalAll().then(response => {
      const data = response.data[0].filter(country => ['common'].some(key => country.name[key].toLowerCase()==event.target.value.toLowerCase()));
      setCountries(data);
    }
    )  
  }

  useEffect(()=>{
    countryService.getLocalAll().then(response => {
      if(response.data.length==0){
        countryService.addLocalCountry().then(response => {
          console.log(response.status);
        }
        )
      }
    }
    )
  }, [])

  return (
    <>
    <Filter newFilter={newFilter} handleFilter={handleFilter}/>
    <Countries countries={countries} handleShow={handleShow} />

    </>
  )
}

export default App
