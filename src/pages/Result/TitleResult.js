import { useEffect, useState } from "react";
import { getTopic } from "../../services/topicsServices";

function TitleResult(props) {
  const { dataResult } = props;
  const [dataTopics, setDataTopics] = useState([]);
  // console.log(dataResult[0].topicsId);

  useEffect(() => {

    const fetchApi = async () => {
      const respone = await getTopic(String(dataResult[0].topicsId));
      setDataTopics(respone);
    }
    fetchApi();
  }, []);

  // console.log(dataTopics);

  return (
    <>
      <h2>Kết quả chủ đề: {dataTopics.length > 0 && (dataTopics[0].name)}</h2>
    </>
  )
}

export default TitleResult;