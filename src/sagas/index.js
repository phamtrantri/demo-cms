import { all } from 'redux-saga/effects';

import app from './app';
import auth from './auth';
import info from './info';
import resource from './resource';
import user from './user';
import doctor from './doctor';
import category from './category';
import department from './department';
import service from './service';
import servicePrice from './servicePrice';
import servicePriceType from './servicePriceType';
import registration from './registration';
import country from './country';
import province from './province';
import district from './district';
import ward from './ward';
import contact from './contact';
import article from './article';
import articleBanner from './articleBanner';
import articleHighlight from './articleHighlight';
import articleDoctor from './articleDoctor';
import articleDepartment from './articleDepartment';
import articleConference from './articleConference';
import articleProcess from './articleProcess';
import articleQA from './articleQA';
import articleIntro from './articleIntro';
import articleService from './articleService';
import articleMenu from './articleMenu';
import workingSchedule from './workingSchedule';
import room from './room';
import location from './location';
import doctorDepartment from './doctorDepartment';
import doctorService from './doctorService';
import relationship from './relationship';
import job from './job';
import folk from './folk';
import language from './language';
import photo from './photo';

const rootSaga = function*() {
  yield all([
    app,
    auth,
    info,
    resource,
    user,
    doctor,
    category,
    department,
    service,
    servicePrice,
    servicePriceType,
    registration,
    country,
    province,
    district,
    ward,
    contact,
    article,
    articleBanner,
    articleConference,
    articleDepartment,
    articleDoctor,
    articleHighlight,
    articleIntro,
    articleProcess,
    articleQA,
    articleService,
    articleMenu,
    workingSchedule,
    room,
    location,
    language,
    doctorDepartment,
    doctorService,
    folk,
    relationship,
    job,
    photo
  ]);
};

export default rootSaga;
