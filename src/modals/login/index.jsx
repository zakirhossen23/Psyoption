
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { WalletProvider, useWallet as useWalletTerra, WalletStatus as TerraWalletStatus } from '@terra-money/wallet-provider';
import React from 'react';
import { Provider } from "@project-serum/anchor";
import './app.css';
import Wallet from "@project-serum/sol-wallet-adapter";
import { ContentLoader } from '@/components/common/ContentLoader'

import {
    Signer,
    ConfirmOptions,

    TransactionSignature,
    PublicKey,
} from "@solana/web3.js";
import { useState, useEffect, useMemo } from "react";
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { useWallet as useWalletTon } from '@/stores/WalletService';

import NotifyingProvider from "@/pages/SwapPage";


export default function Login({
    show,
    onHide,
    redirecting

}) {
    // const NotifyingProvider = swappage.NotifyingProvider;
    const TONwallet = useWalletTon()
    async function onClickConnectTON() {
        await TONwallet.connect();
        window.location.href = (redirecting);
    }
    async function onClickDisConnectTON() {
        await TONwallet.disconnect();
        window.location.reload();
    }
        async function installTON() {
            var href = "https://chrome.google.com/webstore/detail/ton-crystal-wallet/cgeeodpfagjceefieflmdfphplkenlfk";
            var target = "_blank"
            window.open(href, target);
        }

        async function onClickConnectSollet() {
            await Serumwallet.connect();
            window.location.href = (redirecting);
        }
        //Serum
        const [isConnected, setIsConnected] = useState(false);
        const [provider, Serumwallet] = useMemo(() => {
            const opts = {
                preflightCommitment: "recent",
                commitment: "recent",
            };
            const network = "https://solana-api.projectserum.com";
            const Serumwallet = new Wallet("https://www.sollet.io", network);
            const connection = new Connection(network, opts.preflightCommitment);
            const provider = new NotifyingProvider(
                connection,
                Serumwallet,
                opts,
                (tx, err) => {
                    if (err) {
                        console.log(`Error: ${err.toString()}`, {
                            variant: "error",
                        });
                    } else {
                        console.log("Transaction sent", {
                            variant: "success",
                            action: (
                                <Button
                                    color="inherit"
                                    component="a"
                                    target="_blank"
                                    rel="noopener"
                                    href={`https://explorer.solana.com/tx/${tx}`}
                                >
                                    View on Solana Explorer
                                </Button>
                            ),
                        });
                    }
                }
            );
            return [provider, Serumwallet];
        }, []);

        Serumwallet.on("connect", () => {
            console.log("Wallet connected", { variant: "success" });
            setIsConnected(true);
        });
        Serumwallet.on("disconnect", () => {
            console.log("Wallet disconnected", { variant: "info" });
            setIsConnected(false);
        });

        //Terra Wallet
        const { connect, disconnect, status, availableConnections, availableConnectTypes } = useWalletTerra()
        async function connectTerra(type) {
            console.log(status);
            console.log(TerraWalletStatus.WALLET_NOT_CONNECTED);
            await connect("EXTENSION");

            window.location.href = (redirecting);

        }
        async function disconnectTerra(type) {
            await disconnect();

            window.location.reload();

        }
        async function installTerra(type) {
            var href = "https://chrome.google.com/webstore/detail/aiifbnbfobpmeekipheeijimdpnlpgpp";
            var target = "_blank"
            window.open(href, target);
        }

        return (

            <><>
                <Head>
                    <title>Login</title>
                    <meta name="description" content="Login" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Modal show={show}
                    onHide={onHide}
                    size='lg'
                    centered>
                    <Modal.Header closeButton>
                        Select a wallet.
                    </Modal.Header>
                    <div className='modal-body-login'>
                        <Row>
                            <div style={{ margin: '0px 0px 12px', width: '100%', color: 'grey' }}>
                                <h4>Please select one of the option to Login</h4>
                            </div>

                            <Col style={{ paddingTop: '0px', width: '100%' }}>
                                <div style={{ display: 'flex', columnGap: '7em', flexWrap: 'wrap' }}>

                                    <div onClick={onClickConnectSollet} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary whitebtn">
                                        <img style={{ height: '51px', width: '51px' }} src="https://www.sollet.io/favicon.ico" />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                            <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                Sollet
                                            </span>
                                            <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                Connect With Serum wallet
                                            </span>
                                        </div>
                                    </div>

                                    {/***************** Terra Wallet *******************/}
                                    {status == TerraWalletStatus.INITIALIZING ? (
                                        <ContentLoader />
                                    ) : (
                                        availableConnectTypes.includes("EXTENSION") ? (
                                            status == "WALLET_NOT_CONNECTED" ? (
                                                <div onClick={connectTerra} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary whitebtn">
                                                    <img style={{ height: '51px', width: '51px' }} src="https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=018" />
                                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                                        <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                            UST
                                                        </span>
                                                        <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                            Connect With Terra wallet
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary whitebtn">
                                                    <div onClick={connectTerra} style={{background: 'transparent', display: 'flex',width: '100%',padding: '0'}} className="btn-primary">
                                                        <img style={{ height: '51px', width: '51px' }} src="https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=018" />
                                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                                            <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                                UST
                                                            </span>
                                                            <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                                Connected Terra wallet
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button onClick={disconnectTerra} type="button" className="btn btn-logout" style={{ width: 'initial' }}>
                                                        <span className="icon closebtn" style={{
                                                            background: '#9d9999',
                                                            float: 'right',
                                                            borderRadius: '7px'
                                                        }}>
                                                            <svg style={{fill: 'red'}}  fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4753 18.2903H19.295H20.1146V21.5162V23.9355H15.1966L15.1967 27L13.0492 26.2799L8.11633 24.662C7.4459 24.433 7 24.2782 7 24.2782V7H8.63938C8.66196 7 8.68378 7.00459 8.70558 7.00919C8.72248 7.01275 8.73936 7.0163 8.75659 7.01772C8.76929 7.01605 8.78125 7.01267 8.79315 7.00931C8.80968 7.00464 8.8261 7 8.84424 7H17.6556H20.1146V11.8387H19.295H18.4753L18.4754 8.61267L17.6556 8.61281H13.8376H11.918L15.1966 9.41936V22.3226H18.4753V21.5162V18.2903ZM23.153 11.2686L27 15.0644C27 15.0644 26.7522 15.3194 26.4318 15.6346L23.153 18.8605L21.7541 20.2257L21.7539 15.8709H17.6556V15.0645V14.2581H21.7539L21.7541 9.90301L23.153 11.2686Z"></path></svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            )

                                        ) : (
                                            <div onClick={installTerra} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary whitebtn">
                                                <img style={{ height: '51px', width: '51px' }} src="https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=018" />
                                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                                    <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                        UST
                                                    </span>
                                                    <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                        Install Terra wallet
                                                    </span>
                                                </div>
                                            </div>
                                        )

                                    )}
                                    {/***************** TON Wallet *******************/}
                                    {TONwallet.isConnecting ? (
                                        <ContentLoader />
                                    ) : (
                                        <> {TONwallet.hasProvider ? (
                                            !TONwallet.isConnected ? (
                                                <div onClick={onClickConnectTON} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary whitebtn">
                                                    <img style={{ height: '51px', width: '51px' }} src="https://i.postimg.cc/pXRpptg2/ever.png" />
                                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                                        <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                            TON
                                                        </span>
                                                        <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                            Connect With Everscale wallet
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (<>
                                                <div style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary whitebtn">
                                                    <div onClick={onClickConnectTON} style={{ background: 'transparent',display: 'flex',width: '100%',padding: '0'}} className="btn-primary">
                                                        <img style={{ height: '51px', width: '51px' }} src="https://i.postimg.cc/pXRpptg2/ever.png" />
                                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                                            <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                                TON
                                                            </span>
                                                            <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                                Connected Everscale wallet
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button onClick={onClickDisConnectTON} type="button" className="btn btn-logout" style={{ width: 'initial' }}>
                                                        <span className="icon closebtn" style={{
                                                            background: '#9d9999',
                                                            float: 'right',
                                                            borderRadius: '7px'
                                                        }}>
                                                            <svg style={{fill: 'red'}} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4753 18.2903H19.295H20.1146V21.5162V23.9355H15.1966L15.1967 27L13.0492 26.2799L8.11633 24.662C7.4459 24.433 7 24.2782 7 24.2782V7H8.63938C8.66196 7 8.68378 7.00459 8.70558 7.00919C8.72248 7.01275 8.73936 7.0163 8.75659 7.01772C8.76929 7.01605 8.78125 7.01267 8.79315 7.00931C8.80968 7.00464 8.8261 7 8.84424 7H17.6556H20.1146V11.8387H19.295H18.4753L18.4754 8.61267L17.6556 8.61281H13.8376H11.918L15.1966 9.41936V22.3226H18.4753V21.5162V18.2903ZM23.153 11.2686L27 15.0644C27 15.0644 26.7522 15.3194 26.4318 15.6346L23.153 18.8605L21.7541 20.2257L21.7539 15.8709H17.6556V15.0645V14.2581H21.7539L21.7541 9.90301L23.153 11.2686Z"></path></svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </>
                                            )) : (<>
                                                <div onClick={installTON} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary whitebtn">
                                                    <img style={{ height: '51px', width: '51px' }} src="https://i.postimg.cc/pXRpptg2/ever.png" />
                                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                                        <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                                            TON
                                                        </span>
                                                        <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                                            Install Everscale wallet
                                                        </span>
                                                    </div>
                                                </div>
                                            </>)}
                                        </>
                                    )}

                                </div>
                            </Col>
                        </Row>
                    </div>

                </Modal>

            </></>

        );

    }


