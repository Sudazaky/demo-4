import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersServices";
import { getListTopic } from "../../services/topicsServices";
import { Link } from "react-router-dom";
import "./Answers.scss";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserId = await getAnswersByUserId();
      const topics = await getListTopic();
      // console.log(answersByUserId);
      // console.log(topics);

      let result = [];

      for(let i = 0; i < answersByUserId.length; i++) {
        result.push({
          ...topics.find(item => item.id === String(answersByUserId[i].topicId)),
          ...answersByUserId[i]
        });
      }

      setDataAnswers(result.reverse());
    }

    fetchApi();
  }, []);
  console.log(dataAnswers);
  return (
    <>
      <div className="table">
        <h2>Danh sách các bài đã luyện tập</h2>
        {dataAnswers.length > 0 && (
          <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataAnswers.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><Link to={"/result/" + item.id}><button>Xem chi tiết</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </>
  )
}

export default Answers;