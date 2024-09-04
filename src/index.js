
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Confetti from 'react-confetti';

function HarryPotterQuest() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0);
  const [ausgewaehlteAntwort, setAusgewaehlteAntwort] = useState('');
  const [ergebnis, setErgebnis] = useState('');
  const [ergebnisColor, setErgebnisColor] = useState('');
  const [antwortGeprueft, setAntwortGeprueft] = useState(false);
  const [punkte, setPunkte] = useState(0);
  const [spielBeendet, setSpielBeendet] = useState(false);
  const [level, setLevel] = useState(1);

  const fragen = [
    {
      frage: "Welcher Zauberspruch lässt Gegenstände schweben?",
      optionen: ['Expelliarmus', 'Wingardium Leviosa', 'Accio', 'Lumos'],
      richtigeAntwort: 'Wingardium Leviosa'
    },
    {
      frage: "Wie heißt Harry Potters Eule?",
      optionen: ['Hedwig', 'Errol', 'Pigwidgeon', 'Fawkes'],
      richtigeAntwort: 'Hedwig'
    },
    {
      frage: "In welchem Haus ist Harry Potter in Hogwarts?",
      optionen: ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'],
      richtigeAntwort: 'Gryffindor'
    },
    {
      frage: "Wie lautet der vollständige Name von Dumbledore?",
      optionen: [
        'Albus Percival Wulfric Brian Dumbledore',
        'Albus Severus Wulfric Brian Dumbledore',
        'Albus Percival Wolfric Bryan Dumbledore',
        'Albus Severus Wolfric Bryan Dumbledore'
      ],
      richtigeAntwort: 'Albus Percival Wulfric Brian Dumbledore'
    },
    {
      frage: "Welches Tier ist auf dem Wappen von Ravenclaw zu sehen?",
      optionen: ['Löwe', 'Schlange', 'Adler', 'Dachs'],
      richtigeAntwort: 'Adler'
    },
    {
      frage: "Wie heißt der Zaubertrank, der Glück bringt?",
      optionen: ['Vielsaft-Trank', 'Felix Felicis', 'Amortentia', 'Veritaserum'],
      richtigeAntwort: 'Felix Felicis'
    },
    {
      frage: "Welcher Zauberspruch wird verwendet, um einen Patronus zu beschwören?",
      optionen: ['Expecto Patronum', 'Riddikulus', 'Protego', 'Lumos Maxima'],
      richtigeAntwort: 'Expecto Patronum'
    },
    {
      frage: "Wie heißt der Gründer von Slytherin mit vollem Namen?",
      optionen: [
        'Salazar Slytherin',
        'Severus Slytherin',
        'Scorpius Slytherin',
        'Septimus Slytherin'
      ],
      richtigeAntwort: 'Salazar Slytherin'
    },
    {
      frage: "Welches magische Objekt ermöglicht Zeitreisen in Harry Potter?",
      optionen: ['Denkarium', 'Zeitumkehrer', 'Erinnermich', 'Sprechender Hut'],
      richtigeAntwort: 'Zeitumkehrer'
    },
    {
      frage: "Wie heißt der Zauberspruch, der verwendet wird, um Erinnerungen zu löschen?",
      optionen: ['Obliviate', 'Legilimens', 'Alohomora', 'Confundo'],
      richtigeAntwort: 'Obliviate'
    }
  ];

  const pruefeAntwort = () => {
    const aktuelleFrage = fragen[aktuelleFrageIndex];
    if (ausgewaehlteAntwort === aktuelleFrage.richtigeAntwort) {
      setErgebnis('Richtig! Du bist ein wahrer Zauberer! +5 Punkte');
      setErgebnisColor('green');
      setPunkte(punkte + 5);
    } else {
      setErgebnis(`Leider falsch. Die richtige Antwort ist: ${aktuelleFrage.richtigeAntwort}`);
      setErgebnisColor('red');
    }
    setAntwortGeprueft(true);

    if (aktuelleFrageIndex === fragen.length - 1) {
      setSpielBeendet(true);
    }
  };

  const naechsteFrage = () => {
    if (aktuelleFrageIndex < fragen.length - 1) {
      const neuerIndex = aktuelleFrageIndex + 1;
      setAktuelleFrageIndex(neuerIndex);
      setAusgewaehlteAntwort('');
      setErgebnis('');
      setAntwortGeprueft(false);

      // Erhöhe das Level nach jeder dritten Frage
      if (neuerIndex % 3 === 0 && level < 3) {
        setLevel(level + 1);
      }
    }
  };

  const spielNeuStarten = () => {
    setAktuelleFrageIndex(0);
    setAusgewaehlteAntwort('');
    setErgebnis('');
    setErgebnisColor('');
    setAntwortGeprueft(false);
    setPunkte(0);
    setSpielBeendet(false);
    setLevel(1);
  };

  const aktuelleFrage = fragen[aktuelleFrageIndex];

  if (spielBeendet) {
    const hatGewonnen = punkte >= 25; // Geändert von 20 auf 25
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Harry Potter Quest - Endergebnis</h1>
        <h2 style={{ fontSize: '3em', margin: '30px 0' }}>
          Du hast {punkte} von 50 Punkten erreicht!
        </h2>
        <h3 style={{ fontSize: '2em', color: hatGewonnen ? 'green' : 'red' }}>
          {hatGewonnen ? 'Glückwunsch! Du hast gewonnen!' : 'Schade! Du hast leider verloren.'}
        </h3>
        <p>Danke fürs Spielen!</p>
        <button onClick={spielNeuStarten} style={{ marginTop: '20px', padding: '10px', fontSize: '1.2em' }}>
          Noch mal
        </button>
        {hatGewonnen && <Confetti />}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Harry Potter Quest</h1>
      <h2>Punkte: {punkte}</h2>
      <p>{aktuelleFrage.frage}</p>
      {aktuelleFrage.optionen.map((option) => (
        <button
          key={option}
          onClick={() => !antwortGeprueft && setAusgewaehlteAntwort(option)}
          style={{
            margin: '5px',
            padding: '5px',
            backgroundColor: '#f1f1f1',
            fontWeight: ausgewaehlteAntwort === option ? 'bold' : 'normal',
            opacity: antwortGeprueft ? 0.6 : 1,
            cursor: antwortGeprueft ? 'not-allowed' : 'pointer'
          }}
          disabled={antwortGeprueft}
        >
          {option}
        </button>
      ))}
      <br />
      <button
        onClick={pruefeAntwort}
        style={{ marginTop: '20px', padding: '10px' }}
        disabled={antwortGeprueft || !ausgewaehlteAntwort}
      >
        Antwort prüfen
      </button>
      {ergebnis && <p style={{ color: ergebnisColor }}>{ergebnis}</p>}
      {antwortGeprueft && aktuelleFrageIndex < fragen.length - 1 && (
        <button onClick={naechsteFrage} style={{ marginTop: '20px', padding: '10px' }}>
          Nächste Frage
        </button>
      )}
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Level: {level}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <HarryPotterQuest />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
