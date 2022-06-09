import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");
  const [number, setNumber] = useState(10);
  const [keep, setKeep] = useState(true);
  const [anagrams, setAnagrams] = useState([]);
  const [randomness, setRandomness] = useState(10);
  const [consonantsOnly, setConsonantsOnly] = useState(false);
  const [vowelsOnly, setVowelsOnly] = useState(false);

  useEffect(() => {
    const isAlterable = (letters, index, randomIndex) => {
      const punctMarks = [",", ".", "(", ")", ":", ";"];
      const consonants = [
        "b",
        "c",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "ñ",
        "p",
        "q",
        "r",
        "s",
        "t",
        "v",
        "w",
        "x",
        "y",
        "z",
        " ",
      ];
      const vowels = ["a", "e", "i", "o", "u", " "];

      if (
        punctMarks.includes(letters[index]) ||
        punctMarks.includes(letters[randomIndex])
      ) {
        return false;
      } else {
        if (
          consonants.includes(letters[index]) &&
          consonants.includes(letters[randomIndex])
        ) {
          if (consonantsOnly) {
            return true;
          } else {
            return false;
          }
        } else if (
          vowels.includes(letters[index]) &&
          vowels.includes(letters[randomIndex])
        ) {
          if (vowelsOnly) {
            return true;
          } else {
            return false;
          }
        } else {
          if (!vowelsOnly && !consonantsOnly) {
            return true;
          }
        }
      }
    };
    const randomAnagram = (word) => {
      if (word.length) {
        const isCapitalized = word.charAt(0) === word.charAt(0).toUpperCase();
        const letters = word.split("").map((letter) => letter.toLowerCase());
        const wordLength = letters.length;
        letters.forEach((letter, i) => {
          const randomNumber = Math.floor(Math.random() * 101);
          const randomIndex = Math.floor(Math.random() * wordLength);
          if (
            randomNumber < randomness &&
            isAlterable(letters, i, randomIndex)
          ) {
            const pivot = letters[i];
            letters[i] = letters[randomIndex];
            letters[randomIndex] = pivot;
          }
        });
        if (isCapitalized) {
          letters[0] = letters[0].toUpperCase();
        }
        return letters.join("");
      } else {
        return "";
      }
    };

    const emptyAnagramsArray = Array.from({ length: number });

    if (keep) {
      const words = emptyAnagramsArray.map((anagram) => {
        const singleWords = word
          .split(" ")
          .map((singleWord) => randomAnagram(singleWord));
        return singleWords.join(" ");
      });
      setAnagrams(words);
    } else {
      const words = emptyAnagramsArray.map((anagram) => {
        return randomAnagram(word);
      });
      setAnagrams(words);
    }
  }, [keep, word, number, randomness, consonantsOnly, vowelsOnly]);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="input-group my-2">
              <label htmlFor="text" className="input-group-text">
                Palabros
              </label>
              <input
                type="text"
                onChange={(evt) => setWord(evt.currentTarget.value)}
                className="form-control"
                value={word}
              />
            </div>

            <div className="input-group my-2">
              <label className="input-group-text" htmlFor="number">
                Cuántos quieres
              </label>
              <input
                type="number"
                className="form-control"
                value={number}
                onChange={(evt) => setNumber(evt.currentTarget.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="randomness" className="form-label">
                Randomness: {randomness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={randomness}
                onChange={(evt) => setRandomness(evt.currentTarget.value)}
                className="form-range"
              />
            </div>
            <div className="form-group my-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  checked={keep}
                  className="form-check-input"
                  onChange={(evt) => setKeep(evt.target.checked)}
                />
                <label htmlFor="" className="form-check-label">
                  Respetar espacios
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  checked={consonantsOnly}
                  className="form-check-input"
                  onChange={(evt) => setConsonantsOnly(evt.target.checked)}
                />
                <label htmlFor="" className="form-check-label">
                  Intercambiar consonantes entre sí
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  checked={vowelsOnly}
                  className="form-check-input"
                  onChange={(evt) => setVowelsOnly(evt.target.checked)}
                />
                <label htmlFor="" className="form-check-label">
                  Intercambiar vocales entre sí
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-12">
          <ul className="list-group">
            {anagrams.length ? (
              anagrams.map((anagram, i) =>
                anagram.length ? (
                  <li key={i} className="list-group-item">
                    {anagram}
                  </li>
                ) : (
                  <span key={i}></span>
                )
              )
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
      <footer className="footer mt-auto py-3 bg-light text-center">
          <span className="text-muted">wasabi</span>
      </footer>
    </div>
  );
}

export default App;
