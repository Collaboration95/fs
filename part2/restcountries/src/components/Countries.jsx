const Countries = ({ countries,handleShow }) => {

    if(countries.length>10){
        return (
            <>
                <div>
                    Too many matches, specify another filter
                </div>
            </>
        )
    }
    else if(countries.length>1){
        return (
            <>

                    {countries.map(country =><><div><div key={country.flags.png}>{country.name.common}</div><button key={country.name.common} value={country.name.common} onClick={handleShow}>show</button></div></>)}

            </>
        )
    }
    else if(countries.length==1){
        return (
            <>
                <div>
                    <h1>{countries[0].name.common}</h1>
                    <table><tbody>
                        <tr>
                            <td>Capital</td>
                            <td>{countries[0].capital[0]}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>{countries[0].area}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>languages:</h3>
                    <ul>
                        {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
                    </ul>
                    <img src={countries[0].flags.png} alt="flag" width="500" height="100%"></img>
                </div>
            </>
        )
    }
    else{
        return (
            <>
                <div>
                    No matches found
                </div>
            </>
        )
    }
}

export default Countries;