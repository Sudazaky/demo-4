import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import { checkExits, postRegister } from "../../services/usersServices";
import "./Register.scss";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
    // console.log(e.target[2].value);
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    
    const checkExitsRegister = checkExits("email", email);
    if(checkExitsRegister.length > 0) {
      alert("Email đã tồn tại");
    }
    else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken()
      }
  
      const respone = await postRegister(options);
      if(respone) {
        navigate("/login");
      }
      else {
        alert("Email đã có");
      }
    }
  }
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <input placeholder="Họ và tên"/>
      </div>
      <div>
        <input type="email" placeholder="Nhập email"/>
      </div>
      <div>
      <input type="password" placeholder="Nhập mật khẩu"/>
      </div>
      <button className="button" type="submit">Đăng ký</button>
    </form>
    </>
  )
}

export default Register;