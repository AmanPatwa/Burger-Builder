import Modal from 'react-bootstrap/Modal'
import React, { Component } from 'react'

class Modal1 extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render(){
        
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

            </Modal>

        )
    }
}

export default Modal1;