// src/components/ScoreCard.tsx

import React from 'react';
import {QuestionResult, QuizResult} from '@/components/Quiz';
import {Question} from '@/data/QuestionSet';

type Props = {
    quizResult: QuizResult;
    questions: Question[];
    name: string;
};

const ScoreCard = ({quizResult, questions, name}: Props) => {
    const passPercentage = 60;

    const percentage = (quizResult.score / (questions.length * 5)) * 100;
    const status = percentage >= passPercentage ? 'Pass' : 'Fail';

    return (
        <>
            <div className='card p-4'>
                <h3>Hello, {name}. Here is your Result Analysis</h3>
                <table className='table'>
                    <tbody>
                    <tr>
                        <td>Total Questions:</td>
                        <td>{questions.length}</td>
                    </tr>
                    <tr>
                        <td>Total Score:</td>
                        <td>{quizResult.score}</td>
                    </tr>
                    <tr>
                        <td>Correct Answers:</td>
                        <td>{quizResult.correctAnswers}</td>
                    </tr>
                    <tr>
                        <td>Wrong Answers:</td>
                        <td>{quizResult.wrongAnswers}</td>
                    </tr>
                    <tr>
                        <td>Pass Percentage:</td>
                        <td>{passPercentage}%</td>
                    </tr>
                    <tr>
                        <td>Your Percentage:</td>
                        <td>{percentage}%</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{status}</td>
                    </tr>
                    </tbody>
                </table>
                <h4>Correct Answers List:</h4>
                {quizResult.correctAnswersList?.length === 0 && <li>No correct answers</li>}
                <ul>
                    {quizResult.correctAnswersList?.map((result: QuestionResult, index: number) => (
                        <li key={index}>
                            <b>Question:</b> {result.question} <br/>
                            <b>Selected Answer:</b> {result.selectedAnswer} <br/>
                            <b>Correct Answer:</b> {result.correctAnswer}
                        </li>
                    ))}
                </ul>
                <h4>Wrong Answers List:</h4>
                {quizResult.wrongAnswersList?.length === 0 && <li>No wrong answers</li>}
                <ul>
                    {quizResult.wrongAnswersList?.map((result: QuestionResult, index: number) => (
                        <li key={index}>
                            <b>Question:</b> {result.question} <br/>
                            <b>Selected Answer:</b> {result.selectedAnswer} <br/>
                            <b>Correct Answer:</b> {result.correctAnswer}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => window.location.reload()}
                    className='btn btn-primary mt-3'
                >
                    Restart
                </button>
            </div>
        </>
    );
};

export default ScoreCard;