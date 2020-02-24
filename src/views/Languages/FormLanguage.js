import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components

// core components
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import SelectWrapper from 'components/SelectWrapper';

import { blue } from '@material-ui/core/colors';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import { createStructuredSelector, createSelector } from 'reselect';
import * as yup from 'yup';

import InputWrapper from 'components/InputWrapper';
import { language } from 'reducers';
import { api } from 'services';
import withLoading from 'utils/loading';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  cardMB: {
    marginBottom: 0
  }
});

function FormLanguage(props) {
  const classes = useStyles();

  const { t, isLoading, data } = props;

  const { id } = queryString.parse(props.location.search);

  const languageStatus = [
    { value: 1, label: 'Có hiệu lực' },
    { value: 2, label: 'Vô hiệu' }
  ];
  React.useEffect(() => {
    if (id) {
      props.getLanguage({ api: api.getLanguage, id });
    }
  }, []);

  const initData =
    id && !isEmpty(data)
      ? data
      : {
          name: '',
          language: '',
          status: 1
        };

  const handleSubmit = (params, bag) => {
    if (params._id) {
      props.updateLanguage({
        api: api.updateLanguage,
        params
      });
    } else {
      props.addLanguage({
        api: api.addLanguage,
        params,
        onSuccess: bag.resetForm(initData)
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        name: yup.string().required(),
        language: yup.string().required()
      })}
    >
      {() => (
        <Form>
          <Card className={classes.cardMB}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {id ? t('updateLanguage') : t('addLanguage')}
              </h4>
            </CardHeader>
            <CardBody>
              <Field
                labelText={t('name')}
                id="name"
                name="name"
                component={InputWrapper}
              />

              <Field
                labelText={t('abbreviations')}
                id="language"
                name="language"
                component={InputWrapper}
                disabled={true}
              />
              <Field
                labelText={t('status')}
                id="status"
                name="status"
                component={SelectWrapper}
                options={languageStatus}
                hasPlaceholder={false}
              />
            </CardBody>
            <CardFooter>
              <Button color="danger" type="reset" mx="auto">
                Reset
              </Button>

              <Button color="primary" type="submit" disabled={isLoading}>
                {t('submit')}
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = createStructuredSelector({
  data: language.selectors.item,

  isLoading: createSelector(
    language.selectors.isLoadingItem,
    language.selectors.isInserting,
    language.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getLanguage: language.actions.languageGetAjax,

  addLanguage: language.actions.languageInsertAjax,

  updateLanguage: language.actions.languageUpdateAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormLanguage);
