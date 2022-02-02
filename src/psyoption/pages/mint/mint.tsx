import Mint from './index';
import {
  ThemeProvider,
  StylesProvider,
  useMediaQuery,
} from '@material-ui/core';
import { RecoilRoot } from 'recoil';

import { WalletKitProvider } from '@gokiprotocol/walletkit';
import theme from '../../utils/theme';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

import {
  ManualExerciseWarning,
  ManualExerciseWarningProvider,
} from '../../components/ManualExerciseWarning';
export default function App(): JSX.Element {
  const manualExerciseWarningState = useState(false);

    return (
        <RecoilRoot>     
           <StylesProvider injectFirst>
           <ThemeProvider theme={theme}>

           <WalletKitProvider key="WalletKitProvider" defaultNetwork="mainnet-beta"
              app={{ name: 'PsyOptions'}}>
                 <Mint/>
            </WalletKitProvider>

        
          </ThemeProvider>
          </StylesProvider>
        </RecoilRoot>
      );
};
