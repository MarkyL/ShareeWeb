/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { Badge, Card, CardBody, Col, Button, Collapse } from 'reactstrap';

export default class AlertComponent extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      collapse: props.collapsed ? false : true,
    };
  }

  onCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const {
      md, lg, xl, sm, xs, title, label, subhead, before, panelClass,
    } = this.props;

    const hidingButtonColor = this.state.collapse ? "secondary" : "primary";
    const hidingButtonText = this.state.collapse ? `לסגור תוצאות ${title}` : `להציג תוצאות ${title}`;

    return (
      <Col md={md} lg={lg} xl={xl} sm={sm} xs={xs}>
        <Card className = {`panel ${this.state.collapse ? '' : ' panel--collapse'} ${panelClass}`}>
          <CardBody className="panel__body">

            <div className="panel__title" style={{ display: "flex"}}>
              <Button size="sm" color={hidingButtonColor} onClick={this.onCollapse}>{hidingButtonText}</Button>
              <Badge className="panel__label">{label}</Badge>
              <h5 className="subhead">{subhead}</h5>
            </div>

            <Collapse isOpen={this.state.collapse}>
              <div className="panel__content">
                {this.props.children}
              </div>
            </Collapse>

          </CardBody>
        </Card>
        {before}
      </Col>
    );
  }
}

export const PanelTitle = ({ title }) => (
  <div className="panel__title">
    <h5 className="bold-text">
      {title}
    </h5>
  </div>
);
