import React from 'react'
import styles from './Sucess.module.scss';

export default function ComponentSucess({ children }) {
    const [hidden, setHidden] = React.useState(false)

    return (

        <div className={hidden ? styles.hidden : styles.container}>

            <div>

                <svg width="46" height="36" viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18L18 33L43 3" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>
            <div>

                <h1>Sucesso!</h1>
                <p>{children}</p>

            </div>
            <div onClick={() => setHidden(true)}>

                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 0C7.61136 0 0 7.61136 0 17C0 26.3886 7.61136 34 17 34C26.3886 34 34 26.3886 34 17C34 7.61136 26.3886 0 17 0ZM22.729 13.4563C23.0105 13.1648 23.1663 12.7744 23.1628 12.3692C23.1592 11.964 22.9967 11.5764 22.7102 11.2898C22.4236 11.0033 22.036 10.8408 21.6308 10.8372C21.2256 10.8337 20.8352 10.9895 20.5437 11.271L17 14.8147L13.4563 11.271C13.3137 11.1234 13.1432 11.0057 12.9546 10.9247C12.7661 10.8437 12.5633 10.801 12.3581 10.7992C12.1529 10.7975 11.9494 10.8366 11.7594 10.9143C11.5695 10.992 11.397 11.1067 11.2518 11.2518C11.1067 11.397 10.992 11.5695 10.9143 11.7594C10.8366 11.9494 10.7975 12.1529 10.7992 12.3581C10.801 12.5633 10.8437 12.7661 10.9247 12.9546C11.0057 13.1432 11.1234 13.3137 11.271 13.4563L14.8147 17L11.271 20.5437C11.1234 20.6863 11.0057 20.8568 10.9247 21.0454C10.8437 21.2339 10.801 21.4367 10.7992 21.6419C10.7975 21.8471 10.8366 22.0506 10.9143 22.2406C10.992 22.4305 11.1067 22.603 11.2518 22.7482C11.397 22.8933 11.5695 23.008 11.7594 23.0857C11.9494 23.1634 12.1529 23.2025 12.3581 23.2008C12.5633 23.199 12.7661 23.1563 12.9546 23.0753C13.1432 22.9943 13.3137 22.8766 13.4563 22.729L17 19.1853L20.5437 22.729C20.8352 23.0105 21.2256 23.1663 21.6308 23.1628C22.036 23.1592 22.4236 22.9967 22.7102 22.7102C22.9967 22.4236 23.1592 22.036 23.1628 21.6308C23.1663 21.2256 23.0105 20.8352 22.729 20.5437L19.1853 17L22.729 13.4563Z" fill="black" />
                </svg>

            </div>

        </div>

    )
}