
import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'


import { App } from '@/components/App'

getChainOptions().then((chainOptions) => {
    ReactDOM.render(
        <WalletProvider {...chainOptions}>        
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </WalletProvider>
,
        document.getElementById('root'),
    )
});
