import React from 'react'

const Persons = ({ getList }) => {
    return (
      <div>
        {getList()}
      </div>
    )
  }

export default Persons