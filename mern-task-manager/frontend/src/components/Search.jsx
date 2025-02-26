import React from 'react'

function Search({ search, setSearch }) {
  return (
    <div className="max-w-md mx-auto mt-4">
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search tasks..."
        className="w-full p-2 border rounded"
      />
    </div>
  )
}

export default Search;
