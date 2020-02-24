import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { Formik, Field, Form, FieldArray } from 'formik';
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
import ImageWrapper from 'components/ImageWrapper';
import ChipWrapper from 'components/ChipWrapper';
import Editor from 'components/CustomEditor/CustomEditor';

import { grayColor, defaultFont } from 'assets/jss/material-dashboard-react.js';

import { api } from 'services';
import { article, category, language, doctor, auth } from 'reducers';
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

function FormDoctorArticle(props) {
  const classes = useStyles();

  const { t, categories, languages, doctors, data, user, isLoading } = props;

  const { id } = queryString.parse(props.location.search);

  const defaultType = CATEGORY_TYPE.BAC_SI;

  const categoriesData = categories.filter(
    i => i.status === 1 && i.type === defaultType
  );

  const defaultCategory = categoriesData.find(i => i.language === 'vi');

  const doctorsData = doctors.filter(i => i.status === 1);

  const editorRef = React.createRef();

  useEffect(() => {
    if (id) {
      props.getArticle({ api: api.getArticle, id });
    }
    return () => {
      props.cleanArticle();
    };
  }, []);

  const articleStatus = [
    { value: 1, label: 'Đăng ngay' },
    { value: 2, label: 'Lưu nháp' },
    { value: 3, label: 'Vô hiệu' }
  ];

  const initData =
    id && !isEmpty(data)
      ? {
          ...data,
          images:
            data.images && data.images.length > 0
              ? data.images
                  .sort((a, b) => a.pos - b.pos)
                  .map(i => i.resource)
                  .concat([''])
              : [''],
          files:
            data.files && data.files.length > 0
              ? data.files
                  .sort((a, b) => a.pos - b.pos)
                  .map(i => i.resource)
                  .concat([''])
              : [''],
          videos:
            data.videos && data.videos.length > 0
              ? data.videos.sort((a, b) => a.pos - b.pos).map(i => i.resource)
              : [],
          keywords: data.keywords ? data.keywords.filter(i => i) : [],
          tags: data.tags ? data.tags.filter(i => i) : [],
          category: data.category ? data.category._id : null,
          doctor: data.doctor ? data.doctor._id : null
        }
      : {
          language: 'vi',
          title: '',
          handle: '',
          category: defaultCategory ? defaultCategory._id : '',
          doctor: '',
          keywords: [],
          tags: [],
          type: defaultType,
          description: '',
          thumbnail_image: '',
          thumbnail_video: '',
          redirect: '',
          status: 1,
          display_position: '',
          creator: user.username,
          author: '',
          source: '',
          images: [''],
          videos: [],
          files: ['']
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
      doctor: v.doctor || null,
      display_position: v.display_position || undefined,
      images: v.images
        .filter(i => i)
        .map((i, idx) => ({
          resource: i,
          pos: idx + 1
        })),
      videos: v.videos.map((i, idx) => ({
        resource: i,
        pos: idx + 1
      })),
      files: v.files
        .filter(i => i)
        .map((i, idx) => ({
          resource: i,
          pos: idx + 1
        })),
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
        category: yup.string().required(),
        title: yup.string().required(),
        handle: yup.string().required()
      })}
    >
      {({
        values: { language, thumbnail_image, body, images, files },
        setFieldValue
      }) => {
        return (
          <Form>
            <Card className={classes.cardMB}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {data._id ? t('updateDoctorArticle') : t('addDoctorArticle')}
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
                  labelText={t('doctor')}
                  id="doctor"
                  name="doctor"
                  component={SelectWrapper}
                  options={doctorsData
                    .filter(i =>
                      i.contents.some(elem => elem.language === language)
                    )
                    .map(i => ({
                      value: i._id,
                      label: i.contents.find(i => i.language === language)
                        .fullname
                    }))}
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
                  labelText={t('thumbnailImage')}
                  id="thumbnail_image"
                  name="thumbnail_image"
                  component={ImageWrapper}
                  type="article"
                  defaultValue={thumbnail_image}
                />

                <Field
                  labelText={t('thumbnailVideo')}
                  id="thumbnail_video"
                  name="thumbnail_video"
                  component={InputWrapper}
                />

                <GridContainer>
                  <GridItem xs={6}>
                    <Field
                      labelText={t('status')}
                      id="status"
                      name="status"
                      component={SelectWrapper}
                      options={articleStatus}
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

                <GridContainer>
                  <GridItem xs={6}>
                    <Field
                      labelText={t('source')}
                      id="source"
                      name="source"
                      component={InputWrapper}
                    />
                  </GridItem>

                  <GridItem xs={6}>
                    <Field
                      labelText={t('author')}
                      id="author"
                      name="author"
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

                <label className={classes.labelRoot} htmlFor="images">
                  Các hình ảnh khác
                </label>
                <FieldArray
                  id="images"
                  name="images"
                  render={arrayHelpers => {
                    return (
                      <GridContainer
                        alignItems="center"
                        className={classes.grid}
                      >
                        {images.map((image, index) => (
                          <GridItem key={index} xs={3}>
                            <Field
                              id={`images.${index}`}
                              name={`images.${index}`}
                              component={ImageWrapper}
                              defaultValue={image}
                              type="article"
                              formControlProps={{
                                className: classes.formControl
                              }}
                              callback={() => {
                                if (images.includes('') && image === '') {
                                  arrayHelpers.push('');
                                }
                              }}
                              onDelete={() => arrayHelpers.remove(index)}
                            />
                          </GridItem>
                        ))}
                      </GridContainer>
                    );
                  }}
                />

                <label className={classes.labelRoot} htmlFor="files">
                  Các tập tin đính kèm
                </label>
                <FieldArray
                  id="files"
                  name="files"
                  render={arrayHelpers => {
                    return (
                      <GridContainer>
                        {files.map((file, index) => (
                          <GridItem key={index} xs={3}>
                            <Field
                              id={`files.${index}`}
                              name={`files.${index}`}
                              component={ImageWrapper}
                              defaultValue={file}
                              type="article"
                              accept={['application/*']}
                              placeholder={'Chọn tập tin'}
                              fileType="file"
                              formControlProps={{
                                className: classes.formControlFile
                              }}
                              callback={() => {
                                if (images.includes('') && file === '') {
                                  arrayHelpers.push('');
                                }
                              }}
                              onDelete={() => arrayHelpers.remove(index)}
                            />

                            {file ? <p>{file}</p> : null}
                          </GridItem>
                        ))}
                      </GridContainer>
                    );
                  }}
                />

                <Field
                  labelText={'Các đường dẫn video'}
                  id="videos"
                  name="videos"
                  component={ChipWrapper}
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

  doctors: doctor.selectors.items,

  data: article.selectors.item,

  user: auth.selectors.user,

  isLoading: createSelector(
    article.selectors.isLoadingItem,
    article.selectors.isInserting,
    article.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getCategories: category.actions.categoryGetAllAjax,

  getArticle: article.actions.articleGetAjax,

  addArticle: article.actions.articleInsertAjax,

  updateArticle: article.actions.articleUpdateAjax,

  cleanArticle: article.actions.articleGetClean
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormDoctorArticle);
