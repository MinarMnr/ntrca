import React from 'react'
// import { Button, Card, Col, Container, Modal, Row } from '@themesberg/react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modal.scss"

const TeacherAlreadyExistModal = ({ show, setShow, ...props }) => {
    return (
        <>

            {/* <Modal
                animation={true}
                show={show}
                onHide={() => setShow(false)}
                // dialogClassName="modal-90w"
                // aria-labelledby="example-custom-modal-styling-title"
                className="mt-100"
                centered
            // style={{ width: "50%" }}
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>

                    <Card>

                    </Card>


                </Modal.Body>
            </Modal> */}

            <Modal
                {...props}
                animation={true}
                show={show}
                onHide={() => setShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            // className='modal-content'
            // style={{ width: "50% !important" }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='text-danger'>
                        This Teacher is already Exist..!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p className='fw-bold h5'>
                        Institute Name : Alfadanga High School <br></br> <br></br>
                        Designation: Assistant Teacher (Math)
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default TeacherAlreadyExistModal