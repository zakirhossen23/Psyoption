import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {
  getOptionByKey,
  OptionMarketWithKey,
} from '@mithraic-labs/psy-american';
import Button from '@material-ui/core/Button';

import { PublicKey } from '@solana/web3.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useAmericanPsyOptionsProgram } from '../../hooks/useAmericanPsyOptionsProgram';
import Page from '../../components/pages/Page';
import { PlusMinusIntegerInput } from '../../components/PlusMinusIntegerInput';
import { useConnectedWallet } from "@saberhq/use-solana";
import GokiButton from '../../components/GokiButton';
import theme from '../../utils/theme';
import { useMintOptions } from '../../hooks/PsyOptionsAPI/useMintOptions';
import { MintInfo } from '../../components/Mint/MintInfo';
import MintParamInput  from '../../components/Mint/MintParamInput';

/**
 * Page to allow users to mint options that have been initialized.
 *
 * TODO allow user to input parameters instead of option key
 */
const Mint: React.VFC = () => {
  const program = useAmericanPsyOptionsProgram();
  const wallet = useConnectedWallet();
  const mintOptions = useMintOptions();
  const [optionMarketAddress, setOptionMarketAddress] = useState('');
  const [quantity, setQuantity] = useState<number | null>(1);
  const [option, setOption] = useState<OptionMarketWithKey | null>(null);
  const [validKey, setValidKey] = useState(true);
  const [loading, setLoading] = useState(false);
const [showText, setShowText]=useState('');

  const validInput = !!(option && quantity);
  const onTextChange = useCallback((e) => {
    setOptionMarketAddress(e.target.value);
    setOption(null);
  }, []);
  const handleMint = () => {
  
    setLoading(true);
    const min = 1;
  const max = 100;
  const rand = min + Math.random() * (max - min);
    setShowText(`https://psyoptions/mints/${rand}`)

    setLoading(false);
  };

  useEffect(() => {
    if (!program || !optionMarketAddress) {
      return;
    }
    let key: PublicKey | null = null;
    try {
      key = new PublicKey(optionMarketAddress);
    } catch (err) {
      setValidKey(false);
      console.log(err);
      return;
    }
    setValidKey(true);
    (async () => {
      const _option = await getOptionByKey(program, key);
      setOption(_option);
    })();
  }, [1000,optionMarketAddress, program]);

  return (
    <Page>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minHeight="100%"
        pb={[0, 0, 4]}
      >
        <Paper
          style={{
            width: '100%',
            maxWidth: '50vw',
          }}
        >
          <Box pb={2} display="flex" flexDirection="column">
            <Box p={2} textAlign="center">
              <h2 style={{ margin: '10px 0 0' }}>Mint Options</h2>
            </Box>
            {showText !="" ? (
              <Box mx={2}>
                <h2 style={{ color: theme.palette.error.main, fontSize:"2vw" }}>
                  {showText}
                </h2>
              </Box>
            ):(<></>)}
            <MintParamInput  />
           
            <Box mt={3} mx={2} zIndex={1} alignSelf="center">
              {loading ? (
                <Box display="flex" justifyContent="center" p={1}>
                  <CircularProgress />
                </Box>
              ) : !wallet?.connected ? (
                <GokiButton />
              ) : (
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleMint}
                >
                  <Box py={1}>Mint</Box>
                </Button>
              ) }
            </Box>
           
          </Box>
        </Paper>
      </Box>
    </Page>
  );
};

export default Mint;
