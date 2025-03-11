import { useState } from 'react';
import callOfDutyImg from '../assets/cod.jpg';
import csValorantImg from '../assets/valorant.jpg';
import baldurImg from '../assets/baldursgate.jpg';
import minecraftImg from '../assets/minecraft.jpg';
import fnafImg from '../assets/fnat.jpg';
import '../App.css';


/*
&&  - Logisk OG: Begge betingelser skal være sande for at give true.
=== - Strict sammenligning: Sammenligner både værdi og datatype.
=>  - Arrow function: Kort måde at skrive funktioner på.
return - Returnerer en værdi fra en funktion.
*/
export default function GameRecommendation() {
  // useState hook til at gemme brugerens svar
  const [answers, setAnswers] = useState({ action: null, shooter: null, rpg: null, survival: null, horror: null });

  // Funktion til at nulstille spil-anbefalingen
  const resetGame = () => {
    setAnswers({ action: null, shooter: null, rpg: null, survival: null, horror: null });
  };

  // Funktion til at generere et spørgsmål med Ja/Nej-knapper
  const askQuestion = (key, question) => (
    <div key={key} className="question">
      <p>{question}</p>
      <button className="btn yes" onClick={() => setAnswers({ ...answers, [key]: true })}>Ja</button>
      <button className="btn no" onClick={() => setAnswers({ ...answers, [key]: false })}>Nej</button>
    </div>
  );

  // Funktion til at bestemme spil-anbefalingen baseret på brugerens svar
  const getRecommendation = () => {
    if (answers.action === true) {
      if (answers.shooter === true) return { text: 'Vi kan anbefale Call of Duty', image: callOfDutyImg };
      if (answers.shooter === false && answers.rpg === true) return { text: 'Vi kan anbefale Baldur’s Gate', image: baldurImg };
      if (answers.shooter === false && answers.rpg === false && answers.survival === true) return { text: 'Vi kan anbefale Minecraft', image: minecraftImg };
      if (answers.shooter === false && answers.rpg === false && answers.survival === false && answers.horror === true) return { text: 'Vi kan anbefale Five Nights at Freddy’s', image: fnafImg };
    }

    if (answers.action === false) {
      if (answers.shooter === true) return { text: 'Vi kan anbefale CS, Valorant', image: csValorantImg };
      if (answers.shooter === false && answers.rpg === true) return { text: 'Vi kan anbefale Baldur’s Gate', image: baldurImg };
      if (answers.shooter === false && answers.rpg === false && answers.survival === true) return { text: 'Vi kan anbefale Minecraft', image: minecraftImg };
      if (answers.shooter === false && answers.rpg === false && answers.survival === false && answers.horror === true) return { text: 'Vi kan anbefale Five Nights at Freddy’s', image: fnafImg };
    }
    return null;
  };

  const recommendation = getRecommendation();

  return (
    <div className="container">
      <h1>Spil Anbefaling</h1>
      {/* Viser kun et spørgsmål ad gangen */}
      {answers.action === null && askQuestion('action', 'Skal det være Action?')}
      {answers.action !== null && answers.shooter === null && askQuestion('shooter', 'Skal det være Shooter?')}
      {answers.shooter === false && answers.rpg === null && askQuestion('rpg', 'Skal det være RPG?')}
      {answers.shooter === false && answers.rpg === false && answers.survival === null && askQuestion('survival', 'Skal det være Survival?')}
      {answers.shooter === false && answers.rpg === false && answers.survival === false && answers.horror === null && askQuestion('horror', 'Skal det være Horror?')}
      
      {/* Viser resultatet */}
      {recommendation && (
        <div className="result">
          {recommendation.image && <img src={recommendation.image} alt="Game Recommendation" className="game-image" />}
          <p>{recommendation.text}</p>
          <button className="btn reset" onClick={resetGame}>Start forfra</button>
        </div>
      )}
    </div>
  );
}