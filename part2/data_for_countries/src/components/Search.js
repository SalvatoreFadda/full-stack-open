import React from 'react'

const Search = ({ value, onChange }) => {
  return (
    <div>
      Find countries: <input value={value} onChange={onChange} />
    </div>
  )
}

export default Search