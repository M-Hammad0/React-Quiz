import React, { useState } from 'react';
import QuestionCard from './Components/QuestionCard';
import {fetchQuestions, Difficulty, QuestionState} from './Api'
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const Total_Questions = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(
      Total_Questions,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev +1 )
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev,answerObject])
    }


  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === Total_Questions){
      setGameOver(true);
    }else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
      <h1>React Quiz</h1>
      {gameOver || userAnswer.length === Total_Questions ? (<button className="start" onClick={startTrivia}>Start</button>) : null}
      {!gameOver ? <p className="score">Score: {score}</p>: null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
      <QuestionCard 
      questionNr={number+1}
      totalQuestions={Total_Questions}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswer ? userAnswer[number] : undefined}
      callback={checkAnswer}
      />)}
      {!gameOver && !loading && userAnswer.length === number+1 && number !== Total_Questions -1 ?
        <button className="next" onClick={nextQuestion}>Next Question</button> : null }
    </Wrapper>
    </>
  );
}

export default App;
