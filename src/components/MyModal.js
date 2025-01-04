import React from 'react'
import { Modal } from 'react-bootstrap';

const MyModal = ({ show, handleClose, Component, title, option, ...props }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                {title}
            </Modal.Header>
            <Modal.Body>
                <Component onClose={handleClose} option={option} props={props}/>
            </Modal.Body>
        </Modal>
    );
};

export default MyModal