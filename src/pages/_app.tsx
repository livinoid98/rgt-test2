import App from "next/app"
import type { AppProps } from 'next/app'
import {RecoilRoot} from "recoil"
import "../styles/order.scss"

const RGT = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <RecoilRoot>
                <Component {...pageProps}/>
            </RecoilRoot>
        </>
    )
}

export default RGT;

RGT.getInitialProps = async (appContext: any) => {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps }
}