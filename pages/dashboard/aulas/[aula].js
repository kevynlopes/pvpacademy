
import React from 'react'
import axios from 'axios'

import { useRouter } from 'next/router';

import styles from '../../../styles/Dashboard.module.scss'

export default function dashboard() {

    const router = useRouter()

    const [dados, setDados] = React.useState({
        aprendizado: 0,
        aulas: 0,
        plans: [],
        cursos: 0
    })

    const [basicoAulas, setBasicoAulas] = React.useState(['...'])
    const [avançadoAulas, setAvançadotoAulas] = React.useState(['...'])
    const [tryhardAulas, setTryhardAulas] = React.useState(['...'])

    const [aprendizado, setAprendizado] = React.useState(0)

    const [aula, setAula] = React.useState({
        name: '...',
        description: '...',
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    })

    React.useEffect(async () => {
        
        if(!router.query.aula) return;

        const getUser = async() => {

            const data = await JSON.parse(sessionStorage.getItem('@user'))
            if(!data) return router.push('/')

            axios.post('https://api.pvpacademy.com.br/get/login', {
                token: 'Batata',
                email: data.email,
                pass: data.pass
            }).then((res) => {

                sessionStorage.setItem('@user', JSON.stringify(res.data))
                setDados({
                    aulas: data.lesson,
                    name: data.name,
                    adm: data.adm,
                    plans: res.data.plans,
                    cursos: data.plans.length
                })

            }).catch(err => {

                router.push('/')

            })
        }

        const getAulas = async() => {

            const resBasico = await axios.get('https://api.pvpacademy.com.br/get/aulas/basico')  
            setBasicoAulas(resBasico.data)

            const resAvancado = await axios.get('https://api.pvpacademy.com.br/get/aulas/avancado')
            setAvançadotoAulas(resAvancado.data)

            const resTryHard = await axios.get('https://api.pvpacademy.com.br/get/aulas/tryhard')
            setTryhardAulas(resTryHard.data)


        }

        const getAula = async() => {

            axios.get(`https://api.pvpacademy.com.br/get/aula/${router.query.aula}`).then((res) => {

                setAula({
                    name: res.data.name,
                    description: res.data.description,
                    video: `https://api.pvpacademy.com.br/aulas/${res.data.plan.replace(/(á)/g, 'a')}/${res.data.name}.mp4`
                })
            
            }).catch(err => {

                router.push('/')

            })

        }

        const Verify = async() => {

            const data = await JSON.parse(sessionStorage.getItem('@user'))
            const res = await axios.get(`https://api.pvpacademy.com.br/get/aula/${router.query.aula}`)

            if(data.plans.includes(res.data.plan.toLowerCase())) return;
            router.push('/')

        }

        const checkAulaVista = () => {

            const user = JSON.parse(sessionStorage.getItem('@user'))

            axios.post('https://api.pvpacademy.com.br/edit/add-aula', {
                token: 'Batata',
                cpf: user.cpf,
                quantity: 1
            })

        }

        const calculeAprendizado = () => {
            
            const user = JSON.parse(sessionStorage.getItem('@user'))
            let aprendizado = Math.floor(user.lesson / basicoAulas.length)
            setAprendizado(aprendizado)

        }
        getUser()
        getAulas()
        getAula()
        checkAulaVista()

        calculeAprendizado()

        Verify()
        
    }, [router.query])

    return (
        <div className={styles.container}>
            <nav>

                {dados.adm ?
                
                    <svg onClick={(c) => router.push('/dashboard/administrator/addaula')} width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7055 12.7059C16.2141 12.7059 19.0584 9.86157 19.0584 6.35294C19.0584 2.84431 16.2141 0 12.7055 0C9.19685 0 6.35254 2.84431 6.35254 6.35294C6.35254 9.86157 9.19685 12.7059 12.7055 12.7059Z" fill="#10364A"/>
                        <path d="M13.77 14.3259C13.4206 14.31 13.0712 14.2941 12.7059 14.2941C8.86235 14.2941 5.27294 15.3583 2.20765 17.1847C0.81 18.0106 0 19.5671 0 21.203V25.4118H14.7071C13.5853 23.8115 12.9076 21.9426 12.743 19.9953C12.5784 18.0479 12.9327 16.0918 13.77 14.3259ZM29.7794 19.0589C29.7794 18.7094 29.7318 18.3918 29.6841 18.0583L31.4947 16.4541L29.9065 13.7065L27.6035 14.4847C27.0953 14.0559 26.5235 13.7224 25.8882 13.4841L25.4118 11.1177H22.2353L21.7588 13.4841C21.1235 13.7224 20.5518 14.0559 20.0435 14.4847L17.7406 13.7065L16.1524 16.4541L17.9629 18.0583C17.9153 18.3918 17.8676 18.7094 17.8676 19.0589C17.8676 19.4083 17.9153 19.7259 17.9629 20.0594L16.1524 21.6636L17.7406 24.4112L20.0435 23.633C20.5518 24.0618 21.1235 24.3953 21.7588 24.6336L22.2353 27H25.4118L25.8882 24.6336C26.5235 24.3953 27.0953 24.0618 27.6035 23.633L29.9065 24.4112L31.4947 21.6636L29.6841 20.0594C29.7318 19.7259 29.7794 19.4083 29.7794 19.0589ZM23.8235 22.2353C22.0765 22.2353 20.6471 20.8059 20.6471 19.0589C20.6471 17.3118 22.0765 15.8824 23.8235 15.8824C25.5706 15.8824 27 17.3118 27 19.0589C27 20.8059 25.5706 22.2353 23.8235 22.2353Z" fill="#10364A"/>
                    </svg>                
                    
                : null}

                <svg onClick={(c) => router.push('/dashboard/config')}width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8736 13.0958V12.4196V11.7346L23.5817 10.24C23.8966 9.96252 24.1032 9.58262 24.1651 9.16749C24.2269 8.75237 24.1401 8.32874 23.9198 7.97147L21.8203 4.41292C21.6642 4.14271 21.4399 3.91827 21.1698 3.76212C20.8997 3.60597 20.5932 3.52361 20.2812 3.52329C20.0878 3.52181 19.8955 3.55185 19.7118 3.61225L17.55 4.34175C17.1768 4.09373 16.7874 3.87083 16.3846 3.67453L15.9309 1.43264C15.8495 1.02306 15.6267 0.655135 15.3014 0.393281C14.9761 0.131427 14.5691 -0.00767417 14.1516 0.00032688H9.9881C9.57059 -0.00767417 9.16356 0.131427 8.83828 0.393281C8.513 0.655135 8.29018 1.02306 8.20882 1.43264L7.75511 3.67453C7.34937 3.87078 6.95708 4.09368 6.58079 4.34175L4.46345 3.57666C4.27778 3.52829 4.08551 3.51026 3.89409 3.52329C3.58207 3.52361 3.27562 3.60597 3.00548 3.76212C2.73535 3.91827 2.51102 4.14271 2.35502 4.41292L0.255474 7.97147C0.0478212 8.3282 -0.0293417 8.74604 0.0372009 9.15341C0.103744 9.56078 0.309851 9.93234 0.620225 10.2045L2.30164 11.7435V13.1047L0.620225 14.5993C0.301084 14.8733 0.0893391 15.2515 0.0225658 15.6668C-0.0442074 16.0821 0.0383099 16.5076 0.255474 16.8678L2.35502 20.4264C2.51102 20.6966 2.73535 20.921 3.00548 21.0772C3.27562 21.2333 3.58207 21.3157 3.89409 21.316C4.08745 21.3175 4.27976 21.2874 4.46345 21.227L6.62527 20.4975C6.99851 20.7456 7.38784 20.9685 7.79069 21.1648L8.24441 23.4067C8.32576 23.8162 8.54858 24.1842 8.87387 24.446C9.19915 24.7079 9.60617 24.847 10.0237 24.839H14.2228C14.6403 24.847 15.0473 24.7079 15.3726 24.446C15.6979 24.1842 15.9207 23.8162 16.002 23.4067L16.4557 21.1648C16.8615 20.9685 17.2538 20.7456 17.6301 20.4975L19.783 21.227C19.9667 21.2874 20.159 21.3175 20.3524 21.316C20.6644 21.3157 20.9708 21.2333 21.241 21.0772C21.5111 20.921 21.7354 20.6966 21.8914 20.4264L23.9198 16.8678C24.1275 16.5111 24.2046 16.0933 24.1381 15.6859C24.0715 15.2785 23.8654 14.907 23.555 14.6348L21.8736 13.0958ZM20.2812 19.5367L17.2297 18.5048C16.5154 19.1098 15.699 19.5828 14.8188 19.9015L14.1872 23.0953H9.9881L9.35645 19.9371C8.48321 19.6093 7.67123 19.1372 6.95443 18.5403L3.89409 19.5367L1.79454 15.9782L4.21436 13.8431C4.04986 12.9222 4.04986 11.9794 4.21436 11.0585L1.79454 8.8611L3.89409 5.30256L6.94554 6.33454C7.65986 5.72949 8.47625 5.25652 9.35645 4.93781L9.9881 1.74401H14.1872L14.8188 4.90222C15.6921 5.22998 16.504 5.70213 17.2208 6.29895L20.2812 5.30256L22.3807 8.8611L19.9609 10.9962C20.1254 11.9171 20.1254 12.8599 19.9609 13.7808L22.3807 15.9782L20.2812 19.5367Z" fill="#10364A" />
                    <path d="M12.0878 17.7575C11.0321 17.7575 10.0001 17.4444 9.12229 16.8579C8.24449 16.2714 7.56033 15.4377 7.15632 14.4624C6.75231 13.487 6.64661 12.4137 6.85257 11.3783C7.05853 10.3429 7.56691 9.39177 8.31341 8.64526C9.05992 7.89875 10.011 7.39038 11.0465 7.18442C12.0819 6.97845 13.1552 7.08416 14.1305 7.48817C15.1059 7.89217 15.9395 8.57634 16.5261 9.45413C17.1126 10.3319 17.4256 11.3639 17.4256 12.4197C17.4328 13.1226 17.2996 13.8199 17.0339 14.4708C16.7681 15.1216 16.3752 15.7129 15.8781 16.21C15.381 16.7071 14.7898 17.1 14.1389 17.3657C13.4881 17.6314 12.7908 17.7646 12.0878 17.7575ZM12.0878 8.86112C11.6175 8.85017 11.1499 8.93472 10.7132 9.10968C10.2765 9.28463 9.8798 9.54635 9.54715 9.879C9.2145 10.2117 8.95279 10.6083 8.77783 11.045C8.60288 11.4817 8.51832 11.9494 8.52927 12.4197C8.51832 12.89 8.60288 13.3576 8.77783 13.7943C8.95279 14.231 9.2145 14.6277 9.54715 14.9603C9.8798 15.293 10.2765 15.5547 10.7132 15.7297C11.1499 15.9046 11.6175 15.9892 12.0878 15.9782C12.5581 15.9892 13.0258 15.9046 13.4625 15.7297C13.8992 15.5547 14.2958 15.293 14.6285 14.9603C14.9611 14.6277 15.2229 14.231 15.3978 13.7943C15.5728 13.3576 15.6573 12.89 15.6464 12.4197C15.6573 11.9494 15.5728 11.4817 15.3978 11.045C15.2229 10.6083 14.9611 10.2117 14.6285 9.879C14.2958 9.54635 13.8992 9.28463 13.4625 9.10968C13.0258 8.93472 12.5581 8.85017 12.0878 8.86112Z" fill="#10364A" />
                </svg>

            </nav>
            <main>

                <div className={styles.session}>
                    <div className={styles.aulas}>

                        <h1>Básico</h1>

                        <ul>

                            {dados.plans.map(a => a.toLowerCase()).includes('basico') ? basicoAulas.map((a, i) => (

                                <li onClick={(c) => router.push(`/dashboard/aulas/${a.replace(/(.mp4)/g, '')}`)} key={i}>{a.replace(/(.mp4)/g, '')}</li>

                            )) : basicoAulas.map((a, i) => (

                                <li style={{ opacity: 0.3, cursor: 'default' }} key={i}>{i + 1} - Aula bloqueada</li>

                            ))}

                        </ul>

                        <h1>Avançado</h1>

                        <ul>

                            {dados.plans.map(a => a.toLowerCase()).includes('avancado') ? avançadoAulas.map((a, i) => (

                                <li onClick={(c) => router.push(`/dashboard/aulas/${a.replace(/(.mp4)/g, '')}`)} key={i}>{a.replace(/(.mp4)/g, '')}</li>

                            )) : avançadoAulas.map((a, i) => (

                                <li style={{ opacity: 0.3, cursor: 'default' }} key={i}>{i + 1} - Aula bloqueada</li>

                            ))}

                        </ul>
                        
                        <h1>Aluno TryHard</h1>

                        <ul>

                            {dados.plans.map(a => a.toLowerCase()).includes('tryhard') ? tryhardAulas.map((a, i) => (

                                <li onClick={(c) => router.push(`/dashboard/aulas/${a.replace(/(.mp4)/g, '')}`)} key={i}>{a.replace(/(.mp4)/g, '')}</li>

                            )) : tryhardAulas.map((a, i) => (

                                <li style={{ opacity: 0.3, cursor: 'default' }} key={i}>{i + 1} - Aula bloqueada</li>

                            ))}

                        </ul>
                    </div>
                    <div className={styles.info}>

                        <div>

                            <h1>Aulas assistidas</h1>
                            <h2>{dados.aulas}</h2>

                        </div>
                        <div>

                            <h1>Aprendizado</h1>
                            <h2>{aprendizado}%</h2>

                        </div>
                        <div>

                            <h1>Quantidade de cursos</h1>
                            <h2>{dados.cursos}</h2>

                        </div>

                    </div>
                    <div className={styles.player}>

                        <video src={aula.video} controls controlsList="nodownload">
                            Troque seu navegador, não é compativel com nosso player.
                        </video>

                        <h1>{aula.name}</h1>
                        <p>{aula.description}</p>

                    </div>

                </div>

            </main>
        </div>
    )
}