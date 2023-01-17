import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import seta from "../../images/seta.png";

import {useHistory } from 'react-router-dom';
import { logout } from '../../Services/utils';

import "./Profiles.css";




export default function Profiles() {
  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [message, setMessage] = useState();
  const [currentInvitedProfile, setCurrentInvitedProfile] = useState();
  const [invites, setInvites] = useState();
  //const [update, setVar] = useState();


  const history = useHistory();
  function handleLogout() {
    logout();
    history.push("/")
  };
  
  useEffect(() => {

    // retorna o usuário logado atualmente
    api.get("/perfil/").then((resp) => setCurrentProfile(resp.data)).catch((error) => console.error(error));

    // retorna todos os perfis presentes no banco
    api.get('/perfis/').then((resp) => setProfiles(resp.data)).catch((error) => console.error(error));
    
      // retorna todos os convites
    api.get("/convites/").then((resp) => {
      const invitesInfo = resp.data.map((invite) => {

        const profile = profiles?.find((profile) => invite.solicitante === profile.id);
        return { ...profile, inviteId: invite.id };
      });
      setInvites(invitesInfo);
    }).catch((error) => console.error(error))
    
  }, [profiles]);

  function invite(id) {
    api.post(`/convites/convidar/${id}`).then((resp) => setMessage(resp.data.mensagem)).catch((error) => console.error(error));
  
    setCurrentInvitedProfile(id);
  }

  function accept(id) {
    api.post(`/convites/aceitar/${id}`).then((resp) => console.log(resp)).catch((error) => console.error(error));

    //setVar(!update)
  }

  return (
  <>
    <div className="nav-Profiles">
      <nav>
        <ul className="logo-Nav"><li><h2>Rede social</h2></li></ul>
      <ul className="ul-Nav">
        <li><img className="seta" src={ seta } alt="seta"/>
          <ul className="ul-Drop">
            <li><button onClick={handleLogout} className='btLogout'>Sair</button></li>
          </ul></li>
          <li className="li-Nav"><h3>Olá, { currentProfile?.nome }!</h3></li>
      </ul>
      </nav>
    </div>
      

      <div className="body">
        <div className="profiles">
          <div className="invite">
            <h2>Usuários</h2>
            {profiles?.map((profile) => 
              profile.id === currentProfile?.id || profile.pode_convidar===false? null : (
                <div key={profile.id}>
                  <div className="card">
                    <h3 title={ profile.email }> {profile.nome }</h3>
                    {profile.pode_convidar ? (
                      <button className="icon" title="convidar" onClick={() => invite(profile.id)}>Convidar</button>
                    ) : null}
                  </div>
                  {profile.id === currentInvitedProfile ? <span className="message">{ message }</span> : null}
                </div>
              ),
              )}
          </div>
        </div>
        <div className="inv-cont">
          <div className="contacts">
            <h2>Contatos</h2>
            <ul className="contact">
              {currentProfile?.contatos.map((contact) => (
                <li className="card" key={contact.id}>
                  <h3>{ contact.nome }</h3>
                  <span>{ contact.email }</span>
                </li>
            ))}
            </ul>
          </div>
          {invites ?
            <div className="invitations">
              <h2>Convites pendentes</h2>
              {invites?.map((item) => (
                  <div className="card" key={item.inviteId}>
                    <h3>{ item.nome }</h3>
                    <button className="icon" onClick={() => accept(item.inviteId) }>Aceitar</button>
                  </div>
              ))}
            </div> : null}
        </div>
        <div className="content"><h3>Conteúdo</h3></div>
      </div>
    <footer><p>Desenvolvido por <b>Richard</b> e <b>Mateus</b></p></footer>
  </>
);
}
