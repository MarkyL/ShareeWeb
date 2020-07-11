import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const data = [
  {
    name: 'Mon 10/07', Total: 400, Delivered: 380, Failed: 20, Unknown: 0,
  },
  {
    name: 'Tue 11/07', Total: 255, Delivered: 250, Failed: 5, Unknown: 0,
  },
  {
    name: 'Wed 12/07', Total: 270, Delivered: 240, Failed: 30, Unknown: 10,
  },
  {
    name: 'Thu 13/07', Total: 100, Delivered: 95, Failed: 0, Unknown: 5,
  },
  {
    name: 'Fri 14/07', Total: 95, Delivered: 85, Failed: 10, Unknown: 0,
  },
  {
    name: 'Sat 15/07', Total: 210, Delivered: 150, Failed: 35, Unknown: 25,
  },
  {
    name: 'Sun 16/07', Total: 350, Delivered: 310, Failed: 40, Unknown: 0,
  },
];

const SimpleLineChart = ({ t }) => (
  <Col xs={12} md={12} lg={12} xl={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">{t('charts.recharts.simple_line_chart')}</h5>
        </div>
        <ResponsiveContainer height={200}>
          <LineChart
            data={data}
            margin={{
             top: 0, right: 0, left: -15, bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Total" stroke="#349eeb" />
            <Line type="monotone" dataKey="Delivered" stroke="#2cc755" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Failed" stroke="#e32727" activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Unknown" stroke="#969393" activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  </Col>
);

SimpleLineChart.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(SimpleLineChart);
