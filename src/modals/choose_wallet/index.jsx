
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { observer } from 'mobx-react-lite'

import Col from 'react-bootstrap/Col';
import { WalletProvider, useWallet as useWalletTerra,WalletStatus as TerraWalletStatus } from '@terra-money/wallet-provider';
import React from 'react';
import { Provider } from "@project-serum/anchor";
import Wallet from "@project-serum/sol-wallet-adapter";

import {
    Signer,
    ConfirmOptions,

    TransactionSignature,
    PublicKey,
} from "@solana/web3.js";
import { useState, useEffect, useMemo } from "react";
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { useWallet as useWalletTon} from '@/stores/WalletService';
import { ContentLoader } from '@/components/common/ContentLoader'

import NotifyingProvider from "@/pages/SwapPage";

export const Choose_Wallet = observer(({
    show,
    onHide
}) => {
    const [selectedtype, setselectedtype] = useState('');
    
    async function onClickConnectTON() {
        setselectedtype("EVER")
        window.localStorage.setItem("selectedwallet",selectedtype);
        window.location.href= "/EVERswap"
    }
    async function onClickConnectSollet() {
        setselectedtype("SOLLET")
        window.localStorage.setItem("selectedwallet",selectedtype);
        window.location.href= "/swap"
    }
   
    
    return (
        
            <><>
                
                <Modal show={show}
                onHide={onHide}
                    size='sm'
                    centered>
                        <Modal.Header closeButton>
                            Select a wallet.
                        </Modal.Header>
                <Modal.Body style={{background: 'white'}}>
                <Row>    
                     <Col style={{ paddingTop: '0px',width: '100%' }}>
                        <div style={{display: 'flex',columnGap: '13em',flexWrap: 'wrap'}}>
                            <div onClick={onClickConnectSollet} style={{ display: 'flex',padding: '10px',borderRadius: '5px',cursor: 'pointer',margin: '10px 0px',width: '100%' }} className="btn-primary whitebtn">
                                    <img style={{ height: '51px', width: '51px' }} src="https://www.sollet.io/favicon.ico" />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                        <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                            Sollet
                                        </span>
                                        <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                            Choose Serum wallet
                                        </span>
                                    </div>
                                </div>
                                <div onClick={onClickConnectTON} style={{ display: 'flex',padding: '10px',borderRadius: '5px',cursor: 'pointer',margin: '8px 0px 0',width: '100%'}} className="btn-primary whitebtn">
                                                <img style={{ height: '51px', width: '51px' }} src="https://i.postimg.cc/pXRpptg2/ever.png" />
                                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                                    <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                        TON
                                                    </span>
                                                    <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                        Choose Everscale wallet
                                                    </span>
                                                </div>
                                            </div>
                             
                       </div>
                    </Col>
                </Row>
                </Modal.Body>

                </Modal>
           
            </></>
            
    );
    
})

export default Choose_Wallet;