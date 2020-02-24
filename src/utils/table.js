import React, { forwardRef } from 'react';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { INACTIVE_STATUS } from '../constants/index';

import { from } from 'seamless-immutable';

export const tableConstants = {
  options: {
    actionsColumnIndex: 20,
    showTitle: false,
    columnsButton: true,
    exportButton: true,
    exportAllData: true,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 20, 50, 100],
    pageSize: 10,
    headerStyle: {
      fontSize: '0.875rem',
      verticalAlign: 'bottom',
      backgroundColor: '#168bf1',
      padding: '14px 0px 14px 16px',
      color: '#fff'
    },
    rowStyle: (data, index) => {
      // check article
      if (data.body) {
        if (data.status == INACTIVE_STATUS) {
          return { backgroundColor: '#eeeeee' };
        }
        if (data.status == 3) {
          return { backgroundColor: '#f7ecdd' };
        }
      }

      if (!data.is_verified) {
        if (data.status == INACTIVE_STATUS) {
          return { backgroundColor: '#f7ecdd' };
        }
      }
    }
  },
  localization: {
    body: {
      emptyDataSourceMessage: 'Không có dữ liệu'
    },
    header: {
      actions: ''
    },
    pagination: {
      labelDisplayedRows: '{from}-{to} của {count}',
      labelRowsSelect: 'hàng',
      firstTooltip: 'Trang đầu',
      previousTooltip: 'Trang trước',
      nextTooltip: 'Trang sau',
      lastTooltip: 'Trang cuối'
    },
    toolbar: {
      addRemoveColumns: 'Chọn cột hiển thị',
      showColumnsTitle: 'Danh sách cột',
      showColumnsAriaLabel: 'Danh sách cột',
      exportTitle: 'Xuất file',
      exportName: 'Xuất file CSV',
      searchTooltip: 'Tìm kiếm',
      searchPlaceholder: 'Tìm kiếm'
    }
  },
  icons: {
    SortArrow: forwardRef((props, ref) => (
      <ArrowUpward {...props} fontSize="small" ref={ref} />
    ))
  }
};
