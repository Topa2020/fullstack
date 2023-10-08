import { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = (props) => {
  return (
    <div>
      filter shown with: <input
      value={props.word}
      onChange={props.handleNewWord}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNewName}/>
        </div>
        <div>
          number: <input 
          value={props.newNumber}
          onChange={props.handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


const Persons = (props) => {
  return (
   <div>
     {props.filter.map(person =>
        <Person key={person.id} removePerson={props.removePerson} person={person} />
      )}
    </div>
  )
}

const Person = (props) => {
  const person = props.person
  return (
    <div>
      
      {person.name} {person.number}
      <button onClick={() => props.removePerson(person.id)}>delete</button>
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
      setPersons(persons)
      })
  }, [])
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [word, setWord] = useState('')
  const [notice, setNotice] = useState(null)
  const [errorNotice, setErrorNotice] = useState(null)
  

  
  const removePerson = id => { 
    const varmistus = persons.filter(person => person.id === id)
    if (window.confirm(`Delete ${varmistus[0].name}?`)) {

      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotice(`${varmistus[0].name} was removed`)
        setTimeout(() => {
          setNotice(null)
          }, 5000)
        })
        .catch(error => {
          setErrorNotice(`${varmistus[0].name} wasn't found on server`)
          setTimeout(() => {
            setErrorNotice(null)
          }, 4000)
          
          setPersons(persons.filter(person => person.id !== id))
        })
      
  }}

  const addName = (event) => {
    event.preventDefault()
    const nimet = persons.map(nimi => nimi.name === newName)
    if (nimet.includes(true)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const personId = persons.filter(person => person.name === newName)
          const person = persons.find(p => p.id === personId[0].id)
          const uusiNumero = { ...person, number: newNumber}
          console.log(personId[0].id)
          personService
            .update(personId[0].id, uusiNumero)
              .then(response => {
                setPersons(persons.map(person => person.id !== personId[0].id ? person : response))
                setNewName('')
                setNewNumber('')
                setNotice(`${newName}'s number was changed`)
                setTimeout(() => {
                  setNotice(null)
                }, 5000)          
              })
              .catch(error => {
                setErrorNotice(`${newName} wasn't found on server`)
                setTimeout(() => {
                  setErrorNotice(null)
                }, 4000)
                
                setPersons(persons.filter(person => person.id !== personId[0].id))
              })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }

  
    else {
    const person = {
      name: newName,
      number: newNumber
    }

    personService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotice(`Added ${newName}`)
          setTimeout(() => {
            setNotice(null)
            }, 5000)
      })
  }
}

  const handleNewName = (event) => {  
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {  
    setNewNumber(event.target.value)
  }

  const handleNewWord = (event) => {     
    setWord(event.target.value)
  }

 
  const filter = (word) 
    ? persons.filter(person => person.name.toLowerCase().includes(word.toLowerCase()))
    : persons
  


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notice} />

      <Error message={errorNotice} />

      <Filter word={word} handleNewWord={handleNewWord} />

      <h3>Add a new</h3>

      <PersonForm addName={addName} newName={newName} handleNewName={handleNewName} 
        newNumber={newNumber} handleNewNumber={handleNewNumber} /> 
      
      <h3>Numbers</h3>


     <Persons removePerson={removePerson} filter={filter} />

  </div>
  )
}

export default App

/*
const filter = (word) => {
    const result = persons.filter(person => person.name.toLowerCase().includes(word.toLowerCase()))
    setFiltered(result)
  }


  <form onSubmit={removePerson}>
        <div>
          name: <input 
          value={id}
          onChange={handleRemove}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

*/