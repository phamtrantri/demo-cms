import {
  successColor,
  warningColor,
  whiteColor,
  grayColor,
  hexToRgb
} from 'assets/jss/material-dashboard-react.js';

const dashboardStyle = {
  successText: {
    color: successColor[0]
  },
  warningText: {
    color: warningColor[0]
  },
  upArrowCardCategory: {
    width: '16px',
    height: '16px'
  },
  cardWidth20: {
    maxWidth: '20%',
    flexBasis: '20%'
  },
  cardBackground_1: {
    marginTop: '0px',
    minHeight: '120px',
    backgroundColor: '#ff5e62',
    background:
      '-webkit-gradient(linear,left top,right top,from(#ff5e62),to(#f96))',
    background: 'linear-gradient(to right,#ff5e62 0,#f96 100%)',
    color: '#fff!important'
  },
  cardBackground_2: {
    marginTop: '0px',
    minHeight: '120px',
    backgroundColor: '#3480eb',
    background:
      '-webkit-gradient(linear,left top,right top,from(#3480eb),to(#80e5ff))',
    background: 'linear-gradient(to right,#3480eb 0,#80e5ff 100%)',
    color: '#fff!important'
  },
  cardBackground_3: {
    marginTop: '0px',
    minHeight: '120px',
    backgroundColor: '#ff0080',
    background:
      '-webkit-gradient(linear,left top,right top,from(#ff0080),to(#ff66b3))',
    background: 'linear-gradient(to right,#ff0080 0,#ff66b3 100%)',
    color: '#fff!important'
  },
  cardBackground_4: {
    marginTop: '0px',
    minHeight: '120px',
    backgroundColor: '#33cc33',
    background:
      '-webkit-gradient(linear,left top,right top,from(#33cc33),to(#70db70))',
    background: 'linear-gradient(to right,#33cc33 0,#70db70 100%)',
    color: '#fff!important'
  },
  cardBackground_5: {
    marginTop: '0px',
    minHeight: '120px',
    backgroundColor: '#e6b800',
    background:
      '-webkit-gradient(linear,left top,right top,from(#e6b800),to(#ffd11a))',
    background: 'linear-gradient(to right,#e6b800 0,#ffd11a 100%)',
    color: '#fff!important'
  },
  stats: {
    color: grayColor[0],
    display: 'inline-flex',
    fontSize: '12px',
    lineHeight: '22px',
    '& svg': {
      top: '4px',
      width: '16px',
      height: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      top: '4px',
      fontSize: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px'
    }
  },
  cardCategory: {
    color: grayColor[0],
    margin: '0',
    fontSize: '16px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
    textAlign: 'center'
  },
  cardCategoryWhite: {
    color: 'rgba(' + hexToRgb(whiteColor) + ',.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    textAlign: 'center',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1'
    }
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1'
    }
  }
};

export default dashboardStyle;
