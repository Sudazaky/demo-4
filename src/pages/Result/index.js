/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswers } from "../../services/answersServices";
import { getQuestions } from "../../services/questionsServices";
import "./Result.scss";
import Assess from "./Assess";
import TitleResult from "./TitleResult";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswers(params.id);
      const dataQuestion = await getQuestions(dataAnswers.topicId);
      // console.log(dataAnswers);
      // console.log(dataQuestion);

      let resultFianl = [];

      for(let i = 0; i < dataQuestion.length; i++) {
        resultFianl.push({
          ...dataQuestion[i],
          ...dataAnswers.answers.find(item => String(item.questionId) === dataQuestion[i].id)
        });
      }
      setDataResult(resultFianl);
    }
    fetchApi();
  }, []);

  // useEffect(() => {

  //   const fetchApi = async () => {
  //     const respone = await getTopic(String(topic));
  //     if(dataResult.length > 0) {

  //     }
  //     setDataTopics(respone);
  //   }
  //   fetchApi();
  // }, []);
  
  // console.log(String(dataResult[0].topicsId));
  // console.log(dataTopics);
  // console.log(dataResult[0].topicsId);

  return (
    <>
      {dataResult.length > 0 && (    
      <div className="table">
        <TitleResult dataResult={dataResult} />
        {/* <h2>Kết quả chủ đề: {dataTopics[(dataResult[0].topicsId) - 1].name}</h2> */}
        <div className="assess">
          <Assess dataResult={dataResult}/>
        </div>
        <div className="result">
          {dataResult.map((item, index) => (
            <div className="result__item" key={index}>
              <p>Câu {index + 1}: {item.question}
                {item.correctAnswer === item.answer ? (
                  <span className="result__tag result__tag--true">Đúng</span>
                ) : (
                  <span className="result__tag result__tag--false">Sai</span>
                )}
              </p>
              {item.answers.map((itemAnswers, indexAnswers) => {
                let className = "";
                let checked = false;

                if (item.answer === indexAnswers) {
                  checked = true;
                  className = "result__item--selected";
                }

                if(item.correctAnswer === indexAnswers) {
                  className = "result__item--result";
                }
                return (
                  <div key={indexAnswers}>
                    <input type="radio" checked={checked} disabled/>
                    <label className={className}>{item.answers[indexAnswers]}</label>
                  </div>
                )
              })}
            </div> 
          ))}
        </div>
      </div>
      )}
      
    </>
  )
}

export default Result;