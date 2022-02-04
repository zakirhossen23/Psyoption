import Mint from './index';
import {
  ThemeProvider,
  StylesProvider,
  useMediaQuery,
} from '@material-ui/core';
import { RecoilRoot } from 'recoil';

import useOptionsMarkets from '../../hooks/useOptionsMarkets';
import Store from '../../context/store';

import { useLoadOptionMarkets } from '../../hooks/PsyOptionsAPI/useLoadOptionMarkets';
import { useLoadOptionOpenOrders } from '../../hooks/useLoadOptionOpenOrders';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import theme from '../../utils/theme';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

import {
  ManualExerciseWarning,
  ManualExerciseWarningProvider,
} from '../../components/ManualExerciseWarning';
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
