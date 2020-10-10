import React, { useState } from "react";
import { QuestionCard } from "./components/QuestionCard";
import {fetchQuizQuestions} from './API'
import {QuestionState,Difficulty} from './API'


type AnswerObject= {
  question: string;
  asnwer:string;
  correct:boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10; 
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )
    setQuestion(newQuestions);
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false)
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length=== TOTAL_QUESTIONS ?(
      <button className="start" onClick={startQuiz}>
        Start
      </button>
      ):null }
      {!gameOver? <p className="score">Score:</p>:null}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver &&(
      <QuestionCard
        questionNr={number + 1}
        totalQuestion={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
        )}
      <button className="next" onClick={nextQuestion}>NextQuestion</button>
    </div>
  );
};

export default App;
