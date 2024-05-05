import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faTable,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  Badge,
  Button,
  Image,
  Nav,
  Navbar,
} from "@themesberg/react-bootstrap";
// import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ReactHero from "../assets/img/technologies/bangladesh-govt-logo-A2C7688845-seeklogo.com.png";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export const Sidebar = (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
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
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
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
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to="/"
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            {/* <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title="BANBEIS"
                link="/"
                className="side-Logo-link"
                image={ReactHero}
              />
              <CollapsableNavItem
                eventKey="tables/"
                title="Tables"
                icon={faTable}
              >
                <NavItem title="Bootstrap Table" link="/" />
              </CollapsableNavItem>
            </Nav> */}
            <Nav className="flex-column pt-3 pt-md-0 side-Logo-link">
              {/* <NavItem title="BANBEIS " link="/" className="logo"  image={ReactHero}/> */}
              <Link to="/">
                <div
                  id="banbeis_home"
                  className="d-flex justify-content-center text-primary align-items-center p-5"
                >
                  <Image src={ReactHero} width={22} height={22} />
                  <span className="text-primary text-uppercase fw-bold">
                    Banbeis
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
                      icon={faTable}
                    >
                      {nav.children.map((navChild, navChildIndex) => {
                        return (
                          <NavItem
                            key={navChildIndex}
                            title={navChild.title}
                            link={navChild.path}
                          />
                        );
                      })}
                    </CollapsableNavItem>
                  );
                } else {
                  return (
                    <NavItem
                      key={navIndex}
                      title={nav.title}
                      icon={faCog}
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
