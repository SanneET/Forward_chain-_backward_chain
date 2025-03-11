import { useState } from "react";
import "../Energi.css";

// Database af energidrikke med mærke, variant, størrelse, smag og om de er sukkerfri
const knowledgeBase = [
  { brand: "Red Bull", variant: "Classic", size:"250ml", flavor: "Original", sugarFree: false },
  { brand: "Red Bull", variant: "Pink edition", size: "250ml", flavor: "Hindbær", sugarFree: true },
  { brand: "Red Bull", variant: "Red edition", size: "250ml", flavor: "Vandmelon", sugarFree: true },
  { brand: "Monster", variant: "Classic", size: "500ml", flavor: "Original, æble, syrlig, guava", sugarFree: false },
  { brand: "Monster", variant: "Ultra white", size: "500ml", flavor: "Citrus, lime, citron, grapefrugt", sugarFree: true },
  { brand: "Monster", variant: "Mango loco", size: "500ml", flavor: "Mango, tropisk frugtsmag, appelsin, ananas, guava, fersken, passionsfrugt", sugarFree: true },
  { brand: "Booster", variant: "Classic", size: "500ml", flavor: "Original, citrus, bær, sød, syrlig", sugarFree: false },
  { brand: "Booster", variant: "Frosty blue", size: "500ml", flavor: "Citrus, Blåbær", sugarFree: true },
  { brand: "Booster", variant: "Pink dragon", size: "500ml", flavor: "Dragefrugt, kiwi, pære", sugarFree: true },
];

// Hovedkomponent: EnergyDrinkMatcher
export default function EnergyDrinkMatcher() {
  // State til brugerinput
  const [input, setInput] = useState("");

  // State til at gemme søgeresultatet
  const [result, setResult] = useState(null);

  // Funktion til at finde den bedste matchende energidrik
  const findMatchingDrink = (userInput) => {
    // Gør input til små bogstaver og splittes til en liste af ord
    const words = userInput.toLowerCase().split(" ");

    // Gennemgår alle energidrikke og giver dem en match-score
    const matches = knowledgeBase.map((drink) => {
      let score = 0;

      // +1 point hvis brugeren nævner en størrelse (250ml / 500ml)
      if (words.includes(drink.size.toLowerCase())) score++;
      
      // +1 point for hver smagsvariant, der matcher
      drink.flavor.toLowerCase().split(", ").forEach(flavor => {
        if (words.includes(flavor)) score++;
      });

      // +1 point hvis brugeren søger sukkerfri og drikken er sukkerfri
      if (words.includes("sukkerfri") && drink.sugarFree) score++;

      return { drink, score };
    });

    // Sortér drikke efter bedste match (højeste score først)
    matches.sort((a, b) => b.score - a.score);

    // Returner den bedste match, hvis der er et resultat
    if (matches[0] && matches[0].score > 0) {
      return matches[0].drink;
    } else {
      // Ingen match fundet → returner en standardbesked
      return { brand: "Ingen match", variant: "Prøv at ændre din beskrivelse." };
    }
  };

  // Når brugeren trykker på knappen, søges der efter en match
  const handleSearch = () => {
    const match = findMatchingDrink(input);
    setResult(match); // Opdaterer result state med det fundne match
  };

  // Returnerer (brugergrænsefladen)
  return (
    <div className="containerenergi">
      <h1>Find din energidrik</h1>
      
      {/* Inputfelt til brugerens beskrivelse */}
      <input
        type="text"
        placeholder="Beskriv din ønskede energidrik..."
        value={input}
        onChange={(e) => setInput(e.target.value)} // Opdaterer input state ved ændring
        className="input"
      />
      
      {/* Knap til at starte søgningen */}
      <button onClick={handleSearch} className="btn">Find Din Drik</button>
      
      {/* Viser resultatet, hvis der er fundet en match */}
      {result && (
        <div className="result">
          <h2>{result.brand} - {result.variant}</h2>
        </div>
      )}
    </div>
  );
}