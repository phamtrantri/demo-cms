import React, { useState } from 'react';
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
import Table from 'components/Table/Table.js';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles({ ...styles });

function LogActiveCard(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Nhật ký hoạt động</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={['STT', 'Người dùng', 'Nội dung', 'Ngày/giờ']}
            tableData={[
              [
                '1',
                'Người dùng 1',
                'Đã thêm mới bác sĩ: PGS.TS. Trần Cao Bính',
                '01/01/2020 10:55'
              ],
              [
                '2',
                'Người dùng 1',
                'Đã thêm mới bác sĩ: PGS.TS. BSCK II Phạm Hoàng Tuấn',
                '01/01/2020 10:47'
              ],
              [
                '3',
                'Người dùng 1',
                'Đã thêm mới bác sĩ: TS.BS. Đàm Văn Việt',
                '01/01/2020 10:38'
              ],
              [
                '4',
                'Người dùng 1',
                'Đã thêm mới bác sĩ: ThS.BS. Nguyễn Thị Vân Anh',
                '01/01/2020 10:29'
              ],
              [
                '5',
                'Người dùng 1',
                'Đã thêm mới bác sĩ: ThS.BSCKII. Phạm Thị Kim Hoa',
                '01/01/2020 10:20'
              ]
            ]}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default LogActiveCard;
