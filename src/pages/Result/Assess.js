function Assess(props) {
  const { dataResult } = props;
  let resultTrue = 0;
  let resultFalse = 0;
  for(let i = 0; i < dataResult.length; i++) {
    if(dataResult[i].correctAnswer === dataResult[i].answer) {
      resultTrue++;
    }
    else {
      resultFalse++;
    }
  }
  return (
    <>
      <p>Đúng: {resultTrue} | Sai: {resultFalse} | Tổng số câu: {resultTrue + resultFalse} | Tỷ lệ đúng: {((resultTrue/(resultTrue + resultFalse))*100).toFixed(0)}%</p>
    </>
  )
}

export default Assess;