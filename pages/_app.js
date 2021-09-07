import Layout from '../comps/layout'
import '../styles/index.css'
import {store} from '../reducer'
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
  <Layout>
<Component {...pageProps} />
  </Layout>
  </Provider>
  )
}

export default MyApp
