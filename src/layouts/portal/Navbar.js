import {
  faBars,
  faBell,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Container,
  Dropdown,
  Image,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "@themesberg/react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Environment from "../../components/environments/environment";
import { AuthUser } from "../../helpers/AuthUser";
import { callApi, clearState, selectApi } from "../../reducers/apiSlice";
import Profile3 from "../../@core/assets/img/team/admin.jpeg";
import UserRole from "constants/UserRole";
import NotificationData from "../../helpers/NotificationData";
import Notification from "helpers/UserNotification";
import { UrlBuilder } from "helpers/UrlBuilder";

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //file url make
  const getFile = (imgs) => {
    return Environment.fileBaseUrl + imgs;
  };

  let { onToggleFun, toggle } = props;

  const [check, setCheck] = useState(false);
  const {
    loading,
    notifyData = { data: {} },
    notificationUpdate,
  } = useSelector(selectApi);

  const onToggleFun2 = () => {
    onToggleFun();
  };

  useEffect(() => {
    dispatch(
      callApi({
        operationId: UrlBuilder.notificationClientApi(
          `notification-event/notifications/${AuthUser.getUserId()}?size=5&appModuleId=13`
        ),
        output: "notifyData",
        storeName: "notifyData",
      })
    );
  }, [notificationUpdate]);

  var notifications = notifyData?.data;

  const logoutUser = () => {
    AuthUser.removeLoginData();

    dispatch(
      clearState({
        output: "authData",
      })
    );

    history.push("/login");
  };

  const getNameBasedOnRole = () => {
    var roles = AuthUser.getRoles();
    var name = AuthUser.getUserName();
    if (
      roles.includes(UserRole.INSTITUTE_HEAD) ||
      roles.includes(UserRole.INSTITUTE_ADMIN)
    ) {
      name = AuthUser.getInstituteName() + " " + `[${AuthUser.getUserName()}]`;
    } else if (roles.includes(UserRole.TEACHER)) {
      name = AuthUser.getUserFullName();
    } else {
      name = AuthUser.getUserName();
    }
    return name;
  };

  // useEffect(() => {
  //   if (!check && toggle) {
  //     onToggleFun2();
  //     setCheck(true);
  //   }
  //   if (check && !toggle) {
  //     onToggleFun2();
  //     setCheck(false);
  //   }
  // }, [check, toggle]);

  // const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  // const areNotificationsRead = notifications.reduce(
  //   (acc, notification) => acc && notification.read,
  //   true
  // );

  let notificationCount = notifyData?.meta?.unreadNotifications;
  if (notificationUpdate && notificationUpdate.status == "success") {
    notificationCount =
      notificationUpdate && notificationUpdate?.meta?.unreadNotifications;
  }

  // useEffect(() => {
  // 	const socket = io(UrlBuilder.socketClientApi());
  // 	socket.on("MESSAGE_REQUEST_ACCEPTED", data => {

  // 		const parseData = JSON.parse(data);
  // 		//setResponse(data);
  // 		setNotifications([{
  // 			"id": 10,
  // 			"read": false,
  // 			"image": "",
  // 			"sender": "Jose Leos",
  // 			"time": "a few moments ago",
  // 			"link": "#",
  // 			"message": `${parseData.actionName}`
  // 		}])
  // 	});

  // 	// CLEAN UP THE EFFECT
  // 	return () => socket.disconnect();
  // 	//
  // }, [io]);

  // const markNotificationsAsRead = () => {
  //   setTimeout(() => {
  //     setNotifications(notifications.map((n) => ({ ...n, read: true })));
  //   }, 300);
  // };

  return (
    <Navbar variant="dark" expanded className="p-5 pr-30 bg-white">
      <Container fluid className="px-0">
        <div className="toogleBtn ml-15">
          <FontAwesomeIcon
            className="toggleSvg"
            icon={faBars}
            onClick={onToggleFun2}
          />
        </div>
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            {/*<Form className="navbar-search">
						  <Form.Group id="topbarSearch">
						    <InputGroup className="input-group-merge search-bar">
						      <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
						      <Form.Control type="text" placeholder="Search"/>
						    </InputGroup>
						  </Form.Group>
						</Form>*/}
            <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
              <span className="mb-0 font-bold fw-bold">
                {AuthUser?.getUserInstitute()?.instituteName}
              </span>
            </div>
          </div>
          <Nav>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                className="text-dark icon-notifications me-lg-3"
              >
                {notificationCount > 0 ? (
                  <span className="icon icon-sm">
                    <FontAwesomeIcon
                      icon={faBell}
                      className="bell-shake mr-6"
                    />

                    <span className="position-absolute top-1 ml-0 start-100 translate-middle badge rounded-pill bg-danger fs-6">
                      {notificationCount}
                    </span>

                    {/* {notifyData?.meta?.unreadNotifications >0 ? <span className="icon-badge rounded-circle unread-notifications">
                  {notifyData?.meta?.unreadNotifications}
                    </span> :null } */}
                  </span>
                ) : (
                  <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faBell} className="bell-shake " />
                  </span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <ListGroup
                  className="list-group-flush"
                  style={{ maxHeight: "400px", overflow: "auto" }}
                >
                  {" "}
                  {/* overflow: "scroll" */}
                  <Nav.Link
                    href="#"
                    className="text-center text-primary fw-bold border-bottom border-light py-3 nav-bar_fontsize"
                    style={{ display: "block" }}
                  >
                    Notifications
                  </Nav.Link>
                  {notifications &&
                    notifications.length > 0 &&
                    notifications.map((n) => (
                      <Notification key={`notification-${n.id}`} {...n} />
                    ))}
                  {/* <Dropdown.Item
                    className="text-center text-primary fw-bold py-3"
                    onClick={() => {
                      history.push("/portal/notification/list");
                    }}
                  >
                    View all
                  </Dropdown.Item> */}
                </ListGroup>
                <div
                  className="text-center text-primary fw-bold py-3 nav-bar_fontsize"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/portal/notification/list");
                  }}
                >
                  View all
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item} className="">
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    // src={getFile(AuthUser.getUser().profileImage)}
                    src={Profile3}
                    className="user-avatar md-avatar rounded-circle"
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">
                      {getNameBasedOnRole()}
                    </span>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={() => logoutUser()}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-danger me-2"
                  />{" "}
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
      <NotificationData />
    </Navbar>
  );
};
