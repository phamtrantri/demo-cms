import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from 'variables/charts.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import FilterSelect from 'components/CustomFilter/Select';
import FilterDate from 'components/CustomFilter/Date';
import moment from 'moment';

import axios from 'axios';
import configs from '../../../configs';
import { getItem } from 'utils/storage';
import { client } from '../../../services/client';

const useStyles = makeStyles({ ...styles });

function RegistrationCard(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const [options, handleOptions] = useState(dailySalesChart.options);
  const [registrations, handleRegistrations] = useState({});
  const [selectedFromDate, handleFromDateChange] = useState(
    moment().subtract(7, 'd')
  );
  const [selectedToDate, handleToDateChange] = useState(moment());

  const getRegistrations = (from_date, to_date) => {
    return client.get(
      `/registrations/statistic/total-registration-group-by-date?from_date=${from_date}&to_date=${to_date}`
    );
  };

  useEffect(() => {
    let from_date = selectedFromDate
      ? selectedFromDate.format('YYYY-MM-DD')
      : null;
    let to_date = selectedToDate ? selectedToDate.format('YYYY-MM-DD') : null;

    if (from_date && to_date) {
      getRegistrations(from_date, to_date).then(res => {
        let obj = { labels: [], series: [[]] };
        for (let i in res.payload) {
          const date = moment(i).format('DD-MM');
          obj.labels.push(date);
          obj.series[0].push(res.payload[i]);
        }
        let max = Math.max(...obj.series[0]);
        let options = dailySalesChart.options;

        options = {
          ...dailySalesChart.options,
          high: max + (max * 10) / 100
        };

        handleOptions(options);
        handleRegistrations(obj);
      });
    }
  }, [selectedFromDate, selectedToDate]);

  return (
    <>
      <Card chart>
        <CardHeader
          className={classes.cardBackground_2}
          style={{ height: '308px' }}
        >
          {registrations && options ? (
            <ChartistGraph
              className="ct-chart"
              data={registrations}
              type="Line"
              options={options}
              listener={dailySalesChart.animation}
            />
          ) : (
            ''
          )}
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Chi tiết lượt đăng ký khám</h4>
        </CardBody>
        <CardFooter chart>
          <GridContainer>
            <GridItem md={6} sm={6} xs={12}>
              <FilterDate
                label={'Từ ngày'}
                value={selectedFromDate}
                onChangeDate={handleFromDateChange}
                disableFuture={true}
              />
            </GridItem>
            <GridItem md={6} sm={6} xs={12}>
              <FilterDate
                label={'Đến ngày'}
                value={selectedToDate}
                onChangeDate={handleToDateChange}
                disableFuture={true}
              />
            </GridItem>
          </GridContainer>
        </CardFooter>
      </Card>
    </>
  );
}

export default RegistrationCard;
