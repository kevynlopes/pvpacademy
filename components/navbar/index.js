import { useRouter } from 'next/router'

import Image from 'next/image'
import styles from './NavBar.module.scss'

import Logo from '../../public/logo.png'
export default function navbar() {
    const router = useRouter()

    const handleRedirect = () => {

        router.push('/login')

    }

    return (
        <div className={styles.container}>
            <hamburguer>

                <div></div>
                <div></div>
                <div></div>
                
            </hamburguer>
            <div className={styles.content}>

                <Image src={Logo} alt="Tst" />

                <ul>

                    <li>Início</li>
                    <li>Vantagens</li>
                    <li>Planos</li>
                    <li>Avaliações</li>
                    <li onClick={handleRedirect}>

                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 9.5H12V12H11V9.5Z" fill="white" />
                            <path d="M9 7H10V12H9V7Z" fill="white" />
                            <path d="M4.5 12C3.8372 11.9992 3.20178 11.7356 2.73311 11.2669C2.26444 10.7982 2.00079 10.1628 2 9.5H3C3 9.79667 3.08797 10.0867 3.2528 10.3334C3.41762 10.58 3.65189 10.7723 3.92597 10.8858C4.20006 10.9994 4.50166 11.0291 4.79264 10.9712C5.08361 10.9133 5.35088 10.7704 5.56066 10.5607C5.77044 10.3509 5.9133 10.0836 5.97118 9.79264C6.02906 9.50166 5.99935 9.20006 5.88582 8.92597C5.77229 8.65189 5.58003 8.41762 5.33336 8.2528C5.08668 8.08797 4.79667 8 4.5 8V7C5.16304 7 5.79893 7.26339 6.26777 7.73223C6.73661 8.20107 7 8.83696 7 9.5C7 10.163 6.73661 10.7989 6.26777 11.2678C5.79893 11.7366 5.16304 12 4.5 12Z" fill="white" />
                            <path d="M13 0H1C0.734865 0.000264738 0.480665 0.105707 0.293186 0.293186C0.105707 0.480665 0.000264738 0.734865 0 1V13C0.000264738 13.2651 0.105707 13.5193 0.293186 13.7068C0.480665 13.8943 0.734865 13.9997 1 14H13C13.2651 13.9996 13.5192 13.8941 13.7067 13.7067C13.8941 13.5192 13.9996 13.2651 14 13V1C13.9997 0.734865 13.8943 0.480665 13.7068 0.293186C13.5193 0.105707 13.2651 0.000264738 13 0ZM13 4.5H6V1H13V4.5ZM5 1V4.5H1V1H5ZM1 13V5.5H13L13.001 13H1Z" fill="white" />
                        </svg>


                        Cursos

                    </li>

                </ul>

            </div>
        </div>
    )
}