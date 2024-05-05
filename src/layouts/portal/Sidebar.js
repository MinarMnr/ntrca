import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  Badge,
  Button,
  Image,
  Nav,
  Navbar,
} from "@themesberg/react-bootstrap";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import SimpleBar from "simplebar-react";
import {
  adminNav,
  applicantNav,
  banbeisInstituteNav,
  teacherNav,
  reviewerNav,
} from "../../navs";
// import ReactHero from "../../@core/assets/img/technologies/react-hero-logo.svg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactHero from "../../@core/assets/img/technologies/ntrca_logo.png";
import UserRole from "../../constants/UserRole";
import { AuthUser } from "../../helpers/AuthUser";
import { clearState } from "../../reducers/apiSlice";
import "./sidebar.css";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const showClass = show ? "show" : "";
  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    //const defaultKey = pathname.indexOf(children) !== -1 ? eventKey : "";
    let defaultKey = "";
    children.map((item, index) => {
      if (item.props.link === pathname) {
        defaultKey = eventKey;
      }
    });
    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center sidemenuicon"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text ">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };
  const CollapsableNavItemNode = (props) => {
    const { eventKey, title, icon, children = null } = props;
    //const defaultKey = pathname.indexOf(children) !== -1 ? eventKey : "";
    let defaultKey = "";
    children.map((item, index) => {
      if (item.props.link === pathname) {
        defaultKey = eventKey;
      }
    });
    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center "
            // sidemenuicon
          >
            <span>
              {/* <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span> */}
              <span className="sidebar-text ">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body>
            <Nav className="flex-column pl-10">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item
        className={navItemClassName}
        onClick={() => {
          setShow(true);
        }}
      >
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                // src={image}
                width={20}
                height={20}
                // className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text ">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  let navs = applicantNav || [];

  if (AuthUser.isExpired() >= 0 && AuthUser.isLooggedIn()) {
    let roles = AuthUser.getRoles();
    if (roles.includes(UserRole.ADMIN)) {
      navs = adminNav;
    } else if (
      roles.includes(UserRole.INSTITUTE_HEAD) ||
      roles.includes(UserRole.INSTITUTE_ADMIN)
    ) {
      navs = banbeisInstituteNav;
      // } else if (roles.includes(UserRole.TEACHER)) {
      //   navs = teacherNav;
    } else if (roles.includes(UserRole.DEO) || roles.includes(UserRole.USEO)) {
      navs = reviewerNav;
    } else {
      navs = applicantNav;
    }
  } else {
    AuthUser.removeLoginData();

    dispatch(
      clearState({
        output: "authData",
      })
    );

    history.push("/login");
  }

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand className="me-lg-5" as={Link} to="/">
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primaryblue text-white`}
        >
          <div className="sidebar-inner  pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center"></div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0 side-Logo-link">
              {/* <NavItem title="BANBEIS " link="/" className="logo"  image={ReactHero}/> */}
              <Link to="/">
                <div
                  id="banbeis_home"
                  className="d-flex justify-content-center text-primary align-items-center p-5"
                >
                  <Image src={ReactHero} width={22} height={22} />
                  <span className="text-primary text-uppercase fw-bold">
                    NTRCA
                  </span>
                </div>
              </Link>
              {navs.map((nav, navIndex) => {
                if (nav.children !== undefined && nav.children.length) {
                  return (
                    <CollapsableNavItem
                      key={navIndex}
                      eventKey={nav.path}
                      title={nav.title}
                      icon={nav.icon}
                    >
                      {nav.children.map((navChild, navChildIndex) => {
                        if (
                          navChild.children !== undefined &&
                          navChild.children.length
                        ) {
                          return (
                            <CollapsableNavItemNode
                              key={navChildIndex}
                              eventKey={navChild.path}
                              title={navChild.title}
                              icon={navChild.icon}
                            >
                              {navChild.children.map(
                                (navChildNode, navChildNodeIndex) => {
                                  return (
                                    <NavItem
                                      key={navChildNodeIndex}
                                      title={navChildNode.title}
                                      link={navChildNode.path}
                                      // icon={navChildNode.icon}
                                    />
                                  );
                                }
                              )}
                            </CollapsableNavItemNode>
                          );
                        } else {
                          return (
                            <NavItem
                              key={navChildIndex}
                              title={navChild.title}
                              link={navChild.path}
                              // icon={navChild.icon}
                            />
                          );
                        }
                      })}
                    </CollapsableNavItem>
                  );
                } else {
                  return (
                    <NavItem
                      key={navIndex}
                      title={nav.title}
                      icon={nav.icon}
                      link={nav.path}
                    />
                  );
                }
              })}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
