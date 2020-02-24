/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// css
import 'assets/css/material-dashboard-react.css?v=1.8.0';
import 'assets/css/custom.css';

// i18n
import './i18n';

// moment
import moment from 'moment';
import 'moment/locale/vi';

// yup
import { setLocale } from 'yup';

moment.locale('vi');

moment.updateLocale('vi', {
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthsShort: [
    'Th 01',
    'Th 02',
    'Th 03',
    'Th 04',
    'Th 05',
    'Th 06',
    'Th 07',
    'Th 08',
    'Th 09',
    'Th 10',
    'Th 11',
    'Th 12'
  ]
});

setLocale({
  mixed: {
    required: 'Trường này không được để trống',
    isType: 'abc',
    notType: function notType(_ref) {
      switch (_ref.type) {
        case 'number':
          return 'Chỉ được nhập số';
        case 'string':
          return 'Not a string error or any other custom error message';
        default:
          return 'Wrong type error or any other custom error message';
      }
    }
  },
  string: {
    required: 'Trường này không được để trống',
    email: 'Email không đúng định dạng',
    min: 'Ít nhất ${min} ký tự',
    max: 'Nhiều nhất ${max} ký tự'
  },
  number: {
    min: 'Không được nhỏ hơn ${min}',
    max: 'Không được lớn hơn ${max}'
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
