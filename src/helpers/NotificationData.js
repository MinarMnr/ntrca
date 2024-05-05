import React, { useEffect, useState } from "react";
import { AuthUser } from "helpers/AuthUser";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi, setState } from "../reducers/apiSlice";
import { UrlBuilder } from "./UrlBuilder";
import { setToastAlert } from "../reducers/toastAlertSlice";
import { clearState } from "../reducers/apiSlice";

const NotificationData = () => {
  const [socketId, setSocketId] = useState("0");
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { loading, notifyData = { data: {} } } = useSelector(selectApi);

  useEffect(() => {
    dispatch(
      callApi({
        operationId: UrlBuilder.notificationClientApi(
          `notification-event/notifications/${AuthUser.getUserId()}?appModuleId=13`
        ),
        output: "notifyData",
      })
    );
  }, [socketId]);

  useEffect(() => {
    if (socket === null) {
      setSocket(io("http://103.4.145.250:5000"));
    }

    if (socket) {
      // subscribe to socket events

      socket.on("MESSAGE_REQUEST_ACCEPTED", async (data) => {
        // NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        if (JSON.parse(data).isPushNotification) {
          let notificationMessageData = await JSON.parse(data);

          let eventLen =
            notificationMessageData?.notificationEventForList.length;
          for (let i = 0; i < eventLen; i++) {
            if (
              AuthUser.getUserId() ==
              notificationMessageData?.notificationEventForList[i]
                ?.notifyForKcUserId
            ) {
              // dispatch(
              //   setToastAlert({
              //     type: "info",
              //     message: notificationMessageData.notificationEventMessage,
              //     //JSON.parse(data).notificationMessageEvent,
              //   })
              // );
            }
          }

          // <ToastContainer />
          setSocketId(data.id);
        }
      });

      socket.on("SEND_NOTIFICATION", (data) => {
        setSocketId(data.id);

        // toast("⛄ Wow so easy!", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   type: "info",
        //   theme: "light",
        // });
      });
    }

    //socket.off("SEND_NOTIFICATION");
  }, [socket]);

  return <>{/* <ToastContainer /> */}</>;
};

export default NotificationData;
