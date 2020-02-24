import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import { createStructuredSelector, createSelector } from 'reselect';
import { isEmpty } from 'lodash';
import * as yup from 'yup';

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
import ChipWrapper from 'components/ChipWrapper';
import Editor from 'components/CustomEditor/CustomEditor';

import { grayColor, defaultFont } from 'assets/jss/material-dashboard-react.js';

import { api } from 'services';
import { articleQA, category, language, auth } from 'reducers';
import { CATEGORY_TYPE } from '../../constants';
import withLoading from 'utils/loading';
import { returnUniqueHandle } from 'utils/handle';

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
  },
  labelRoot: {
    ...defaultFont,
    color: grayColor[3] + ' !important',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.42857',
    letterSpacing: 'unset'
  },
  formControl: {
    marginTop: 0,
    marginBottom: 10
  },
  formControlFile: {
    marginTop: 0
  }
});

function FormQA(props) {
  const classes = useStyles();

  const { t, categories, languages, data, user, isLoading } = props;

  const { id } = queryString.parse(props.location.search);

  const defaultType = CATEGORY_TYPE.HOI_DAP;

  const categoriesData = categories.filter(
    i => i.status === 1 && i.type === defaultType
  );

  const defaultCategory = categoriesData.find(i => i.language === 'vi');

  const editorRef = React.createRef();

  useEffect(() => {
    if (id) {
      props.getArticle({ api: api.getArticle, id });
    }
    return () => {
      props.cleanArticle();
    };
  }, []);

  const articleQAStatus = [
    { value: 1, label: 'Đăng ngay' },
    { value: 2, label: 'Lưu nháp' },
    { value: 3, label: 'Vô hiệu' }
  ];

  const initData =
    id && !isEmpty(data)
      ? {
          ...data,
          keywords: data.keywords ? data.keywords.filter(i => i) : [],
          tags: data.tags ? data.tags.filter(i => i) : [],
          category: data.category ? data.category._id : null
        }
      : {
          language: 'vi',
          title: '',
          handle: '',
          category: defaultCategory ? defaultCategory._id : '',
          keywords: [],
          tags: [],
          type: defaultType,
          description: '',
          redirect: '',
          status: 1,
          display_position: '',
          creator: user.username,
          author: '',
          source: ''
        };

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
      // editorRef.current.resetContent();
    };
    const params = {
      ...v,
      body: editorRef.current.getContent(),
      keywords: v.keywords.join(','),
      tags: v.tags.join(','),
      handle: v.handle || returnUniqueHandle(v.title)
    };
    if (params._id) {
      props.updateArticle({ api: api.updateArticle, params });
    } else {
      props.addArticle({ api: api.addArticle, params, onSuccess });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => {
      //   bag.resetForm(initData);
      //   editorRef.current.resetContent();
      // }}
      validationSchema={yup.object().shape({
        language: yup.string().required(),
        title: yup.string().required(),
        handle: yup.string().required(),
        category: yup.string().required()
      })}
    >
      {({ values: { language, body }, setFieldValue }) => {
        return (
          <Form>
            <Card className={classes.cardMB}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {data._id ? t('updateQA') : t('addQA')}
                </h4>
              </CardHeader>
              <CardBody>
                <Field
                  labelText={t('language')}
                  id="language"
                  name="language"
                  component={SelectWrapper}
                  options={languages.map(i => ({
                    value: i.language,
                    label: i.name
                  }))}
                  hasPlaceholder={languages.length === 0}
                  callback={v =>
                    setFieldValue(
                      'category',
                      categoriesData.find(i => i.language === v) || ''
                    )
                  }
                />

                <Field
                  labelText={t('category') + ' *'}
                  id="category"
                  name="category"
                  component={SelectWrapper}
                  options={categoriesData
                    .filter(i => i.language === language)
                    .map(i => ({
                      value: i._id,
                      label: i.title
                    }))}
                  hasPlaceholder={categoriesData.length === 0}
                />

                <Field
                  labelText={t('title') + ' *'}
                  id="title"
                  name="title"
                  component={InputWrapper}
                  blurCallback={v =>
                    setFieldValue('handle', returnUniqueHandle(v))
                  }
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

                <GridContainer>
                  <GridItem xs={6}>
                    <Field
                      labelText={t('status')}
                      id="status"
                      name="status"
                      component={SelectWrapper}
                      options={articleQAStatus}
                      hasPlaceholder={false}
                    />
                  </GridItem>

                  <GridItem xs={6}>
                    <Field
                      labelText={t('redirectUrl')}
                      id="redirect"
                      name="redirect"
                      component={InputWrapper}
                    />
                  </GridItem>
                </GridContainer>

                {/* <Field
                  labelText={t('keyword')}
                  id="keywords"
                  name="keywords"
                  component={ChipWrapper}
                /> */}

                <Field
                  labelText={t('tag')}
                  id="tags"
                  name="tags"
                  component={ChipWrapper}
                />

                <Field
                  labelText={t('displayPosition')}
                  id="display_position"
                  name="display_position"
                  component={InputWrapper}
                  inputProps={{ type: 'number' }}
                />

                <Editor ref={editorRef} defaultValue={body || ''} />
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
        );
      }}
    </Formik>
  );
}

const mapStateToProps = createStructuredSelector({
  categories: category.selectors.items,

  languages: language.selectors.items,

  data: articleQA.selectors.item,

  user: auth.selectors.user,

  isLoading: createSelector(
    articleQA.selectors.isLoadingItem,
    articleQA.selectors.isInserting,
    articleQA.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getCategories: category.actions.categoryGetAllAjax,

  getArticle: articleQA.actions.articleQaGetAjax,

  addArticle: articleQA.actions.articleQaInsertAjax,

  updateArticle: articleQA.actions.articleQaUpdateAjax,

  cleanArticle: articleQA.actions.articleQaGetClean
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormQA);
