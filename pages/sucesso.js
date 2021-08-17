import React from 'react'
import axios from 'axios'

import styles from '../styles/Sucess.module.scss'

import Lousa from '../public/lousa.png'

import Image from 'next/image'
import { useRouter } from 'next/router'

import NavBar from '../components/navbar'

export default function ScreenSucess() {
    const router = useRouter()

    React.useEffect(() => {

        axios.post('http://api.pvpacademy.com.br/create/payment', {
            collection_id: router.query.collection_id,
            collection_status: router.query.collection_status,
            external_reference: router.query.external_reference,
            merchant_account_id: router.query.merchant_account_id,
            merchant_order_id: router.query.merchant_order_id,
            payment_id: router.query.payment_id,
            payment_type: router.query.payment_type,
            preference_id: router.query.preference_id,
            processing_mode: router.query.processing_mode,
            site_id: router.query.site_id,
            status: router.query.status
        })

    })

    return (
        <div className={styles.container}>

            <NavBar />

            <main>

                <Image src={Lousa} width={550} height={350} alt='' />
                <h1>Compra realizada com sucesso</h1>
                <p>Dentro de algumas horas, sua compra será aprovada e o seu curso creditado em sua conta. Basta se autenticar com a senha e o e-mail enviado para o e-mail que utilizou ao efetuar a compra.</p>

            </main>

        </div>
    )
}