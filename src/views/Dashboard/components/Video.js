import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { info } from 'reducers';
import { createStructuredSelector, createSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

const useStyles = makeStyles({ ...styles });

function LogActiveCard(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const { dataInfo, getInfo } = props;

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <>
      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Video hướng dẫn </h4>
        </CardHeader>
        <CardBody>
          {dataInfo ? (
            <iframe
              width="100%"
              height="305"
              src={
                dataInfo.video_guide
                  ? dataInfo.video_guide
                  : 'https://www.youtube.com/embed/D0OEvhpCXRc'
              }
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            ''
          )}
        </CardBody>
      </Card>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  dataInfo: info.selectors.data
});

const mapDispatchToProps = {
  getInfo: info.actions.getInfoAjax
};

const enhancers = [connect(mapStateToProps, mapDispatchToProps)];
export default compose(...enhancers)(LogActiveCard);
