import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import { deriveOptionKeyFromParams } from '@mithraic-labs/psy-american';
import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { useAmericanPsyOptionsProgram } from '../../hooks/useAmericanPsyOptionsProgram';
import { useDecimalsForMint } from '../../hooks/useDecimalsForMint';
import useNotifications from '../../hooks/useNotifications';
import { OptionType } from '../../types';
import { getDateWithDefaultTime } from '../../utils/dates';
import theme from '../../utils/theme';
import { ExpirationInput } from '../Inputs/ExpirationInput';
import { SelectAssetOrEnterMint } from '../SelectAssetOrEnterMint';

const darkBorder = `1px solid ${theme.palette.background.main}`;

export default function MintParamInput(): JSX.Element{
  
  const [nft, setNFTName] = useState('');
  const [nftImage, setNFTimage] = useState('');
  
  const [strike, setStrike] = useState('');
 

  return (
  <>
      <Box borderTop={darkBorder} padding="5px">
     
      <Box display="flex" borderBottom={darkBorder}>
            <Box width="100%"  borderRight={darkBorder}>
          <TextField
            value={nft}
            label="NFT name"
            fullWidth
            style={{'fontSize':'2rem'}}
            variant="filled"
            onChange={(e) => setNFTName(e.target.value)}
          
          />
        </Box> 
      </Box>
    
      
        <Box display="flex" borderBottom={darkBorder}>
        <Box width="100%" borderRight={darkBorder}>
          <TextField
            value={nftImage}
            label="NFT image URL"
            variant="filled"
            fullWidth
            style={{'fontSize':'2rem'}}
          onChange={(e) => setNFTimage(e.target.value)}
          
          />
        </Box>
      </Box>     
       </Box>
  </>
    
  );
};
