import "./App.css";
import { words } from "./words";
import { useEffect, useState } from "react";
import { fetchImageByKeyword } from "./api";

function App() {
  
  const [a, setA] = useState(0);
  var [score, setscore] = useState(0);
  const [showModal, setShowModal] = useState(false); 
  const [randomWord, setRandomWord] = useState("");
  const [randomImage, setRandomImage] = useState("");
  const [randomWord2, setRandomWord2] = useState("");
  const [randomImage2, setRandomImage2] = useState("");
 
  const [count1, setCount1] = useState("");
  const [count2, setCount2] = useState("");
  useEffect(() => {
    const wordsArray = Object.keys(words);
    const countArray= Object.values(words);
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    const randomWord = wordsArray[randomIndex];
    setRandomWord(randomWord);
    const count1= countArray[randomIndex];
    setCount1(count1);

    
    fetchImageByKeyword(randomWord)
      .then((imageUrl) => setRandomImage(imageUrl))
      .catch((error) => console.error("Error fetching image:", error));
  }, []); 

  useEffect(() => {
    const wordsArray = Object.keys(words);
    
    const randomIndex2 = Math.floor(Math.random() * wordsArray.length);
    const randomWord2 = wordsArray[randomIndex2];
    setRandomWord2(randomWord2);
    setA(randomIndex2)
    
  

   
    fetchImageByKeyword(randomWord2)
      .then((imageUrl) => setRandomImage2(imageUrl))
      .catch((error) => console.error("Error fetching image:", error));
  }, []); 


  const showModalMessage = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };



 const changeData1= () =>{
  const countArray= Object.values(words);
  const count2= countArray[a];
  setCount2(count2);
  if(count2>count1){
  score++;
  setscore(score);}
  else {
    showModalMessage(); 
  }
};
 const changeData2= () =>{
  const countArray= Object.values(words);
  const count2= countArray[a];
  setCount2(count2);
  if(count2<count1){
  score++;
  setscore(score);}
  else {
    showModalMessage(); 
  }
};





  return (
    <div className="App">
      <header className="App-header">
        <h1>GUESS HIGHER OR LOWER</h1>
      </header>
      {randomWord && (
              
        <div
          className="first"
          style={{
            backgroundImage: `url(${randomImage})`,
          }}
        >
           <div className="overlay">
           <h1>  <span id="t1">"{randomWord}" </span>
              <span id="t2">has</span>
              <span id="t3">{count1}</span>
              <span id="t4">searches</span>
              </h1>
          </div>
        </div>
      
      )}
     
      <div
        className="second"
        style={{
          backgroundImage: `url(${randomImage2})`,
        }}
      > <div className="overlay">
        <h1>  <span id="t1">"{randomWord2}" </span>
              <span id="t2">has</span>
              <span id="t3">{count2}</span>
              <span id="t4">searches</span> 
        <span><button id="b1" onClick={changeData1}>Higher</button></span> 
        <span><button id="b1" onClick={changeData2}>Lower</button></span>
        <span>Your Score</span>
        <span>{score}</span>
        </h1>
</div>
      </div>


       
       {showModal && (
        <div className="modal" >
          <div className="modal-content">
            <h2>Sorry, your guess was incorrect!</h2>
            <button onClick={() => closeModal}  >OK</button>
          </div>
        </div>
      )}
      </div>
   
  );
}

export default App;
