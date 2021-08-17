import React from 'react'
import axios from 'axios'

import Image from 'next/image'

import NavBar from '../components/navbar'
import styles from '../styles/Login.module.scss'

import { useRouter } from 'next/router'

import Lousa from '../public/lousa.png'

export default function login() {
    const router = useRouter()

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')

    const [error, setError] = React.useState('')

    const auth = () => {

        if(!email || !pass) return setError('email&pass'), setTimeout(() => setError(''), 1000)
        axios.post('https://api.pvpacademy.com.br/get/login', {
            token: 'Batata',
            email: email,
            pass: pass
        }).then(async (res) => {

            if(res.data.adm === true) {

                sessionStorage.setItem('@user', JSON.stringify(res.data))
                router.push('/dashboard/administrator/addaula')

            } else {

                sessionStorage.setItem('@user', JSON.stringify(res.data))

                const aulasBasico = await axios.get('https://api.pvpacademy.com.br/get/aulas/basico')
                const aulasAvancado = await axios.get('https://api.pvpacademy.com.br/get/aulas/avancado')
                const aulasTryHard = await axios.get('https://api.pvpacademy.com.br/get/aulas/tryhard')
    
                if(res.data.plans.includes('basico')) return router.push(`/dashboard/aulas/${aulasBasico.data[0].replace(/(.mp4)/g, '')}`)
                if(res.data.plans.includes('avancado')) return router.push(`/dashboard/aulas/${aulasAvancado.data[0].replace(/(.mp4)/g, '')}`)
                if(res.data.plans.includes('tryhard')) return router.push(`/dashboard/aulas/${aulasTryHard.data[0].replace(/(.mp4)/g, '')}`)    

            }

        }).catch(err => {

            console.log(err)
            setError('email&pass'), setTimeout(() => setError(''), 1000)

        })
        
    }

    return (
        <div className={styles.container}>

            <NavBar />

            <main>
                <div className={styles.session}>

                    <div>

                        <Image alt='' src={Lousa} />

                    </div>
                    <div>

                        <h1>Olá, seja bem vindo</h1>

                        <h2>E-mail</h2>
                        <input className={error === "email" || error === "email&pass" ? styles.move : ''} onChange={(c) => setEmail(c.target.value)} placeholder="Insira seu e-mail..." />

                        <h2>Senha</h2>
                        <input className={error === "pass" || error === "email&pass" ? styles.move : ''} onChange={(c) => setPass(c.target.value)}  placeholder="Insira sua senha..." />

                        <a onClick={auth}>

                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.2861 14.9286H18.8576V18.8571H17.2861V14.9286Z" fill="white" />
                                <path d="M14.1426 11H15.714V18.8571H14.1426V11Z" fill="white" />
                                <path d="M7.07115 18.8571C6.02961 18.8559 5.03109 18.4416 4.29461 17.7051C3.55813 16.9686 3.14383 15.9701 3.14258 14.9286H4.71401C4.71401 15.3948 4.85225 15.8505 5.11126 16.2381C5.37026 16.6258 5.7384 16.9279 6.16911 17.1063C6.59982 17.2847 7.07376 17.3314 7.53101 17.2404C7.98825 17.1495 8.40825 16.925 8.7379 16.5953C9.06755 16.2657 9.29205 15.8457 9.383 15.3884C9.47395 14.9312 9.42727 14.4572 9.24887 14.0265C9.07046 13.5958 8.76834 13.2277 8.38071 12.9687C7.99308 12.7097 7.53735 12.5714 7.07115 12.5714V11C8.11307 11 9.11232 11.4139 9.84907 12.1507C10.5858 12.8874 10.9997 13.8866 10.9997 14.9286C10.9997 15.9705 10.5858 16.9697 9.84907 17.7065C9.11232 18.4432 8.11307 18.8571 7.07115 18.8571Z" fill="white" />
                                <path d="M20.4286 0H1.57143C1.15479 0.000416017 0.75533 0.16611 0.46072 0.46072C0.16611 0.75533 0.000416017 1.15479 0 1.57143V20.4286C0.000416017 20.8452 0.16611 21.2447 0.46072 21.5393C0.75533 21.8339 1.15479 21.9996 1.57143 22H20.4286C20.8451 21.9994 21.2445 21.8336 21.5391 21.5391C21.8336 21.2445 21.9994 20.8451 22 20.4286V1.57143C21.9996 1.15479 21.8339 0.75533 21.5393 0.46072C21.2447 0.16611 20.8452 0.000416017 20.4286 0ZM20.4286 7.07143H9.42857V1.57143H20.4286V7.07143ZM7.85714 1.57143V7.07143H1.57143V1.57143H7.85714ZM1.57143 20.4286V8.64286H20.4286L20.4301 20.4286H1.57143Z" fill="white" />
                            </svg>


                            Entrar

                        </a>
                    </div>

                </div>

            </main>
        </div>
    )
}