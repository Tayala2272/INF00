import "./SingleQuestionForm.css";
import { useState, useEffect } from "react";

const SingleQuestionForm = () => {

  const [pressedButton, setPressedButton] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [pytanie,setPytanie] = useState({
    pytanie: "",
    odpowiedzi: {
      odpA: "",
      odpB: "",
      odpC: "",
      odpD: "",
    },
    prawidlowaOdpowiedz: "",
    obrazek: "Brak",})

    useEffect(() => {
  const getData = async () => {
      const response = await fetch('https://app-3ltgtwxjda-uc.a.run.app/api/questions/inf02');
      const data = await response.json();
      console.log(data)
      // Uaktualnij zmienną `pytanie` danymi z API
      const query = {
        pytanie: data.pytanie,
        odpowiedzi: {
          odpA: data.odpowiedzi.odpA,
          odpB: data.odpowiedzi.odpB,
          odpC: data.odpowiedzi.odpC,
          odpD: data.odpowiedzi.odpD,
        },
        prawidlowaOdpowiedz: data.prawidlowaOdpowiedz,
        obrazek: data.obrazek, // Zakładamy, że `image` to zmienna przechowująca ścieżkę do obrazka
      };

      setPytanie(query);
    };
    getData()
  },[])

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
          {pytanie.obrazek !== "Brak" && (
              <img src={pytanie.obrazek} className="card-img" alt="Wczytywanie zdjęcia" />
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
