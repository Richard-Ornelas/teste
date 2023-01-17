import React, {useState} from "react";
import "./Login.css";
import logo from "../../images/experiencein.png";
import { api } from "../../Services/api";
import { login } from "../../Services/utils";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  
  function register(e){
    e.preventDefault();
    history.push("/register")
  }

  function submit(e){
    e.preventDefault();
    api.post("/login/", { username, password }).then((resp) => {
      login(resp.data.token);
      console.log(resp);
      history.push("/profiles");
    }).catch((error) => console.log(error));
  }
  return (
  <>
    <div className="body">
      <div className="lateral">
      <img className="logo" src={ logo } alt="logo"/>
      </div>
      <div className="form">
      <form>
        <label>
          <b>Nome</b>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <b>Senha</b>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="bt-Login">
          <button type="submit" onClick={register}>Criar conta</button>
          <button type="submit" onClick={submit}>Fazer login</button>
        </div>
      </form>
      </div>
    </div>
  </>
  
  );
}
