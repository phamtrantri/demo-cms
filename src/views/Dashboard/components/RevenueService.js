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
import { Chart } from 'react-google-charts';
import moment from 'moment';
import axios from 'axios';
import configs from '../../../configs';
import { getItem } from 'utils/storage';
import { client } from '../../../services/client';

const useStyles = makeStyles({ ...styles });

function RevenueServiceCard(props) {
  const { t } = useTranslation();

  const classes = useStyles();

  const [options, handleOptions] = useState(dailySalesChart.options);
  const [revenue, handleRevenue] = useState({});
  const [selectedFromDate, handleFromDateChange] = useState(
    moment().subtract(7, 'd')
  );
  const [selectedToDate, handleToDateChange] = useState(moment());

  const getRevenue = (from_date, to_date) => {
    return client.get(
      `/registrations/statistic/revenue-group-by-service?is_verified=1&from_date=${from_date}&to_date=${to_date}`
    );
  };

  useEffect(() => {
    let from_date = selectedFromDate
      ? selectedFromDate.format('YYYY-MM-DD')
      : null;
    let to_date = selectedToDate ? selectedToDate.format('YYYY-MM-DD') : null;

    if (from_date && to_date) {
      getRevenue(from_date, to_date).then(res => {
        let obj = { labels: [], series: [] };
        for (let i in res.payload) {
          obj.labels.push(i);
          obj.series.push(res.payload[i]);
        }
        let max = Math.max(...obj.series);
        let options = dailySalesChart.options;

        options = {
          ...dailySalesChart.options,
          high: max + (max * 10) / 100
        };

        handleOptions(options);
        handleRevenue(obj);
      });
    }
  }, [selectedFromDate, selectedToDate]);
  return (
    <>
      <Card chart>
        <CardHeader className={classes.cardBackground_4}>
          {revenue && options ? (
            <ChartistGraph
              className="ct-chart"
              data={revenue}
              type="Pie"
              options={{
                labelInterpolationFnc: function(value) {
                  return value;
                },
                height: 300,
                labelOffset: 75
              }}
            />
          ) : (
            ''
          )}
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Chi tiết doanh thu dịch vụ</h4>
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

export default RevenueServiceCard;
