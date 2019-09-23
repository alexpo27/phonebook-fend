import React from 'react'

const PersonForm = ({ addDetails, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <div>
        <form onSubmit={addDetails}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default PersonForm