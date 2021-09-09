import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <div>
      <title>PvPAcademy</title>
      <link rel="icon" href="/favicon.ico" />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
