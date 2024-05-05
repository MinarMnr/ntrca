import React from 'react'
import { Button, Col, Row, Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from 'components/card';

const smsTemplate = () => {
  return (
    <DefaultCard title="এসএমএস টেমপ্লেট">
      <Row>
        <Col md={3}></Col>
        <Col md={6} className='pt-40 pb-40'>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Row >

                    <span className='text-light fw-bold bg-success text-center'><h4 className='pt-10'>পুলিশ ভেরিফিকেশনের জন্য কল করুন</h4></span>


                    <span>লরেম ইপ্সাম হল মুদ্রণ এবং টাইপসেটিং শিল্পের ডামি পাঠ্য। লোরেম ইপসাম 1500 এর দশক থেকে শিল্পের মানক ডামি পাঠ্য,</span>

                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={3}></Col>
      </Row >
    </DefaultCard >
  )
}

export default smsTemplate