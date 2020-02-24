import React, { useState, useEffect } from 'react';
// react plugin for creating charts
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';

import ViewCard from './components/View';
import RegistrationCard from './components/Registration';
import RevenueCard from './components/Revenue';
import RevenueServiceCard from './components/RevenueService';
import LogActiveCard from './components/LogActive';
import VideoCard from './components/Video';

import axios from 'axios';
import configs from '../../configs';
import { getItem } from 'utils/storage';
import { formatCurrency, formaNumber } from 'utils/format';
import { client } from '../../services/client';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const userStyles = {
  card_p: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  card_h3: {
    fontSize: 20,
    fontWeight: 'bold'
  }
};

const useStyles = makeStyles({ ...styles, ...userStyles });

export default function Dashboard() {
  const classes = useStyles();

  const [totalView, handleTotalView] = useState(0);
  const [totalRegistration, handleTotalRegistration] = useState(0);
  const [totalRevenue, handleTotalRevenue] = useState(0);
  const [totalContact, handleTotalContact] = useState(0);

  useEffect(() => {
    axios
      .all([
        client.get(`/analytic/page-views`),
        client.get(`/registrations/count?is_verified=1`),
        client.get(`/registrations/statistic/total-revenue`),
        client.get(`/contacts/count?status=1`)
      ])
      .then(
        axios.spread((resView, resRegistrations, resRevenue, resContacts) => {
          let views = resView.success ? resView.payload.data : 0;
          let registrations = resRegistrations.payload.data;
          let revenues = resRevenue.payload.data;
          let contacts = resContacts.payload.data;

          handleTotalView(views);
          handleTotalRegistration(registrations);
          handleTotalRevenue(revenues);
          handleTotalContact(contacts);
        })
      )
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.cardBackground_1}>
            <CardHeader stats icon>
              <p className={classes.card_p}>Tổng lượt truy cập</p>
              <h3 className={classes.card_h3}>{formaNumber(totalView, 0)}</h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.cardBackground_2}>
            <CardHeader color="warning" stats icon>
              <p className={classes.card_p}>Tổng đăng ký khám</p>
              <h3 className={classes.card_h3}>
                {formaNumber(totalRegistration, 0)}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.cardBackground_3}>
            <CardHeader color="warning" stats icon>
              <p className={classes.card_p}>Doanh thu</p>
              <h3 className={classes.card_h3}>
                {formatCurrency(totalRevenue, 'VND', '0')}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.cardBackground_5}>
            <CardHeader color="warning" stats icon>
              <p className={classes.card_p}>Tổng khách hàng góp ý</p>
              <h3 className={classes.card_h3}>
                {formaNumber(totalContact, 0)}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <ViewCard />
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <RegistrationCard />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <RevenueCard />
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <RevenueServiceCard />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <VideoCard />
        </GridItem>
      </GridContainer>
    </div>
  );
}
