const Filter = ({newFilter,handleFilter})=>{
    return(
        <>
            <div>
               find countries<input value={newFilter} onChange={handleFilter}/>
            </div>
        </>
    )
}

export default Filter;
