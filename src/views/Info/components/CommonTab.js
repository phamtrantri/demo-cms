import React, { Fragment } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components
import Fab from '@material-ui/core/Fab';
// @material-ui/icons components
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
// core components
import InputWrapper from 'components/InputWrapper';
import ImageWrapper from 'components/ImageWrapper';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// import { blue } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import { Field, FieldArray } from 'formik';
import SelectWrapper from 'components/SelectWrapper';

// const useStyles = makeStyles(theme => ({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600]
//   },
//   cardTitleWhite: {
//     color: '#FFFFFF',
//     marginTop: '0px',
//     minHeight: 'auto',
//     fontWeight: '300',
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: '3px',
//     textDecoration: 'none'
//   },
//   cardMB: {
//     marginBottom: 0
//   },
//   grid: {
//     margin: '0 !important'
//   },
//   marginTop: {
//     marginTop: '10px'
//   },
//   marginRight: {
//     marginRight: theme.spacing(1)
//   }
// }));

function CommonTab(props) {
  // const classes = useStyles();

  const { t } = useTranslation();

  const { values, languages } = props;

  const {
    emails,
    hotlines,
    fax_numbers,
    logo,
    background_image,
    favicon
  } = values;

  return (
    <Fragment>
      {/* <GridContainer>
        <GridItem md={4} sm={6} xs={12}>
          <Field
            labelText={t('favicon')}
            id="favicon"
            name="favicon"
            component={ImageWrapper}
            type="info"
            defaultValue={favicon}
          />
        </GridItem>

        <GridItem md={4} sm={6} xs={12}>
          <Field
            labelText={t('logo')}
            id="logo"
            name="logo"
            component={ImageWrapper}
            type="info"
            defaultValue={logo}
          />
        </GridItem>

        <GridItem md={4} sm={6} xs={12}>
          <Field
            labelText={t('backgroundImage')}
            id="background_image"
            name="background_image"
            component={ImageWrapper}
            type="info"
            defaultValue={background_image}
          />
        </GridItem>
      </GridContainer> */}
      <Field
        labelText={'Mã'}
        id="ref_code"
        name="ref_code"
        component={InputWrapper}
        disabled={true}
      />

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'Thời gian cho phép đặt lịch khám trước (Tính bằng giờ)'}
            id="register_min_hours"
            name="register_min_hours"
            component={InputWrapper}
          />
        </GridItem>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'Thời gian cho phép đặt lịch khám sau (Tính bằng giờ)'}
            id="register_max_hours"
            name="register_max_hours"
            component={InputWrapper}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'Video hướng dẫn'}
            id="video_guide"
            name="video_guide"
            component={InputWrapper}
          />
        </GridItem>
        {/* <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'Thời gian cho phép đặt lịch khám sau (Tính bằng giờ)'}
            id="register_max_hours"
            name="register_max_hours"
            component={InputWrapper}
          />
        </GridItem> */}
      </GridContainer>

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'reCaptcha Site Key'}
            id="recaptcha_site_key"
            name="recaptcha_site_key"
            component={InputWrapper}
          />
        </GridItem>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'reCaptcha Secret Key'}
            id="recaptcha_secret_key"
            name="recaptcha_secret_key"
            component={InputWrapper}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'Google Analytic Page View Id'}
            id="google_analytic_page_view_id"
            name="google_analytic_page_view_id"
            component={InputWrapper}
          />

          <Field
            labelText={'Google Analytic Key'}
            id="google_analytic_key"
            name="google_analytic_key"
            component={InputWrapper}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={'Google Analytic Script'}
            id="google_analytic_script"
            name="google_analytic_script"
            component={InputWrapper}
            inputProps={{
              multiline: true,
              rows: 5
            }}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={`${t('favicon')}`}
            id="favicon"
            name="favicon"
            component={ImageWrapper}
            type="info"
            defaultValue={favicon}
            // width={100}
            height={100}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('logo')}
            id="logo"
            name="logo"
            component={ImageWrapper}
            type="info"
            defaultValue={logo}
            height={100}
          />
        </GridItem>
      </GridContainer>

      <Field
        labelText={t('backgroundImage')}
        id="background_image"
        name="background_image"
        component={ImageWrapper}
        type="info"
        defaultValue={background_image}
        height={window.innerWidth < 768 ? 100 : 147}
      />

      <p style={{ marginBottom: 0 }}>
        <label style={{ fontSize: 20 }}>{t('hotline')}</label>
      </p>
      <FieldArray
        name="hotlines"
        render={arrayHelpers => (
          <div>
            {hotlines.map((hotline, index) => (
              <GridContainer key={index} alignItems="center">
                <GridItem md={3} sm={3} xs={6}>
                  <Field
                    labelText={`${t('language')} ${index + 1}`}
                    id={`hotlines.${index}.language`}
                    name={`hotlines.${index}.language`}
                    component={SelectWrapper}
                    options={languages.map(i => ({
                      value: i.language,
                      label: i.name
                    }))}
                    hasPlaceholder={false}
                  />
                </GridItem>

                <GridItem md={4} sm={3} xs={6}>
                  <Field
                    labelText={`${t('title')} ${index + 1}`}
                    id={`hotlines.${index}.title`}
                    name={`hotlines.${index}.title`}
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem md={4} sm={4} xs={9}>
                  <Field
                    labelText={`${t('phone')} ${index + 1}`}
                    id={`hotlines.${index}.number`}
                    name={`hotlines.${index}.number`}
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem md={1} sm={2} xs={3}>
                  {index === 0 ? (
                    <Fab
                      color="primary"
                      size="medium"
                      // className={classes.marginRight}
                      onClick={() =>
                        arrayHelpers.push({
                          title: '',
                          number: '',
                          language: 'vi'
                        })
                      }
                    >
                      <Add />
                    </Fab>
                  ) : (
                    <Fab
                      color="secondary"
                      size="medium"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <Delete />
                    </Fab>
                  )}
                </GridItem>
              </GridContainer>
            ))}
          </div>
        )}
      />

      <p style={{ marginBottom: 0 }}>
        <label style={{ fontSize: 20 }}>{t('email')}</label>
      </p>
      <FieldArray
        name="emails"
        render={arrayHelpers => (
          <div>
            {emails.map((email, index) => (
              <GridContainer key={index} alignItems="center">
                <GridItem md={3} sm={3} xs={6}>
                  <Field
                    labelText={`${t('language')} ${index + 1}`}
                    id={`emails.${index}.language`}
                    name={`emails.${index}.language`}
                    component={SelectWrapper}
                    options={languages.map(i => ({
                      value: i.language,
                      label: i.name
                    }))}
                    hasPlaceholder={false}
                  />
                </GridItem>

                <GridItem md={4} sm={3} xs={6}>
                  <Field
                    labelText={`${t('title')} ${index + 1}`}
                    id={`emails.${index}.title`}
                    name={`emails.${index}.title`}
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem md={4} sm={4} xs={9}>
                  <Field
                    labelText={`${t('email')} ${index + 1}`}
                    id={`emails.${index}.number`}
                    name={`emails.${index}.number`}
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem md={1} sm={2} xs={3}>
                  {index === 0 ? (
                    <Fab
                      color="primary"
                      size="medium"
                      // className={classes.marginRight}
                      onClick={() =>
                        arrayHelpers.push({
                          title: '',
                          number: '',
                          language: 'vi'
                        })
                      }
                    >
                      <Add />
                    </Fab>
                  ) : (
                    <Fab
                      color="secondary"
                      size="medium"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <Delete />
                    </Fab>
                  )}
                </GridItem>
              </GridContainer>
            ))}
          </div>
        )}
      />

      <p style={{ marginBottom: 0 }}>
        <label style={{ fontSize: 20 }}>{t('fax')}</label>
      </p>
      <FieldArray
        name="fax_numbers"
        render={arrayHelpers => (
          <div>
            {fax_numbers.map((email, index) => (
              <GridContainer key={index} alignItems="center">
                <GridItem md={3} sm={3} xs={6}>
                  <Field
                    labelText={`${t('language')} ${index + 1}`}
                    id={`fax_numbers.${index}.language`}
                    name={`fax_numbers.${index}.language`}
                    component={SelectWrapper}
                    options={languages.map(i => ({
                      value: i.language,
                      label: i.name
                    }))}
                    hasPlaceholder={false}
                  />
                </GridItem>

                <GridItem md={4} sm={3} xs={6}>
                  <Field
                    labelText={`${t('title')} ${index + 1}`}
                    id={`fax_numbers.${index}.title`}
                    name={`fax_numbers.${index}.title`}
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem md={4} sm={4} xs={9}>
                  <Field
                    labelText={`${t('fax')} ${index + 1}`}
                    id={`fax_numbers.${index}.number`}
                    name={`fax_numbers.${index}.number`}
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem md={1} sm={2} xs={3}>
                  {index === 0 ? (
                    <Fab
                      color="primary"
                      size="medium"
                      // className={classes.marginRight}
                      onClick={() =>
                        arrayHelpers.push({
                          title: '',
                          number: '',
                          language: 'vi'
                        })
                      }
                    >
                      <Add />
                    </Fab>
                  ) : (
                    <Fab
                      color="secondary"
                      size="medium"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <Delete />
                    </Fab>
                  )}
                </GridItem>
              </GridContainer>
            ))}
          </div>
        )}
      />

      <p style={{ marginBottom: 0 }}>
        <label style={{ fontSize: 20 }}>Mạng xã hội</label>
      </p>
      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('facebook')}
            id="socials.facebook"
            name="socials.facebook"
            component={InputWrapper}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('google')}
            id="socials.google"
            name="socials.google"
            component={InputWrapper}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('twitter')}
            id="socials.twitter"
            name="socials.twitter"
            component={InputWrapper}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('linkedin')}
            id="socials.linkedin"
            name="socials.linkedin"
            component={InputWrapper}
          />
        </GridItem>
      </GridContainer>
    </Fragment>
  );
}

export default CommonTab;
