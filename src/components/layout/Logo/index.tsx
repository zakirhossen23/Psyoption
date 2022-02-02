import * as React from 'react'

import './index.scss'

import { NavLink } from 'react-router-dom'

export function Logo(): JSX.Element {
    return (
        <div className="logo">

            <NavLink to="/">
                <div style={{ "display": "flex" }}>
                    <img className="NavImg" src="/favicon.svg" />
                    <div className="navbar-brand">PsyGift</div>
                </div>
            </NavLink>
        </div>
    )
}
