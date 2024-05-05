import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, ToastAlert } from "../../components/notification";
import { selectDeleteModal, setDeleteModal } from "../../reducers/deleteModalSlice";
import { setErrorMessage } from "../../reducers/errorMessageSlice";
import { selectToastAlert, setToastAlert } from "../../reducers/toastAlertSlice";


import Content from "./Content";
import Header from "./Header";
import './Site.scss';

const Site = () => {

    const dispatch = useDispatch();

    const { type } = useSelector(selectToastAlert);
    const { deleteApi } = useSelector(selectDeleteModal);

    useEffect(() => {

        dispatch(setToastAlert({
            type: '',
            message: ''
        }));

        dispatch(setDeleteModal({
            title: '',
            message: ''
        }));

    }, [type, deleteApi]);

    useEffect(() => {

        dispatch(setErrorMessage({
            errors: ''
        }));

    });


    return (
        <>
            <Header />
            <Content />
            {/*<Footer/>*/}
            {/*code goes here*/}
            <ToastAlert />
            <DeleteModal />
        </>
    );

};

export default Site;