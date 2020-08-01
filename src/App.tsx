import React, { useState } from 'react';
import QuestionCard from './Components/QuestionCard';
import {fetchQuestions, QuestionState} from './Api'
import { GlobalStyle, Wrapper } from './App.styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const Total_Questions = 10;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);


// var diff = "easy";

function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [diff, setDiff] = useState("");

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(Total_Questions,diff);

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

  const handle = (event: any) => {
    setDiff(event.target.value);
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
      <h1>React Quiz</h1>
      
      {gameOver || userAnswer.length === Total_Questions ? (
        <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Difficulty</InputLabel>
        <NativeSelect value={diff} defaultValue="" onChange={handle}>
          <option style={{cursor: "pointer"}} value="easy">Easy</option>
          <option style={{cursor: "pointer"}} value="medium">Medium</option>
          <option style={{cursor: "pointer"}} value="hard">Hard</option>
        </NativeSelect>
      </FormControl>
      <button className="start" onClick={startTrivia}>Start</button>
      </div>
      ) : null}
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
