import React,{useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower,FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory()
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName') //busca o valor armazenado anteriormente no navegador
    useEffect(() => {
        api.get('profile',{
            headers:{
                authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data)
        })
    },[ongId]);
    
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    authorization:ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !==id))
        }catch(err){
            alert('Erro ao deletar o caso, tente novamente')
        }
    }

    async function handleLogout(){
        localStorage.clear();
        history.push('/')
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() =>handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}

                


            </ul>

        </div>
    )
}