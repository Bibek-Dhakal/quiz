// src/components/Quiz.tsx

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {quiz} from '@/data/QuestionSet';
import ScoreCard from '@/components/ScoreCard';

export type QuestionResult = {
    question: string;
    answers: string[];
    correctAnswer: string;
    selectedAnswer: string;
};

export type QuizResult = {
    score: number;
    correctAnswers: number;
    wrongAnswers: number;
    correctAnswersList?: QuestionResult[];
    wrongAnswersList?: QuestionResult[];
};

const Quiz = ({name}: { name: string }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answerChecked, setAnswerChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [quizResult, setQuizResult] = useState<QuizResult>({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        correctAnswersList: [],
        wrongAnswersList: [],
    });

    const {questions} = quiz;
    const {question, answers, correctAnswer} = questions[currentQuestionIndex];

    const onAnswerSelected = (answer: string, idx: number) => {
        setSelectedAnswerIndex(idx);
        setSelectedAnswer(answer);
        setAnswerChecked(true);
    };

    const handleNextQuestion = () => {
        const questionResult: QuestionResult = {
            question,
            answers,
            correctAnswer,
            selectedAnswer,
        };

        if (selectedAnswer === correctAnswer) {
            setQuizResult((prev) => ({
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
                correctAnswersList: [...(prev.correctAnswersList || []), questionResult],
            }));
        } else {
            setQuizResult((prev) => ({
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
                wrongAnswersList: [...(prev.wrongAnswersList || []), questionResult],
            }));
        }

        if (currentQuestionIndex !== questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setShowResults(true);
        }
        setSelectedAnswer('');
        setSelectedAnswerIndex(null);
        setAnswerChecked(false);
    };

    return (
        <div className='container mt-5'>
            <div>
                {!showResults ? (
                    <div className='card p-4'>
                        <h4>{question}</h4>
                        <ul className='list-group'>
                            {answers.map((answer, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => onAnswerSelected(answer, idx)}
                                    className={
                                        'list-group-item ' +
                                        (selectedAnswerIndex === idx ? 'active' : '') +
                                        ' cursor-pointer'
                                    }
                                >
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        <div className='d-flex justify-content-between mt-3'>
                            <b>Question {currentQuestionIndex + 1}/{questions.length}</b>
                            <button
                                onClick={handleNextQuestion}
                                className='btn btn-primary'
                                disabled={!answerChecked}
                            >
                                {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <ScoreCard
                        quizResult={quizResult}
                        questions={questions}
                        name={name}
                    />
                )}
            </div>
        </div>
    );
};

export default Quiz;