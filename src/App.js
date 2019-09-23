import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import personsService from './services/PersonsServices'
import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('')


  // calls getAll method once on render
  useEffect(() => {
    personsService
        .getAll()
        .then(allPersons => {
          setPersons(allPersons)
        })
  }, [])

  // extracts objects' names for rendering 
  let names = persons.map(person => person.name)

  // dinamically creates each list element containig persons' details
  const getList = () => {
    return detailsToShow.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => deleteEntry(person)}>Delete</button></p>)
  }

  // changes specific states when values are changed inside input fields
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  

  // input: event(submit) prevented with preventDefault
  // creates new object containing the submited name and number
  const addDetails = (event) => {
    event.preventDefault()
    const newObj = {
      name: newName,
      number: newNumber.toString()
    }
    // if name already exists asks user for confirmation
    // and calls updateNumber[from personsService] method to change user's number
    if(names.includes(newName)) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const _id = persons.filter(person => person.name === newName)[0].id
        personsService
            .updateNumber(_id, newObj)
            .then(editedPerson => {
              setPersons(persons.filter(person => person.id !== editedPerson.id).concat(editedPerson))
              setSuccessMessage(`Phone number for ${editedPerson.name} has been updated!`)
              setTimeout(() => {
                setSuccessMessage('')
              },5000)
            })
            .catch(error => {
              console.log(error)
              setErrorMessage(`Operation failed, check the console to see a complete log of the error.`)
              setTimeout(() => {
                setErrorMessage('')
              },5000)
            })
      }
    // if not, calls create method[from personsService] and updates the state
    } else {
      personsService
          .create(newObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setSuccessMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setSuccessMessage('')
            },5000)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(`Operation failed, check the console to see a complete log of the error.`)
            setTimeout(() => {
              setErrorMessage('')
            },5000)
          })
    }
    setNewName('')
    setNewNumber('')
  }


  // input: entry - an object representing one of the persons in the list
  // removes the entry after user confirmation
  // by calling the remove method from personsService
  // and resets the state to the remaining persons
  const deleteEntry = (entry) => {
    if(window.confirm(`Delete ${entry.name}?`)) {
      personsService
      .remove(entry.id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== entry.id))
        setSuccessMessage(`Removed ${entry.name}`)
        setTimeout(() => {
          setSuccessMessage('')
        },5000)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`Information of ${entry.name} has already been removed from server.`)
        setTimeout(() => {
          setErrorMessage('')
        },5000)
      })
    }
  }

// sets detailsToShow to whole persons array if filter is empty
// or to objects that have names coresponding to the filter
  const detailsToShow = filter === '' 
      ? persons
      : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h2>add new person</h2>
      <PersonForm addDetails={addDetails} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons getList={getList} />
    </div>
  )
}

export default App