import "./SingleQuestionForm.css";
import image from "../assets/react.svg";
import { useState, useEffect } from "react";

const SingleQuestionForm = () => {
  const [pressedButton, setPressedButton] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const pytanie = {
    pytanie: "Które urządzenie sieciowe zostało pokazane na rysunku?",
    odpowiedzi: {
      odpA: "Adapter Bluetooth",
      odpB: "Modem USB",
      odpC: "Adapter IrDA",
      odpD: "Karta sieciowa WiFi",
    },
    prawidlowaOdpowiedz: "odpB",
    obrazek: image,
  };

  let count = 1;

  const shuffleAnswers = () => {
    const keys = Object.keys(pytanie.odpowiedzi);
    const shuffledKeys = keys.sort(() => Math.random() - 0.5) as never[];
    setShuffledAnswers(shuffledKeys);
  };

  useEffect(() => {
    shuffleAnswers();
  }, []); // Uruchamiamy tylko raz po pierwszym renderowaniu

  const handleButtonClick = (buttonName: string) => {
    setPressedButton(buttonName);
  };

  useEffect(() => {
    setIsCorrect(pressedButton === pytanie.prawidlowaOdpowiedz);
  }, [pressedButton]);

  return (
    <div>
      <div className="card card-custom bg-dark text-light border border-4 border-secondary rounded">
        <div className="card-body">
          <h3 className="card-title text-center">Pytanie {count++}</h3>
          {pytanie.obrazek && (
            <img src={pytanie.obrazek} className="card-img" alt="..." />
          )}
          <h4 className="card-subtitle text-center mb-2">{pytanie.pytanie}</h4>
          <div className="card-text">
            <form>
              {shuffledAnswers.map((key) => (
                <button
                  key={key}
                  className={`btn-custom w-100 mt-3 ${
                    pressedButton === key && !isCorrect
                      ? "btn-wrong"
                      : pressedButton === key
                      ? "btn-correct"
                      : ""
                  }`}
                  type="button"
                  onClick={() => handleButtonClick(key)}
                >
                  {pytanie.odpowiedzi[key]}
                </button>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestionForm;
