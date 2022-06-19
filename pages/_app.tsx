import type { AppProps } from 'next/app'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        transition={Slide}
        closeOnClick
        pauseOnHover
      />
    </GoogleReCaptchaProvider>
  )
}

export default MyApp
