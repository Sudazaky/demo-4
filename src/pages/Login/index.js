import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { getLogin } from "../../services/usersServices";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../actions/login";
import "./Login.scss";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
    const email = e.target[0].value;
    const password = e.target[1].value;
    const result = await getLogin(email, password);
    if(result.length > 0) {
      setCookie("id", result[0].id, 1);
      setCookie("fullName", result[0].fullName, 1);
      setCookie("email", result[0].email, 1);
      setCookie("token", result[0].token, 1);
      dispatch(checkLogin(true));
      navigate("/");
    }
    else {
      alert("Tài khoản sai");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__title">Login</h2>
        <div>
          <input type="email" placeholder="Nhập email"/>
        </div>
        <div>
        <input type="password" placeholder="Nhập mật khẩu"/>
        </div>
        <button className="button" type="submit">Đăng nhập</button>
      </form>
    </>
  )
}

export default Login;