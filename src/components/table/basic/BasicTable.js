import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  InputGroup,
  Nav,
  Row,
  Table,
} from "@themesberg/react-bootstrap";
import Pagination from "react-js-pagination";
// import AccordionComponent from "../../accordion/AccordionComponent";
import "./BasicTable.scss";
// import { Button } from "bootstrap";
// import { useDispatch } from "react-redux";

const BasicTable = (props) => {
  const {
    headers,
    perPage,
    totalData,
    onSizeChange,
    onSearchChange,
    meta,
    onPageChange,
    children,
    type,
    onAllSelect,
    flag,
    isTableCustomStyle = false,
    customStyle,
    searchOption = true,
    sizeOption = true,
  } = props;

  const [searchKeyValue, setSearchKeyValue] = useState("");

  const onSearchKeyValue = (val) => {
    return onSearchChange(val);
  };

  const onChangeKey = (e) => {
    setSearchKeyValue(e.target.value);
  };

  const onSizeChangeDown = (value) => {
    return onSizeChange(value);
  };

  const allSelect = (e) => {
    return onAllSelect(e);
  };

  return (
    <>
      <Card border="white" className="table-wrapper ">
        <Card.Body>
          <div className="table-settings d-block mb-5">
            <Row className="justify-content-between align-items-center">
              {searchOption === true && (
                <Col xs={12} sm={10} md={10} lg={8} xl={6}>
                  <InputGroup style={{ width: "60%", display: "inline-flex" }}>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      onChange={(e) =>
                        //   onChangeKey(e) }
                        setSearchKeyValue(e.target.value)
                      }
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                          onSearchKeyValue(searchKeyValue);
                        }
                      }}
                    />
                  </InputGroup>
                  <div
                    style={{
                      width: " 30%",
                      display: " inline-flex",
                      margin: "8px",
                    }}
                  >
                    <button
                      className="form-control btn btn-primary"
                      onClick={() => onSearchKeyValue(searchKeyValue)}
                    >
                      Search
                    </button>
                  </div>
                </Col>
              )}

              {flag === undefined && sizeOption === true && (
                <Col
                  xs={4}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={1}
                  className="ps-md-0 text-end"
                >
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Select
                        onChange={(e) => onSizeChangeDown(e.target.value)}
                      >
                        {perPage.map((size, index) => (
                          <option value={size} key={index}>
                            {size}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Col>
              )}
            </Row>
          </div>
          <div
            className="table-responsive"
            style={isTableCustomStyle ? customStyle : {}}
          >
            <Table
              striped
              hover
              className="user-table align-items-center text-center"
            >
              <thead>
                <tr>
                  {type !== undefined && (
                    <th style={{ textDecoration: "none" }}>
                      <input
                        type="checkbox"
                        className="d-inline mr-4"
                        onClick={allSelect}
                      />
                      <label> All</label>
                    </th>
                  )}

                  {headers.map((header, headerIndex) => {
                    if (header.width !== undefined) {
                      return (
                        <th
                          key={headerIndex}
                          className="border-bottom"
                          style={{ width: "100px" }}
                        >
                          {header.label} <FontAwesomeIcon icon={faSort} />
                        </th>
                      );
                    } else {
                      return (
                        <th key={headerIndex} className="border-bottom">
                          {header.label} <FontAwesomeIcon icon={faSort} />
                        </th>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody style={{ minHeight: "540px !important" }}>
                {children}
              </tbody>
            </Table>
          </div>
          {flag === undefined && (
            <Card.Footer className="px-0 border-0 d-lg-flex align-items-center justify-content-between pb-0">
              <Nav>
                <Pagination
                  innerClass="pagination"
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={meta.currentPage}
                  itemsCountPerPage={meta.size}
                  totalItemsCount={meta.total}
                  pageRangeDisplayed={10}
                  onChange={(page) => {
                    onPageChange(page);
                  }}
                ></Pagination>
              </Nav>
              <small className="fw-bold">
                Showing{" "}
                <b>
                  {meta.size > meta.total
                    ? meta.total
                    : totalData >= meta.size
                    ? totalData * meta.currentPage
                    : meta.size * meta.currentPage - (meta.size - totalData)}
                </b>{" "}
                out of <b>{meta.total}</b> entries
              </small>
            </Card.Footer>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default BasicTable;
