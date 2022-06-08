import "bootstrap/dist/css/bootstrap.css"
import { useState, useEffect } from "react";


function App() {
  
  const [word, setWord] = useState("")
  const [number, setNumber] = useState(10)
  const [keep, setKeep] = useState(true)
  const [anagrams, setAnagrams] = useState([])
  useEffect(()=>{
    const emptyAnagramsArray = Array.from({length: number})

    if(keep){
      const words = emptyAnagramsArray.map(anagram=>{
        const singleWords = word.split(/[.,:]?\s/g).map(singleWord=>randomAnagram(singleWord))
        console.log(singleWords)
        return singleWords.join(" ")
      })
      setAnagrams(words)
    } else {
      const words = emptyAnagramsArray.map(anagram=>{
        return randomAnagram(word)
      })
      setAnagrams(words)
    }
  }, [keep, word, number])
  const randomAnagram = (word) => {
    return word.split("").sort(() => Math.random() - 0.5).join("")
  }
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
          <div className="form-check">
            <input type="checkbox" checked={keep} className="form-check-input" onChange={(evt)=>setKeep(evt.target.checked)} />
            <label htmlFor="" className="form-check-label" >Mantener palabras separadas</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {
              anagrams.map((anagram, i)=>{
                if(anagrams.length){
                  return <li className="list-group-item">{anagram}</li>
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
