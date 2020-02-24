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
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
// import UserProfile from 'views/UserProfile/UserProfile.js';
// import TableList from 'views/TableList/TableList.js';
// import Typography from 'views/Typography/Typography.js';
// import Icons from 'views/Icons/Icons.js';
// import Maps from 'views/Maps/Maps.js';
// import NotificationsPage from 'views/Notifications/Notifications.js';
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";
// management views for Admin layout
import ChangePasswordPage from 'views/ChangePassword/ChangePassword';

import HosiptalInfoPage from 'views/Info/Info.js';

import HospitalSchedulePage from 'views/HospitalSchedule/HospitalSchedule.js';

import ContactsPage from 'views/Contacts/Contacts.js';

import CategoriesPage from 'views/Categories/Categories.js';
import FormCategory from 'views/Categories/FormCategory.js';

import ArticlesPage from 'views/Articles/Articles.js';
import FormArticle from 'views/Articles/FormArticle.js';

import MenuArticlesPage from 'views/MenuArticles/MenuArticles.js';
import FormMenuArticle from 'views/MenuArticles/FormMenuArticle.js';

import BannersPage from 'views/Banners/Banners.js';
import FormBanner from 'views/Banners/FormBanner.js';

import HighlightsPage from 'views/Highlights/Highlights.js';
import FormHighlight from 'views/Highlights/FormHighlight.js';

import ConferencesPage from 'views/Conferences/Conferences.js';
import FormConference from 'views/Conferences/FormConference.js';

import IntroductionsPage from 'views/Introductions/Introductions.js';
import FormIntro from 'views/Introductions/FormIntro.js';

import ProcessesPage from 'views/Processes/Processes.js';
import FormProcess from 'views/Processes/FormProcess.js';

import QAsPage from 'views/QAs/QAs.js';
import FormQA from 'views/QAs/FormQA.js';

import DoctorsPage from 'views/Doctors/Doctors.js';
import FormDoctor from 'views/Doctors/FormDoctor.js';

import DoctorArticlesPage from 'views/DoctorArticles/DoctorArticles.js';
import FormDoctorArticle from 'views/DoctorArticles/FormDoctorArticle.js';

import DoctorServicesPage from 'views/DoctorServices/DoctorServices.js';
import FormDoctorService from 'views/DoctorServices/FormDoctorService.js';

import DoctorDepartmentsPage from 'views/DoctorDepartments/DoctorDepartments.js';
import FormDoctorDepartment from 'views/DoctorDepartments/FormDoctorDepartment.js';

import DoctorWorkingSchedulesPage from 'views/DoctorsWorkingSchedules/Index.js';
import FormDoctorWorkingSchedules from 'views/DoctorsWorkingSchedules/Form.js';

import DepartmentsPage from 'views/Departments/Departments.js';
import FormDepartment from 'views/Departments/FormDepartment.js';

import DepartmentArticlesPage from 'views/DepartmentArticles/DepartmentArticles.js';
import FormDepartmentArticle from 'views/DepartmentArticles/FormDepartmentArticle.js';

import ServicesPage from 'views/Services/Services.js';
import FormService from 'views/Services/FormService.js';

import ServiceArticlesPage from 'views/ServiceArticles/ServiceArticles.js';
import FormServiceArticle from 'views/ServiceArticles/FormServiceArticle.js';

import ServicePricesPage from 'views/ServicePrices/ServicePrices.js';
import FormServicePrice from 'views/ServicePrices/FormServicePrice.js';

import ServicePriceTypesPage from 'views/ServicePriceTypes/ServicePriceTypes.js';
import FormServicePriceType from 'views/ServicePriceTypes/FormServicePriceType.js';

import CountriesPage from 'views/Countries/Countries';
import FormCountry from 'views/Countries/FormCountry';

import ProvincesPage from 'views/Provinces/Provinces';
import FormProvince from 'views/Provinces/FormProvince';

import DistrictsPage from 'views/Districts/Districts';
import FormDistrict from 'views/Districts/FormDistrict';

import WardsPage from 'views/Wards/Wards';
import FormWard from 'views/Wards/FormWard';
import FolksPage from 'views/Folks/Folks';
import FormFolk from 'views/Folks/FormFolk';

import JobsPage from 'views/Jobs/Jobs';
import FormJob from 'views/Jobs/FormJob';

import RelationshipsPage from 'views/Relationships/Relationships';
import FormRelationship from 'views/Relationships/FormRelationship';

import PhotosPage from 'views/Photos/Photos.js';
import FormPhoto from 'views/Photos/FormPhoto.js';

import UsersPage from 'views/Users/Users.js';
import FormUser from 'views/Users/FormUser.js';

import LanguagesPage from 'views/Languages/Languages.js';
import FormLanguage from 'views/Languages/FormLanguage.js';

import RegistrationsPage from 'views/Registrations/Registrations.js';
import RegistrationDetail from 'views/Registrations/RegistrationDetail.js';

import LocationsPage from 'views/Locations/Locations.js';
import FormLocation from 'views/Locations/FormLocation.js';

import RoomsPage from 'views/Rooms/Rooms.js';
import FormRoom from 'views/Rooms/FormRoom.js';

import SettingsPage from 'views/Settings/Settings.js';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    i18Key: 'dashboard',
    component: DashboardPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_registration_manager']
  },
  {
    path: '/hospital-schedule',
    name: 'HospitalSchedule',
    i18Key: 'workingSchedule',
    component: HospitalSchedulePage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/appointments',
    name: 'Appointments',
    i18Key: 'appointmentManagement',
    component: RegistrationsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_registration_manager']
  },
  {
    path: '/registrations/update',
    name: 'UpdateRegistrations',
    i18Key: 'updateRegistration',
    component: RegistrationDetail,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/consultations',
    name: 'Consultations',
    i18Key: 'consultingManagement',
    component: ContactsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/process',
    name: 'Processes',
    i18Key: 'process',
    component: ProcessesPage,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/settings/hospital',
    name: 'GeneralSettings',
    i18Key: 'generalSettings',
    component: HosiptalInfoPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/categories',
    name: 'Categories',
    i18Key: 'category',
    component: CategoriesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/categories/create',
    name: 'AddCategory',
    i18Key: 'addCategory',
    component: FormCategory,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/categories/update',
    name: 'UpdateCategory',
    i18Key: 'updateCategory',
    component: FormCategory,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/articles/create',
    name: 'AddArticle',
    i18Key: 'addArticle',
    component: FormArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/articles/update',
    name: 'UpdateArticle',
    i18Key: 'updateArticle',
    component: FormArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/links/create',
    name: 'AddMenuArticle',
    i18Key: 'addMenuArticle',
    component: FormMenuArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/links/update',
    name: 'UpdateMenuArticle',
    i18Key: 'updateMenuArticle',
    component: FormMenuArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/links',
    name: 'Menu',
    i18Key: 'menu',
    component: MenuArticlesPage,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/articles',
    name: 'Articles',
    i18Key: 'article',
    component: ArticlesPage,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    exact: true
  },

  // {
  //   path: '/lich-hen/create',
  //   name: 'AddRegistration',
  //   i18Key: 'addRegistration',
  //
  //
  //   component: FormRegistration,
  //   layout: '/admin',
  //   hidden: true
  // },
  // {
  //   path: '/lich-hen/update',
  //   name: 'UpdateRegistration',
  //   i18Key: 'updateRegistration',
  //
  //
  //   component: FormRegistration,
  //   layout: '/admin',
  //   hidden: true
  // },
  {
    path: '/pages/create',
    name: 'AddIntro',
    i18Key: 'addIntro',
    component: FormIntro,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/pages/update',
    name: 'UpdateIntro',
    i18Key: 'updateIntro',
    component: FormIntro,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/pages',
    name: 'Introductions',
    i18Key: 'introduction',
    component: IntroductionsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/banner/create',
    name: 'AddBanner',
    i18Key: 'addBanner',
    component: FormBanner,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/banner/update',
    name: 'UpdateBanner',
    i18Key: 'updateBanner',
    component: FormBanner,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/banner',
    name: 'Banners',
    i18Key: 'banner',
    component: BannersPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/quy-trinh/create',
    name: 'AddProcess',
    i18Key: 'addProcess',
    component: FormProcess,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/quy-trinh/update',
    name: 'UpdateProcess',
    i18Key: 'updateProcess',
    component: FormProcess,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/quy-trinh',
    name: 'Processes',
    i18Key: 'process',

    component: ProcessesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/highlights/create',
    name: 'AddHighlight',
    i18Key: 'addHighlight',

    component: FormHighlight,
    layout: '/admin',

    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/highlights/update',
    name: 'UpdateHighlight',
    i18Key: 'updateHighlight',
    component: FormHighlight,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/highlights',
    name: 'Highlights',
    i18Key: 'highlight',
    component: HighlightsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/scientific-conferences/create',
    name: 'AddConference',
    i18Key: 'addConference',
    component: FormConference,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/scientific-conferences/update',
    name: 'UpdateConference',
    i18Key: 'updateConference',
    component: FormConference,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/scientific-conferences',
    name: 'Conferences',
    i18Key: 'conference',
    component: ConferencesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/question-answers/create',
    name: 'AddQA',
    i18Key: 'addQA',

    component: FormQA,
    layout: '/admin',

    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/question-answers/update',
    name: 'UpdateQA',
    i18Key: 'updateQA',

    component: FormQA,
    layout: '/admin',

    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/question-answers',
    name: 'QAs',
    i18Key: 'QA',

    component: QAsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/departments',
    name: 'Departments',
    i18Key: 'departmentManagement',

    component: DepartmentsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/department-articles',
    name: 'DepartmentArticles',
    i18Key: 'departmentArticle',

    component: DepartmentArticlesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/departments/create',
    name: 'AddDepartment',
    i18Key: 'addDepartment',

    component: FormDepartment,
    layout: '/admin',

    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/departments/update',
    name: 'UpdateDepartment',
    i18Key: 'updateDepartment',

    component: FormDepartment,
    layout: '/admin',

    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/department-articles/create',
    name: 'AddDepartmentArticle',
    i18Key: 'addDepartmentArticle',

    component: FormDepartmentArticle,
    layout: '/admin',

    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/department-articles/update',
    name: 'UpdateDepartmentsArticle',
    i18Key: 'updateDepartmentArticle',

    component: FormDepartmentArticle,
    layout: '/admin',

    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/services',
    name: 'Services',
    i18Key: 'serviceManagement',
    component: ServicesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-prices',
    name: 'ServicePrices',
    i18Key: 'servicePrice',
    component: ServicePricesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-price-types',
    name: 'ServicePriceTypes',
    i18Key: 'servicePriceType',
    component: ServicePriceTypesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-price-types/create',
    name: 'AddServicePriceType',
    i18Key: 'addServicePriceType',
    component: FormServicePriceType,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-price-types/update',
    name: 'UpdateServicePriceType',
    i18Key: 'updateServicePriceType',
    component: FormServicePriceType,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-articles',
    name: 'ServiceArticles',
    i18Key: 'serviceArticle',
    component: ServiceArticlesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-prices/create',
    name: 'AddServicePrice',
    i18Key: 'addServicePrice',
    component: FormServicePrice,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-prices/update',
    name: 'UpdateServicePrice',
    i18Key: 'updateServicePrice',
    component: FormServicePrice,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/services/create',
    name: 'AddService',
    i18Key: 'addService',
    component: FormService,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/services/update',
    name: 'UpdateService',
    i18Key: 'updateService',
    component: FormService,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-articles/create',
    name: 'AddServiceArticle',
    i18Key: 'addServiceArticle',
    component: FormServiceArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/service-articles/update',
    name: 'UpdateServiceArticle',
    i18Key: 'updateServiceArticle',
    component: FormServiceArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/doctors',
    name: 'Doctors',
    i18Key: 'doctorManagement',
    component: DoctorsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-articles',
    name: 'DoctorArticles',
    i18Key: 'doctorArticle',
    component: DoctorArticlesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-services',
    name: 'DoctorServices',
    i18Key: 'doctorService',
    component: DoctorServicesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-departments',
    name: 'DoctorDepartments',
    i18Key: 'doctorDepartment',
    component: DoctorDepartmentsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctors/create',
    name: 'AddDoctor',
    i18Key: 'addDoctor',
    component: FormDoctor,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctors/update',
    name: 'UpdateDoctor',
    i18Key: 'updateDoctor',
    component: FormDoctor,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-articles/create',
    name: 'AddDoctorArticle',
    i18Key: 'addDoctorArticle',
    component: FormDoctorArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-articles/update',
    name: 'UpdateDoctorArticle',
    i18Key: 'updateDoctorArticle',
    component: FormDoctorArticle,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-services/create',
    name: 'AddDoctorService',
    i18Key: 'addDoctorService',
    component: FormDoctorService,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-services/update',
    name: 'UpdateDoctorService',
    i18Key: 'updateDoctorService',
    component: FormDoctorService,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-departments/create',
    name: 'AddDoctorDepartment',
    i18Key: 'addDoctorDepartment',
    component: FormDoctorDepartment,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-departments/update',
    name: 'UpdateDoctorDepartment',
    i18Key: 'updateDoctorDepartment',
    component: FormDoctorDepartment,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/doctor-working-schedules',
    name: 'WorkingSchedules',
    i18Key: 'doctorWorkings',
    component: DoctorWorkingSchedulesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-working-schedules/create',
    name: 'AddWorkingSchedule',
    i18Key: 'addWorkingSchedule',
    component: FormDoctorWorkingSchedules,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/doctor-working-schedules/update',
    name: 'UpdateWorkingSchedule',
    i18Key: 'updateWorkingSchedule',
    component: FormDoctorWorkingSchedules,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/photos/create',
    name: 'AddImage',
    i18Key: 'addImage',
    component: FormPhoto,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/photos/update',
    name: 'UpdateImage',
    i18Key: 'updateImage',
    component: FormPhoto,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/photos',
    name: 'Photos',
    i18Key: 'image',
    component: PhotosPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },

  {
    path: '/users/create',
    name: 'AddUser',
    i18Key: 'addUser',
    component: FormUser,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/users/update',
    name: 'UpdateUser',
    i18Key: 'updateUser',
    component: FormUser,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/users',
    name: 'Users',
    i18Key: 'user',
    component: UsersPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },

  {
    path: '/languages/create',
    name: 'AddLanguage',
    i18Key: 'addLanguage',
    component: FormLanguage,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/languages/update',
    name: 'UpdateLanguage',
    i18Key: 'updateLanguage',
    component: FormLanguage,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/languages',
    name: 'Languages',
    i18Key: 'language',
    component: LanguagesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/countries',
    name: 'Countries',
    i18Key: 'country',
    component: CountriesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/countries/create',
    name: 'AddCountry',
    i18Key: 'addCountry',
    component: FormCountry,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/countries/update',
    name: 'UpdateCountry',
    i18Key: 'updateCountry',
    component: FormCountry,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/provinces',
    name: 'Provinces',
    i18Key: 'province',
    component: ProvincesPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/provinces/create',
    name: 'AddProvince',
    i18Key: 'addProvince',
    component: FormProvince,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/provinces/update',
    name: 'UpdateProvince',
    i18Key: 'updateProvince',
    component: FormProvince,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/districts',
    name: 'Districts',
    i18Key: 'district',
    component: DistrictsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/districts/create',
    name: 'AddDistrict',
    i18Key: 'addDistrict',
    component: FormDistrict,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/districts/update',
    name: 'UpdateDistrict',
    i18Key: 'updateDistrict',
    component: FormDistrict,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/wards',
    name: 'Wards',
    i18Key: 'ward',
    component: WardsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/wards/create',
    name: 'AddWard',
    i18Key: 'addWard',
    component: FormWard,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/wards/update',
    name: 'UpdateWard',
    i18Key: 'updateWard',
    component: FormWard,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/folks',
    name: 'Folks',
    i18Key: 'folk',
    component: FolksPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/folks/create',
    name: 'AddFolk',
    i18Key: 'addFolk',
    component: FormFolk,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/folks/update',
    name: 'UpdateFolk',
    i18Key: 'updateFolk',
    component: FormFolk,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/jobs',
    name: 'Jobs',
    i18Key: 'job',
    component: JobsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/jobs/create',
    name: 'AddJob',
    i18Key: 'addJob',
    component: FormJob,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/jobs/update',
    name: 'UpdateJob',
    i18Key: 'updateJob',
    component: FormJob,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/relationships',
    name: 'Relationships',
    i18Key: 'relationship',
    component: RelationshipsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  {
    path: '/relationships/create',
    name: 'AddRelationship',
    i18Key: 'addRelationship',
    component: FormRelationship,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/relationships/update',
    name: 'UpdateRelationship',
    i18Key: 'updateRelationship',
    component: FormRelationship,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    i18Key: 'changePassword',
    component: ChangePasswordPage,
    layout: '/admin',
    exact: true
    // roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/settings',
    name: 'Settings',
    i18Key: 'settings',
    component: SettingsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin']
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   i18Key: 'userProfile',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '/admin'
  // },
  // {
  //   path: '/table',
  //   name: 'Table List',
  //   i18Key: 'tableList',
  //   rtlName: 'قائمة الجدول',
  //
  //   component: TableList,
  //   layout: '/admin'
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   i18Key: 'typography',
  //   rtlName: 'طباعة',
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: '/admin'
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   i18Key: 'icons',
  //   rtlName: 'الرموز',
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: '/admin'
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   i18Key: 'maps',
  //   rtlName: 'خرائط',
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: '/admin'
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   i18Key: 'notifications',
  //   rtlName: 'إخطارات',
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: '/admin'
  // }
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }

  {
    path: '/locations',
    name: 'Location',
    i18Key: 'location',
    component: LocationsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/locations/create',
    name: 'AddLocation',
    i18Key: 'addLocation',
    component: FormLocation,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/locations/update',
    name: 'UpdateLocation',
    i18Key: 'updateLocation',
    component: FormLocation,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },

  {
    path: '/rooms',
    name: 'Room',
    i18Key: 'room',
    component: RoomsPage,
    layout: '/admin',
    exact: true,
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/rooms/create',
    name: 'AddRoom',
    i18Key: 'addRoom',
    component: FormRoom,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  },
  {
    path: '/rooms/update',
    name: 'UpdateRoom',
    i18Key: 'updateRoom',
    component: FormRoom,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user']
  }
];

export default dashboardRoutes;
