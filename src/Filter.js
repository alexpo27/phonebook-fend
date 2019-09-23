import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
    return (
      <div>
        <div>filter with</div><input value={filter} onChange={handleFilterChange} />
      </div>
    )
  }

export default Filter