import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import { showNotification as Show} from './helpers/Helper';
import PopUp from './components/PopUp';
import Notification from './components/Notification';



const words = ['application', 'programming', 'interface','wizard','developer'];
let selectedWord = words[Math.floor(Math.random()* words.length)];

let playable = true;

const correctLetters =[];
const wrongLetters = [];

function App() {
const [playable, setPlayable] = useState(true);
const [correctLetters, setCorrectLetters] = useState([]);
const [wrongLetters, setWrongLetters] = useState([]);
const [showNotification, setShowNotification]= useState(false);



useEffect(() => {
const handleKeydown = e =>{
  const [key, keyCode] = e;

  if(playable){
    if(playable && keyCode >= 65 && keyCode <=90){
      const letter = key.toLowerCase();

      if(selectedWord.includes(letter)){
        if(! correctLetters.includes(letter)){
          setCorrectLetters(currentLetters =>[...currentLetters,letter]);

        }else{
          Show(setShowNotification);
        }
      }else{
        if(! wrongLetters.includes(letter)){
          setWrongLetters(wrongLetters =>[...wrongLetters,letter]);
        }else{
          Show(setShowNotification);
        }
      }
    }
  }
  window.addEventListener('keydown', handleKeydown);
  return()=>window.removeEventListener('keydown', handleKeydown);

}

},[correctLetters,wrongLetters,playable])


  return (
    <>
<Header />
<div className='game-container'>
<Figure wrongLetters={wrongLetters}/>
<WrongLetters wrongLetters={wrongLetters}/>
<Word  selectedWord={selectedWord} correctLetters={correctLetters}/>
</div>
<PopUp/>
<Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
