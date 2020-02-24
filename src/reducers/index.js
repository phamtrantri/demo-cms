import * as ajax from './ajax';
import * as auth from './auth';
import * as app from './app';
import * as article from './article';
import * as articleBanner from './articleBanner';
import * as articleConference from './articleConference';
import * as articleHighlight from './articleHighlight';
import * as articleProcess from './articleProcess';
import * as articleQA from './articleQA';
import * as articleDoctor from './articleDoctor';
import * as articleDepartment from './articleDepartment';
import * as articleService from './articleService';
import * as articleIntro from './articleIntro';
import * as articleMenu from './articleMenu';
import * as category from './category';
import * as department from './department';
import * as doctor from './doctor';
import * as doctorDepartment from './doctorDepartment';
import * as doctorService from './doctorService';
import * as service from './service';
import * as language from './language';
import * as info from './info';
import * as resource from './resource';
import * as servicePrice from './servicePrice';
import * as servicePriceType from './servicePriceType';
import * as user from './user';
import * as registration from './registration';
import * as country from './country';
import * as province from './province';
import * as district from './district';
import * as ward from './ward';
import * as relationship from './relationship';
import * as job from './job';
import * as folk from './folk';
import * as contact from './contact';
import * as workingSchedule from './workingSchedule';
import * as room from './room';
import * as location from './location';
import * as photo from './photo';

export {
  ajax,
  auth,
  app,
  article,
  articleBanner,
  articleConference,
  articleHighlight,
  articleProcess,
  articleQA,
  articleDoctor,
  articleDepartment,
  articleService,
  articleIntro,
  articleMenu,
  category,
  department,
  doctor,
  doctorDepartment,
  doctorService,
  service,
  language,
  info,
  resource,
  servicePrice,
  servicePriceType,
  user,
  registration,
  country,
  province,
  district,
  ward,
  contact,
  relationship,
  job,
  folk,
  workingSchedule,
  room,
  location,
  photo
};

export default {
  ajax: ajax.reducer,
  auth: auth.reducer,
  app: app.reducer,
  article: article.reducer,
  articleBanner: articleBanner.reducer,
  articleConference: articleConference.reducer,
  articleHighlight: articleHighlight.reducer,
  articleProcess: articleProcess.reducer,
  articleQA: articleQA.reducer,
  articleDoctor: articleDoctor.reducer,
  articleDepartment: articleDepartment.reducer,
  articleService: articleService.reducer,
  articleIntro: articleIntro.reducer,
  articleMenu: articleMenu.reducer,
  category: category.reducer,
  department: department.reducer,
  doctor: doctor.reducer,
  doctorDepartment: doctorDepartment.reducer,
  doctorService: doctorService.reducer,
  service: service.reducer,
  language: language.reducer,
  info: info.reducer,
  resource: resource.reducer,
  servicePrice: servicePrice.reducer,
  servicePriceType: servicePriceType.reducer,
  user: user.reducer,
  registration: registration.reducer,
  country: country.reducer,
  province: province.reducer,
  district: district.reducer,
  ward: ward.reducer,
  contact: contact.reducer,
  relationship: relationship.reducer,
  job: job.reducer,
  folk: folk.reducer,
  workingSchedule: workingSchedule.reducer,
  room: room.reducer,
  location: location.reducer,
  photo: photo.reducer
};
