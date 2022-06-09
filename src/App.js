import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react";


function App() {
  
  const [word, setWord] = useState("")
  const [number, setNumber] = useState(10)
  const [keep, setKeep] = useState(true)
  const [anagrams, setAnagrams] = useState([])
  const [randomness, setRandomness] = useState(10)
  const [consonantsOnly, setConsonantsOnly] = useState(false)

  useEffect(()=>{
    const isAlterable = (letters, index, randomIndex) => {
      const punctMarks = [",", ".", "(", ")", ":", ";"]
      const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "ñ", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z" ]
      const vowels = ["a", "e", "i", "o", "u"]
      let keep
      if(consonantsOnly) {
        keep = vowels
      } else {
        keep = consonants
      }
      
      if(punctMarks.includes(letters[index]) || punctMarks.includes(letters[randomIndex])){
        return false
      } else {
        if(consonantsOnly){
          if(keep.includes(letters[index]) || keep.includes(letters[randomIndex])){
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }
    }
    const randomAnagram = (word) => {
      if(word.length){
        const isCapitalized = word.charAt(0) === word.charAt(0).toUpperCase()
        const letters = word.split("").map(letter=>letter.toLowerCase())
        const wordLength = letters.length
        letters.forEach((letter, i) => {
          const randomNumber = Math.floor(Math.random()*101)
          const randomIndex = Math.floor(Math.random()*wordLength)
          if(randomNumber<randomness && isAlterable(letters, i, randomIndex)){
            const pivot = letters[i]
            letters[i] = letters[randomIndex]
            letters[randomIndex] = pivot
          }
        })
        if(isCapitalized){
          letters[0] = letters[0].toUpperCase()
        }
        return letters.join("")
      } else {
        return ("")
      }
    }

    const emptyAnagramsArray = Array.from({length: number})

    if(keep){
      const words = emptyAnagramsArray.map(anagram=>{
        const singleWords = word.split(" ").map(singleWord=>randomAnagram(singleWord))
        return singleWords.join(" ")
      })
      setAnagrams(words)
    } else {
      const words = emptyAnagramsArray.map(anagram=>{
        return randomAnagram(word)
      })
      setAnagrams(words)
    }
  }, [keep, word, number, randomness, consonantsOnly])
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="input-group my-2">
            <label htmlFor="text" className="input-group-text">Palabros</label>
            <input type="text" onChange={(evt)=>setWord(evt.currentTarget.value)} className="form-control" value={word}/>
          </div>
          
          <div className="input-group my-2">
            <label className="input-group-text" htmlFor="number">Cuántos quieres</label>
            <input type="number" className="form-control" value={number} onChange={(evt)=>setNumber(evt.currentTarget.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="randomness" className="form-label">Randomness: {randomness}%</label>
            <input type="range" min="0" max="100" value={randomness} onChange={(evt)=>setRandomness(evt.currentTarget.value)}className="form-range" />
          </div>
          <div className="form-check">
            <input type="checkbox" checked={keep} className="form-check-input" onChange={(evt)=>setKeep(evt.target.checked)} />
            <label htmlFor="" className="form-check-label" >Mantener palabras separadas</label>
          </div>
          <div className="form-check">
            <input type="checkbox" checked={consonantsOnly} className="form-check-input" onChange={(evt)=>setConsonantsOnly(evt.target.checked)} />
            <label htmlFor="" className="form-check-label" >Intercambiar consonantes entre sí</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {
              anagrams.map((anagram, i)=>{
                if(anagrams.length && anagram.length){
                  return <li key={i} className="list-group-item">{anagram}</li>
                } else {
                  return <></>
                }
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
