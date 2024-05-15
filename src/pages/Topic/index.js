import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicsServices";
import "./Topic.scss";
import { Link } from "react-router-dom";

function Topic() {
  const [Topic, setTopic] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getListTopic();
      setTopic(respone);
    }

    fetchApi();
  }, []);
  return (
    <>
      <div className="table">
      <h2>Danh sách chủ đề ôn luyện</h2>
        {Topic.length > 0 && (
          <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Topic.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><Link to={"/quiz/" + item.id}><button>Làm bài</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        
      </div>
    </>
  )
}

export default Topic;