import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { withTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components
import { blue } from '@material-ui/core/colors';
// core components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import InputWrapper from 'components/InputWrapper';
import SelectWrapper from 'components/SelectWrapper';
import ImageWrapper from 'components/ImageWrapper';
import ChipWrapper from 'components/ChipWrapper';

import { category, language } from 'reducers';
import { api } from 'services';
import {
  SELECT_MENU,
  CATEGORY_TYPE_MAP,
  CATEGORY_TYPE,
  SELECT_CATEGORY_TYPE
} from '../../constants';
import withLoading from 'utils/loading';
import { returnHandle } from 'utils/handle';

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

function FormCategory(props) {
  const classes = useStyles();

  const { t, languages, isLoading, data, categories } = props;

  const { id } = queryString.parse(props.location.search);

  const availableCategories = categories.filter(i => i._id !== id);
  const categoryStatus = [
    { value: 1, label: 'Có hiệu lực' },
    { value: 2, label: 'Vô hiệu' }
  ];
  useEffect(() => {
    if (id) {
      props.getCategory({ api: api.getCategory, id });
    }
  }, []);

  const initData =
    id && !isEmpty(data)
      ? {
          ...data,
          typeName: CATEGORY_TYPE_MAP[data.type],
          parent_category: data.parent_category ? data.parent_category._id : ''
        }
      : {
          title: '',
          handle: '',
          thumbnail: '',
          keywords: [],
          type: CATEGORY_TYPE.OTHERS,
          menu_index: '',
          description: '',
          display_position: '',
          parent_category: '',
          language: 'vi',
          redirect: '',
          status: 1
        };

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    // eslint-disable-next-line no-unused-vars
    const { typeName, ...rest } = v;
    const params = {
      ...rest,
      keywords: v.keywords.join(','),
      parent_category: v.parent_category || null,
      display_position: v.display_position || undefined,
      handle: v.handle || returnHandle(v.title)
    };
    if (id) {
      props.updateCategory({ api: api.updateCategory, params });
    } else {
      props.addCategory({ api: api.addCategory, params, onSuccess });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        language: yup.string().required(),
        title: yup.string().required(),
        handle: yup.string().required()
      })}
    >
      {({ values: { thumbnail, language }, setFieldValue }) => (
        <Form>
          <Card className={classes.cardMB}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {id ? t('updateCategory') : t('addCategory')}
              </h4>
            </CardHeader>
            <CardBody>
              <Field
                labelText={t('language')}
                id="language"
                name="language"
                component={SelectWrapper}
                hasPlaceholder={false}
                options={languages.map(i => ({
                  value: i.language,
                  label: i.name
                }))}
                callback={() => setFieldValue('parent_category', '')}
              />

              {/* {initData._id ? (
                <Field
                  labelText={t('categoryType')}
                  id="typeName"
                  name="typeName"
                  component={InputWrapper}
                  disabled={true}
                />
              ) : (
                <Field
                  labelText={t('categoryType')}
                  id="type"
                  name="type"
                  component={SelectWrapper}
                  hasPlaceholder={false}
                  options={SELECT_CATEGORY_TYPE}
                />
              )} */}
              <Field
                labelText={t('categoryType')}
                id="type"
                name="type"
                component={SelectWrapper}
                hasPlaceholder={false}
                options={SELECT_CATEGORY_TYPE}
              />

              <Field
                labelText={t('title') + ' *'}
                id="title"
                name="title"
                component={InputWrapper}
                blurCallback={v => setFieldValue('handle', returnHandle(v))}
              />

              <Field
                labelText={t('handle') + ' *'}
                id="handle"
                name="handle"
                component={InputWrapper}
              />

              <Field
                labelText={t('description')}
                id="description"
                name="description"
                component={InputWrapper}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />

              <Field
                labelText={t('redirectUrl')}
                id="redirect"
                name="redirect"
                component={InputWrapper}
              />

              {/* <Field
                labelText={t('keyword')}
                id="keywords"
                name="keywords"
                component={ChipWrapper}
              /> */}

              <Field
                labelText={t('parentCategory')}
                id="parent_category"
                name="parent_category"
                component={SelectWrapper}
                options={availableCategories
                  .filter(i => i.language === language)
                  .map(i => ({
                    value: i._id,
                    label: i.title
                  }))}
              />

              <GridContainer>
                <GridItem md={6} sm={6} xs={6}>
                  <Field
                    labelText={t('displayPosition')}
                    id="display_position"
                    name="display_position"
                    component={InputWrapper}
                    inputProps={{ type: 'number' }}
                  />
                </GridItem>

                <GridItem md={6} sm={6} xs={6}>
                  <Field
                    labelText={'Thuộc menu'}
                    id="menu_index"
                    name="menu_index"
                    component={SelectWrapper}
                    options={SELECT_MENU}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={6}>
                  <Field
                    labelText={t('status')}
                    id="status"
                    name="status"
                    component={SelectWrapper}
                    options={categoryStatus}
                    hasPlaceholder={false}
                  />
                </GridItem>
              </GridContainer>
              <Field
                labelText={t('thumbnail')}
                id="thumbnail"
                name="thumbnail"
                component={ImageWrapper}
                type="category"
                defaultValue={thumbnail}
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
  languages: language.selectors.items,

  categories: category.selectors.items,

  data: category.selectors.item,

  isLoading: createSelector(
    category.selectors.isLoadingItem,
    category.selectors.isInserting,
    category.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getCategory: category.actions.categoryGetAjax,

  addCategory: category.actions.categoryInsertAjax,

  updateCategory: category.actions.categoryUpdateAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormCategory);
