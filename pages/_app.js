import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from 'react-use-cart'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CartProvider>
  )
}

export default MyApp
