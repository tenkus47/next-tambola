import Layout from '../comps/layout'
import 'tailwindcss/tailwind.css'
import {store} from '../reducer'
import { Provider } from 'react-redux'
import {useEffect} from 'react'
function MyApp({ Component, pageProps }) {

useEffect(() => {
  window.addEventListener("load", (event) => {
    navigator.onLine ? null : alert("OFFline");
  });
  return () => {
    window.removeEventListener("load",()=>console.log('removed'))
  }
}, [])

  return (
    <Provider store={store}>
  <Layout>
<Component {...pageProps} />
  </Layout>
  </Provider>
  )
}

export default MyApp
