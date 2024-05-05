import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Card, Col, Form, InputGroup, Nav, Row, Table,Button} from "@themesberg/react-bootstrap";
import Pagination from "react-js-pagination";

import './BasicTable.scss'

const BasicTable = (props) => {
  const [searchVal,setSearchVal] = React.useState();
  const {headers, perPage, onSearchChange, onSizeChange, meta, onPageChange, children} = props;
  
  const onSearchKeyDown = (value) => {
    setSearchVal(value);
  };
  
  const findVal=(e)=>{
    e.preventDefault();
    return onSearchChange(searchVal);
  };
  
  return (
    <>
      <Card border="white" className="table-wrapper ">
        <Card.Body>
          <div className="table-settings d-block mb-15">
            <Row className="justify-content-between align-items-center">
              <Col xs={8} md={6} lg={4} xl={6}>
                <Form onSubmit={findVal}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch}/>
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Input Tracking Number"
                                    onChange={e => onSearchKeyDown(e.target.value)}/>
                      <Button variant="primary" type="submit">
                        Search
                      </Button>
                    </InputGroup>
                </Form>
              </Col>
              <Col xs={4} md={4} lg={2} xl={2} className="ps-md-0 text-end">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch}/>
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Program Title Or Name"
                                onChange={e => onSearchKeyDown(e.target.value)}/>
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </div>
          <Table responsive striped hover className="user-table align-items-center">
            <thead>
            <tr >
              {headers.map((header, headerIndex) => {
                if (header.width !== undefined) {
                  return <th key={headerIndex} className="border-bottom"
                             style={{width: '100px'}}>{header.label}</th>;
                } else {
                  return <th key={headerIndex} className="border-bottom">{header.label}</th>
                }
              })}
            </tr>
            </thead>
            <tbody style={{minHeight: '540px !important'}}>
            {children}
            </tbody>
          </Table>
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
                onChange={(page) => onPageChange(page)}
              />
            </Nav>
            <small className="fw-bold">
              Showing <b>{(meta.size > meta.total) ? meta.total : meta.size}</b> out
              of <b>{meta.total}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  )
  
};

export default BasicTable;