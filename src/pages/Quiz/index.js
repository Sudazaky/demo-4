/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicsServices";
import { getQuestions } from "../../services/questionsServices";
import{ getCookie } from "../../helpers/cookie";
import { postAnswers } from "../../services/answersServices";

function Quiz() {
  const params = useParams();
  const [dataTopics, setDataTopics] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getTopic(params.id);
      setDataTopics(respone);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getQuestions(params.id);
      setDataQuestion(respone);
    }
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);

    let selectorAnswers = [];

    for(let i = 0; i < e.target.elements.length; i++) {
      if(e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        selectorAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value)
        })
      }
    }
    // console.log(selectorAnswers);

    let options = {
      userId: getCookie("id"),
      topicId: parseInt(params.id),
      answers: selectorAnswers
    }
    const respone = await postAnswers(options);
    // console.log(respone);
    if(respone) {
      navigate(`/result/${respone.id}`)
    }
  }
  
  // console.log(dataQuestion);
  return (
    <>
      <div className="table">
        <h2>Bài Quiz chủ đề: {dataTopics && (
          <>
            {dataTopics[0].name}
          </>
        )}</h2>
        <div>
          {dataQuestion.length > 0 && (
            <>
              <div className="form_question">
                <form onSubmit={handleSubmit}>
                  {dataQuestion.map((item, index) => (
                    <div className="question__item" key={index}>
                      <p>Câu {index + 1}: {item.question}</p>
                      {item.answers.map((itemAnswers, indexAnswers) => (
                        <div key={indexAnswers}>
                          <input type="radio" name={item.id} value={indexAnswers} id={`quiz-${item.id}-${indexAnswers}`}/>
                          <label htmlFor={`quiz-${item.id}-${indexAnswers}`}>{item.answers[indexAnswers]}</label>
                        </div>
                      ))}
                    </div> 
                  ))}
                  <button type="submit">Nộp bài</button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Quiz;