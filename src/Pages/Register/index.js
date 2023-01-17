import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../Services/api";
import "../Login/Login.css";
import logo from "../../images/experiencein.png";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [companyName, setCompanyName] = useState();
  //const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  function login(e){
    e.preventDefault();
    history.push("/")
  }

  function submit(e) {
    e.preventDefault();
    api.post("/perfis/", { 
      nome: name, 
      email: email, 
      senha: password, 
      nome_empresa: companyName }).then((resp) => {
        console.log(resp);
        history.push("/");
      }).catch((error) => console.log(error));
  }

  return (
    <div className="body">
      <div className="lateral">
      <img className="logo" src={ logo } alt="logo"/>
      </div>
      <div className="form">
        <form onSubmit={submit}>
        <label>
          <b>Nome</b>
        </label>
        <input type="text" onChange={(e) => setName(e.target.value)} />

        <label>
          <b>Email</b>
        </label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        
        <label>
          <b>Nome da empresa</b>
        </label>
        <input type="text" onChange={(e) => setCompanyName(e.target.value)}/>

        {/* <label>
          Phone
        </label>
        <input type="text" onChange={(e) => setPhone(e.target.value)}/> */}

        <label>
          <b>Senha</b>
        </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
        <div className="bt-Login">
          <button type="submit" onClick={login}>Fazer login</button>
          <button>Criar conta</button>
        </div>
        
      </form>
    </div>
  </div>
  );
}
