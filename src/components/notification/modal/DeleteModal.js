import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {confirmAlert} from 'react-confirm-alert';
import {selectDeleteModal, setDeleteModal} from "../../../reducers/deleteModalSlice";
import {callApi} from "../../../reducers/apiSlice";
import {setToastAlert} from "../../../reducers/toastAlertSlice";

import 'react-confirm-alert/src/react-confirm-alert.css';

const DeleteModal = (props) => {
  
  const dispatch = useDispatch();
  
  const {title, message, deleteApi} = useSelector(selectDeleteModal);
  
  useEffect(() => {
    if (deleteApi !== undefined && deleteApi !== '') {
      confirmAlert({
        title,
        message,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              dispatch(callApi({
                operationId: deleteApi,
                parameters: {
                  method: 'DELETE'
                }
              }));
              dispatch(setDeleteModal({
                deleteApi: ''
              }));
            }
          },
          {
            label: 'No',
            onClick: () => {
              dispatch(setToastAlert({
                type: 'error',
                message: 'Operation has been cancelled by the user.'
              }));
            }
          }
        ]
      });
    }
  }, [deleteApi]);
  
  return null;
  
};

export default DeleteModal;