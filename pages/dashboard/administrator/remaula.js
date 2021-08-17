import axios from 'axios'

import React from 'react'
import styles from '../../../styles/Aula.module.scss'

import Sucess from '../../../components/sucess'

import { useRouter } from 'next/router'

export default function ScreenRemAula() {
    const router = useRouter()

    const [plan, setPlan] = React.useState('basico')
    const [name, setName] = React.useState('')

    const [sucess, setSucess] = React.useState(false)

    const handleSave = async() => {

        axios.post('https://api.pvpacademy.com.br/delete/aula', {
            name: name,
            plan: plan.toLowerCase()
        }).then((res) => {

            setSucess(true)

        }).catch(err => {

            return;

        })
        
    }

    React.useEffect(() => {

        const verify = async() => {

            const data = await JSON.parse(sessionStorage.getItem('@user'))
            if (!data) return router.push('/')
    
            axios.post('https://api.pvpacademy.com.br/get/login', {
                token: 'Batata',
                email: data.email,
                pass: data.pass
            }).then((res) => {
    
                if(res.data.adm === true) return; 
    
                sessionStorage.setItem('@user', JSON.stringify(res.data))
                router.push('/')
    
            }).catch(err => {
    
                router.push('/')
    
            })

        }

        verify()

    })

    React.useEffect(() => {

        const verify = async() => {

            const data = await JSON.parse(sessionStorage.getItem('@user'))
            if (!data) return router.push('/')
    
            axios.post('http://localhost:3333/get/login', {
                token: 'Batata',
                email: data.email,
                pass: data.pass
            }).then((res) => {
    
                if(res.data.adm === true) return; 
    
                sessionStorage.setItem('@user', JSON.stringify(res.data))
                router.push('/')
    
            }).catch(err => {
    
                router.push('/')
    
            })

        }

        verify()

    })

    return (
        <div className={styles.container}>
            <nav>

                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 2C0 0.9 0.9 0 2 0H10V2H2V16H10V18H2C0.9 18 0 17.1 0 16V2ZM14.176 8L11.64 5.464L13.054 4.05L18.004 9L13.054 13.95L11.64 12.536L14.176 10H7.59V8H14.176Z" fill="black" />
                </svg>

                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8736 13.0958V12.4196V11.7346L23.5817 10.24C23.8966 9.96252 24.1032 9.58262 24.1651 9.16749C24.2269 8.75237 24.1401 8.32874 23.9198 7.97147L21.8203 4.41292C21.6642 4.14271 21.4399 3.91827 21.1698 3.76212C20.8997 3.60597 20.5932 3.52361 20.2812 3.52329C20.0878 3.52181 19.8955 3.55185 19.7118 3.61225L17.55 4.34175C17.1768 4.09373 16.7874 3.87083 16.3846 3.67453L15.9309 1.43264C15.8495 1.02306 15.6267 0.655135 15.3014 0.393281C14.9761 0.131427 14.5691 -0.00767417 14.1516 0.00032688H9.9881C9.57059 -0.00767417 9.16356 0.131427 8.83828 0.393281C8.513 0.655135 8.29018 1.02306 8.20882 1.43264L7.75511 3.67453C7.34937 3.87078 6.95708 4.09368 6.58079 4.34175L4.46345 3.57666C4.27778 3.52829 4.08551 3.51026 3.89409 3.52329C3.58207 3.52361 3.27562 3.60597 3.00548 3.76212C2.73535 3.91827 2.51102 4.14271 2.35502 4.41292L0.255474 7.97147C0.0478212 8.3282 -0.0293417 8.74604 0.0372009 9.15341C0.103744 9.56078 0.309851 9.93234 0.620225 10.2045L2.30164 11.7435V13.1047L0.620225 14.5993C0.301084 14.8733 0.0893391 15.2515 0.0225658 15.6668C-0.0442074 16.0821 0.0383099 16.5076 0.255474 16.8678L2.35502 20.4264C2.51102 20.6966 2.73535 20.921 3.00548 21.0772C3.27562 21.2333 3.58207 21.3157 3.89409 21.316C4.08745 21.3175 4.27976 21.2874 4.46345 21.227L6.62527 20.4975C6.99851 20.7456 7.38784 20.9685 7.79069 21.1648L8.24441 23.4067C8.32576 23.8162 8.54858 24.1842 8.87387 24.446C9.19915 24.7079 9.60617 24.847 10.0237 24.839H14.2228C14.6403 24.847 15.0473 24.7079 15.3726 24.446C15.6979 24.1842 15.9207 23.8162 16.002 23.4067L16.4557 21.1648C16.8615 20.9685 17.2538 20.7456 17.6301 20.4975L19.783 21.227C19.9667 21.2874 20.159 21.3175 20.3524 21.316C20.6644 21.3157 20.9708 21.2333 21.241 21.0772C21.5111 20.921 21.7354 20.6966 21.8914 20.4264L23.9198 16.8678C24.1275 16.5111 24.2046 16.0933 24.1381 15.6859C24.0715 15.2785 23.8654 14.907 23.555 14.6348L21.8736 13.0958ZM20.2812 19.5367L17.2297 18.5048C16.5154 19.1098 15.699 19.5828 14.8188 19.9015L14.1872 23.0953H9.9881L9.35645 19.9371C8.48321 19.6093 7.67123 19.1372 6.95443 18.5403L3.89409 19.5367L1.79454 15.9782L4.21436 13.8431C4.04986 12.9222 4.04986 11.9794 4.21436 11.0585L1.79454 8.8611L3.89409 5.30256L6.94554 6.33454C7.65986 5.72949 8.47625 5.25652 9.35645 4.93781L9.9881 1.74401H14.1872L14.8188 4.90222C15.6921 5.22998 16.504 5.70213 17.2208 6.29895L20.2812 5.30256L22.3807 8.8611L19.9609 10.9962C20.1254 11.9171 20.1254 12.8599 19.9609 13.7808L22.3807 15.9782L20.2812 19.5367Z" fill="#10364A" />
                    <path d="M12.0878 17.7575C11.0321 17.7575 10.0001 17.4444 9.12229 16.8579C8.24449 16.2714 7.56033 15.4377 7.15632 14.4624C6.75231 13.487 6.64661 12.4137 6.85257 11.3783C7.05853 10.3429 7.56691 9.39177 8.31341 8.64526C9.05992 7.89875 10.011 7.39038 11.0465 7.18442C12.0819 6.97845 13.1552 7.08416 14.1305 7.48817C15.1059 7.89217 15.9395 8.57634 16.5261 9.45413C17.1126 10.3319 17.4256 11.3639 17.4256 12.4197C17.4328 13.1226 17.2996 13.8199 17.0339 14.4708C16.7681 15.1216 16.3752 15.7129 15.8781 16.21C15.381 16.7071 14.7898 17.1 14.1389 17.3657C13.4881 17.6314 12.7908 17.7646 12.0878 17.7575ZM12.0878 8.86112C11.6175 8.85017 11.1499 8.93472 10.7132 9.10968C10.2765 9.28463 9.8798 9.54635 9.54715 9.879C9.2145 10.2117 8.95279 10.6083 8.77783 11.045C8.60288 11.4817 8.51832 11.9494 8.52927 12.4197C8.51832 12.89 8.60288 13.3576 8.77783 13.7943C8.95279 14.231 9.2145 14.6277 9.54715 14.9603C9.8798 15.293 10.2765 15.5547 10.7132 15.7297C11.1499 15.9046 11.6175 15.9892 12.0878 15.9782C12.5581 15.9892 13.0258 15.9046 13.4625 15.7297C13.8992 15.5547 14.2958 15.293 14.6285 14.9603C14.9611 14.6277 15.2229 14.231 15.3978 13.7943C15.5728 13.3576 15.6573 12.89 15.6464 12.4197C15.6573 11.9494 15.5728 11.4817 15.3978 11.045C15.2229 10.6083 14.9611 10.2117 14.6285 9.879C14.2958 9.54635 13.8992 9.28463 13.4625 9.10968C13.0258 8.93472 12.5581 8.85017 12.0878 8.86112Z" fill="#10364A" />
                </svg>

            </nav>
            <main>

                <div className={styles.session}>
                    <div className={styles.painel}>

                        <a href="/dashboard/administrator/addaula">Adicionar aula</a>
                        <a href="/dashboard/administrator/remaula" className={styles.selected}>Remover aula</a>
                        <a href="/dashboard/administrator/addaluno">Adicionar aluno</a>
                        <a href="/dashboard/administrator/remaluno">Remover aluno</a>
                        <a href="/dashboard/administrator/editaluno">Editar aluno</a>
                        <a href="/dashboard/administrator/addadm" className={styles.adm}>Adicionar administrador</a>
                        <a href="/dashboard/administrator/remadm">Remover administrador</a>

                    </div>
                    <div className={styles.conteudo}>

                        <h1 className={styles.top}>Remover aula</h1>

                        <h2>Plano</h2>
                        <select onChange={(c) => setPlan(c.target.value.toLowerCase().toLowerCase().replace(/(ç)/g, 'c'))}>

                            <option>Basico</option>
                            <option>Avançado</option>
                            <option>TryHard</option>
                          
                        </select>

                        <h2>Título</h2>
                        <input onChange={(c) => setName(c.target.value)}placeholder="Insira o título da aula..." />

                        <a onClick={handleSave}>

                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V5L13 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18ZM4 2H8V4H10V2H12V6H4V2ZM4 10H14V16H4V10Z" fill="white" />
                            </svg>


                            Remover aula

                        </a>

                    </div>
                </div>

            </main>
            {sucess ? <Sucess>Está aula foi removida com sucesso, já está indisponivel em nosso curso.</Sucess> : null}
        </div>
    )
}