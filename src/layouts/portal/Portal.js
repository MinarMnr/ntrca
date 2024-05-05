import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Content from "./Content";
import {
  selectToastAlert,
  setToastAlert,
} from "../../reducers/toastAlertSlice";
import {
  selectDeleteModal,
  setDeleteModal,
} from "../../reducers/deleteModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, ToastAlert } from "../../components/notification";
import { setErrorMessage } from "../../reducers/errorMessageSlice";
import { UrlBuilder } from "../../helpers/UrlBuilder";
import "./Portal.scss";
// import { io } from "socket.io-client";
import { callApi, selectApi } from "../../reducers/apiSlice";

const Portal = () => {
  const dispatch = useDispatch();

  const { type } = useSelector(selectToastAlert);
  const { deleteApi } = useSelector(selectDeleteModal);
  const { toggle } = useSelector(selectApi);

  useEffect(() => {
    dispatch(
      setToastAlert({
        type: "",
        message: "",
      })
    );

    dispatch(
      setDeleteModal({
        title: "",
        message: "",
      })
    );
  }, [type, deleteApi]);

  useEffect(() => {
    dispatch(
      setErrorMessage({
        errors: "",
      })
    );
  });

  // useEffect(() => {
  //   const socket = io(UrlBuilder.socketClientApi());
  //   socket.on("SEND_NOTIFICATION", data => {

  //     //setResponse(data);
  //   });

  //   // CLEAN UP THE EFFECT
  //   return () => socket.disconnect();
  //   //
  // }, []);

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div
        className={isActive ? "sidebar-expand" : null}
        // style={{ backgroundColor: "blue" }}
      >
        <Sidebar />
      </div>
      <main className={isActive ? "content-hide" : "content"}>
        <Navbar onToggleFun={() => toggleClass()} />
        {/* toggle={toggle} */}
        <Content />
        {/*<Footer />*/}
      </main>
      <ToastAlert />
      <DeleteModal />
    </>
  );
};

export default Portal;
