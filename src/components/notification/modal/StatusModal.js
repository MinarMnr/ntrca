import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {confirmAlert} from 'react-confirm-alert';
import {selectStatusModal, setStatusModal} from "../../../reducers/statusModalSlice";
import {callApi} from "../../../reducers/apiSlice";
import {setToastAlert} from "../../../reducers/toastAlertSlice";

import 'react-confirm-alert/src/react-confirm-alert.css';

const StatusModal = (props) => {
  
  const dispatch = useDispatch();
  
  const {title, message, statusApi} = useSelector(selectStatusModal);
  
  useEffect(() => {
    if (statusApi !== undefined && statusApi !== '') {
      confirmAlert({
        title,
        message,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              dispatch(callApi({
                operationId: statusApi,
                parameters: {
                  method: 'PUT'
                }
              }));
              dispatch(setStatusModal({
                statusApi: ''
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
  }, [statusApi]);
  
  return null;
  
};

export default StatusModal;