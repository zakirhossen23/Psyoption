
import {
  ThemeProvider,
  StylesProvider,
  useMediaQuery,
} from '@material-ui/core';
import { RecoilRoot } from 'recoil';

import { InitializedMarketsProvider } from '../../context/LocalStorage';

import { WalletKitProvider } from '@gokiprotocol/walletkit';
import theme from '../../utils/theme';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

import Store from '../../context/store';

import useOptionsMarkets from '../../hooks/useOptionsMarkets';
import {
  ManualExerciseWarning,
  ManualExerciseWarningProvider,
} from '../../components/ManualExerciseWarning';

import { RecoilDevTool } from '../../recoil';
import { useLoadOptionMarkets } from '../../hooks/PsyOptionsAPI/useLoadOptionMarkets';
import { useLoadOptionOpenOrders } from '../../hooks/useLoadOptionOpenOrders';

import Box from '@material-ui/core/Box';
import Mint from '../../components/InitializeMarket/InitializeMarket';

export default function App(): JSX.Element {
  const manualExerciseWarningState = useState(false);

  const AppWithStore: React.FC = ({ children }) => {
    const { packagedMarkets } = useOptionsMarkets();

    useLoadOptionMarkets();
    useLoadOptionOpenOrders();


    useEffect(() => {
      packagedMarkets();
    }, [packagedMarkets]);

    return <>{children}</>;
  };
  return (
    <RecoilRoot>
      <RecoilDevTool />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>

          <WalletKitProvider key="WalletKitProvider" defaultNetwork='devnet' app={{ name: 'PsyOptions' }}>
            <Store>
              <AppWithStore>
                <Mint />
              </AppWithStore>
            </Store>
          </WalletKitProvider>


        </ThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  );
};
