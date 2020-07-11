import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import UpdateIcon from 'mdi-react/UpdateIcon';
import CheckboxMarkedCircleIcon from 'mdi-react/CheckboxMarkedCircleIcon';

const ComingSoon = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="email-confirmation">
          <div className="email-confirmation__icon">
            <UpdateIcon className="email-confirmation__mail" />
            <CheckboxMarkedCircleIcon className="email-confirmation__check" />
          </div>
          <h3 className="email-confirmation__title">Current page is under development</h3>
          <p className="email-confirmation__sub">Thank you for choosing the Sharee</p>
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default ComingSoon;
