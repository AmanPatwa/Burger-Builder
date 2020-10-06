import Modal from 'react-bootstrap/Modal'
import React from 'react';

const modalheader = (props) => (
    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.modalheader}
                    </Modal.Title>
                </Modal.Header>
);

export default modalheader