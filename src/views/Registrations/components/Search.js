import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@material-ui/core';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import moment from 'moment';
import {
  COMMON_STATUS,
  REGISTRATION_T_STATUS,
  REGISTRATION_STATUS,
  REGISTRATION_IS_VERIFIED_T
} from '../../../constants/index';

function RegistrationSearch(props) {
  const { t } = useTranslation();

  let { params, getList, fromDate, toDate } = props;

  return (
    <GridContainer>
      <GridItem md={4} sm={6} xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={e => getList(params)}
        >
          Làm mới
        </Button>
      </GridItem>
      <GridItem md={8} sm={6} xs={12}>
        <p style={{ textAlign: 'right', marginTop: '0px' }}>
          {fromDate && toDate ? (
            <>
              <span>Ngày đăng ký: </span>
              <span style={{ fontWeight: 700 }}>
                {moment(fromDate).format('DD/MM/YYYY')} -
                {moment(toDate).format('DD/MM/YYYY')}
              </span>
              ,
            </>
          ) : (
            ''
          )}
          {params.status ? (
            <>
              <span> Trạng thái: </span>
              <span style={{ fontWeight: 700 }}>
                {params.status == '-1'
                  ? 'Tất cả'
                  : REGISTRATION_STATUS[params.status]}
              </span>
              ,
            </>
          ) : (
            ''
          )}
          {params.status ? (
            <>
              <span> Đã kích hoạt: </span>
              <span style={{ fontWeight: 700 }}>
                {params.is_verified == '-1'
                  ? 'Tất cả'
                  : params.is_verified
                  ? 'Có'
                  : 'Không'}
              </span>
            </>
          ) : (
            ''
          )}
        </p>
      </GridItem>
    </GridContainer>
  );
}

export default RegistrationSearch;
