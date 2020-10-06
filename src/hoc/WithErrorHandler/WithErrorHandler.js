import React, {Component} from 'react'
import MyModal from '../../components/UI/Modal/Modal'
import Modal from 'react-bootstrap/Modal'

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state = {
            error:null
        }

        updateModalState = () => {
            this.setState({error:null})
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                console.log("error",error);
                this.setState({error:error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        render(){
            return(
                <>
                <MyModal
                    show = {this.state.error}
                    onHide={this.updateModalState}
                    >
                    <Modal.Body>
                        {this.state.error ? this.state.error.message: null}
                    </Modal.Body>
                </MyModal>
                <WrappedComponent {...this.props}/>

                </>
            );
        }

    }

}

export default withErrorHandler;