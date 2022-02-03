import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Market from '@/psyoption/pages/initialize-market/init';

import { observer } from 'mobx-react-lite'
export const Initialize_Wallet = observer(({
    show,
    onHide
}) => {


    return (
        <><>
            <Modal show={show}
                onHide={onHide}
                size='gg'
                centered>
                <Modal.Header closeButton>
                    Initialize-Market
                </Modal.Header>
                <Modal.Body >
                <Market/>
                </Modal.Body>
            </Modal>
        </></>
    );

})

export default Initialize_Wallet;