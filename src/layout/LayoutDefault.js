import { Link, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../helpers/cookie";
import { useSelector} from "react-redux";

function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector(state => state.loginReducer);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <Link to="/">Quiz</Link>
          </div>
          <div className="layout-default__menu">
            <ul>
              {token && (
                <>
                  <li>
                  <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/topic">Topic</Link>
                  </li>
                  <li>
                    <Link to="/answers">Answers</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="layout-default__account">
            {token ? (
              <>
                <Link to="/logout">Đăng xuất</Link>
              </>
            ) : (
              <>
                <Link to="/login">Đăng nhập</Link>
                <Link to="/register">Đăng ký</Link>
              </>
            )}
            
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          CopyRight @2024 by Sudazaky
        </footer>
      </div>
    </>
  )
}

export default LayoutDefault;