import React, { useState, useEffect } from "react";
import "./style.css";

import { Card } from '../../conponents/card';

export function Home() {
  const [studantName, setStudantName] = useState();
  const [studats, setStudants] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handLeAddStudent() {
    const newStudent = {
      name: studantName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudants(prevState => [...prevState, newStudent])

  }

  useEffect(() => {

    async function fetchData(){
      const response = await fetch(`https://api.github.com/users/viniciuSoaress`);
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData()

    // fetch(`https://api.github.com/users/viniciuSoaress`)
    //   .then(Response => Response.json())
    //   .then(data => {
    //     setUser({
    //       name: data.name,
    //       avatar: data.avatar_url,
    //     })
    //   })
  }, [])

  return (
    <div className="conteiner">

      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="digite seu nome"
        onChange={e => setStudantName(e.target.value)}
      />

      <button type="button" onClick={handLeAddStudent}>
        Adicionar
      </button>

      {
        studats.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))



      }

    </div>
  );
}
