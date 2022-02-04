import * as React from 'react'
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { Button, Grid, makeStyles } from "@material-ui/core";
import './index.scss'

import LOGINModal from '@/modals/login';

export function Nav(): JSX.Element {
    const intl = useIntl()
    const [modalShow, setModalShow] = useState(false);
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <NavLink to="/swap">
                        {intl.formatMessage({
                            id: 'NAV_LINK_TEXT_SWAP',
                        })}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/psyoption">
                        PsyOptions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/psyoption-mint">
                        PsyOptions Mint
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tokens">
                        {intl.formatMessage({
                            id: 'NAV_LINK_TEXT_TOKENS',
                        })}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pairs">
                        {intl.formatMessage({
                            id: 'NAV_LINK_TEXT_PAIRS',
                        })}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/donation" id="donationbtnNav">
                        Donation
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/CreateEvents">
                        Create Events
                    </NavLink>
                </li>
              
            </ul>
            {window.location.pathname.includes("psyoption")?(<></>):(
   <Button
                variant="outlined"
                onClick={() => (setModalShow(true))}
                style={{
                    position: 'absolute',
                    right: '24px',
                    top: '24px',
                    fontSize: '13px',
                    background: 'white'
                }}>
                Connect wallets
            </Button>
            )}
         
            <LOGINModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                redirecting="#"
            />
        </nav>
    )
}
