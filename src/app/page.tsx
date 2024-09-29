'use client'

import { useState, ChangeEvent } from "react";
import Quiz from "@/components/Quiz";

export default function Home() {
 const [quizStarted, setQuizStarted] = useState<boolean>(false);
 const [name, setName] = useState<string>('');

 const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value);
 };

 return (
  <div className="container mt-5 ml-5">
   <div className="text-center">
    <h1 className='text-success mtb-1 '>
     Quiz App
    </h1>
   </div>

   {quizStarted ? (
    <Quiz name={name} />
   ) : (
    <>
     <div className="mb-3">
      <label htmlFor="nameInput"
       className="form-label">
       Enter Your Name:
      </label>
      <input
       type="text"
       className="form-control"
       id="nameInput"
       value={name}
       onChange={handleNameChange}
      />
     </div>
     <button
      onClick={() => setQuizStarted(true)}
      className="btn btn-primary"
      disabled={!name.trim()}
     >
      Start Quiz
     </button>
    </>
   )}
  </div>
 );
}