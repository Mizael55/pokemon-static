import '@/styles/globals.css'
import {NextUIProvider} from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { darkTheme } from '../themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
  
}
