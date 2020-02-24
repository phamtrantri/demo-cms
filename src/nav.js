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
// @material-ui/icons
import Home from '@material-ui/icons/HomeOutlined';
import LocalHospital from '@material-ui/icons/LocalHospitalOutlined';
import Language from '@material-ui/icons/LanguageOutlined';
import Person from '@material-ui/icons/PersonOutlineRounded';
import Store from '@material-ui/icons/StorefrontOutlined';
import Security from '@material-ui/icons/SecurityOutlined';
import Feedback from '@material-ui/icons/FeedbackOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';
import CardGiftcard from '@material-ui/icons/CardGiftcardOutlined';
import Apps from '@material-ui/icons/AppsOutlined';
import AssignmentInd from '@material-ui/icons/AssignmentIndOutlined';

const navRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    i18Key: 'dashboard',
    icon: Home,
    layout: '/admin',
    roles: ['cms_admin', 'cms_registration_manager']
  },
  {
    name: 'MedicalGate',
    i18Key: 'medicalGate',
    icon: LocalHospital,
    layout: '/admin',
    roles: ['cms_admin', 'cms_registration_manager'],
    children: [
      {
        path: '/hospital-schedule',
        name: 'HospitalSchedule',
        i18Key: 'workingSchedule',
        layout: '/admin',
        roles: ['cms_admin']
      },
      {
        path: '/appointments',
        name: 'Appointments',
        i18Key: 'appointmentManagement',
        layout: '/admin',
        roles: ['cms_admin', 'cms_registration_manager']
      },
      {
        path: '/consultations',
        name: 'Consultations',
        i18Key: 'consultingManagement',
        layout: '/admin',
        roles: ['cms_admin']
      },
      {
        path: '/process',
        name: 'Processes',
        i18Key: 'process',
        layout: '/admin',
        roles: ['cms_admin']
      },
      {
        path: '/online-medical-examination',
        name: 'OnlineMedicalExamination',
        i18Key: 'onlineMedicalExamination',
        layout: '/admin',
        roles: ['cms_admin']
      }
    ]
  },
  {
    name: 'Departments',
    i18Key: 'department',
    icon: 'content_paste',
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    children: [
      {
        path: '/departments',
        name: 'Departments',
        i18Key: 'departmentManagement',
        layout: '/admin'
      },
      {
        path: '/locations',
        name: 'Locations',
        i18Key: 'locationManagement',
        layout: '/admin'
      },
      {
        path: '/rooms',
        name: 'Rooms',
        i18Key: 'roomManagement',
        layout: '/admin'
      },
      {
        path: '/department-articles',
        name: 'DepartmentArticles',
        i18Key: 'departmentArticle',
        layout: '/admin'
      }
    ]
  },
  {
    name: 'Services',
    i18Key: 'service',
    icon: Apps,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    children: [
      {
        path: '/services',
        name: 'Services',
        i18Key: 'serviceManagement',
        layout: '/admin'
      },
      {
        path: '/service-prices',
        name: 'ServicePrices',
        i18Key: 'servicePrice',
        layout: '/admin'
      },
      {
        path: '/service-price-types',
        name: 'ServicePriceTypes',
        i18Key: 'servicePriceType',
        layout: '/admin'
      },
      {
        path: '/service-articles',
        name: 'ServiceArticles',
        i18Key: 'serviceArticle',
        layout: '/admin'
      }
    ]
  },
  {
    name: 'Doctors',
    i18Key: 'doctor',
    icon: AssignmentInd,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    children: [
      {
        path: '/doctors',
        name: 'Doctors',
        i18Key: 'doctorManagement',
        layout: '/admin'
      },
      {
        path: '/doctor-services',
        name: 'DoctorServices',
        i18Key: 'doctorService',
        layout: '/admin'
      },
      {
        path: '/doctor-departments',
        name: 'DoctorDepartments',
        i18Key: 'doctorDepartment',
        layout: '/admin'
      },
      {
        path: '/doctor-ppp',
        name: 'DoctorPPP',
        i18Key: 'doctorPPP',
        layout: '/admin'
      },
      {
        path: '/doctor-family',
        name: 'DoctorFamily',
        i18Key: 'doctorFamily',
        layout: '/admin'
      },
      {
        path: '/doctor-working-schedules',
        name: 'DoctorWorkings',
        i18Key: 'doctorWorking',
        layout: '/admin'
      },
      {
        path: '/doctor-articles',
        name: 'DoctorArticles',
        i18Key: 'doctorArticle',
        layout: '/admin'
      }
    ]
  },
  {
    name: 'Insurance',
    i18Key: 'insurance',
    icon: Security,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    children: [
      {
        path: '/social-security',
        name: 'SocialSecurity',
        i18Key: 'healthInsuranceSocialSecurity',
        layout: '/admin'
      },
      {
        path: '/guarantees-of-payment',
        name: 'GuaranteesOfPayment',
        i18Key: 'guaranteesOfPayment',
        layout: '/admin'
      },
      {
        path: '/claims',
        name: 'Claims',
        i18Key: 'claims',
        layout: '/admin'
      },
      {
        path: '/contact-support',
        name: 'ContactSupport',
        i18Key: 'contactSupport',
        layout: '/admin'
      }
    ]
  },
  {
    name: 'WebsiteContent',
    i18Key: 'websiteContent',
    icon: Store,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    children: [
      {
        path: '/categories',
        name: 'Categories',
        i18Key: 'category',
        layout: '/admin'
      },
      {
        path: '/pages',
        name: 'Pages',
        i18Key: 'pageIntro',
        layout: '/admin'
      },
      {
        path: '/links',
        name: 'Menus',
        i18Key: 'articleForMenu',
        layout: '/admin'
      },
      {
        path: '/articles',
        name: 'Articles',
        i18Key: 'articleAndVideo',
        layout: '/admin'
      },
      {
        path: '/banner',
        name: 'Banners',
        i18Key: 'banner',
        layout: '/admin'
      },
      {
        path: '/photos',
        name: 'Photos',
        i18Key: 'galleryImage',
        layout: '/admin'
      },
      {
        path: '/highlights',
        name: 'Highlights',
        i18Key: 'highlight',
        layout: '/admin'
      },
      {
        path: '/scientific-conferences',
        name: 'Conferences',
        i18Key: 'conference',
        layout: '/admin'
      },
      {
        path: '/question-answers',
        name: 'Q&A',
        i18Key: 'Q&A',
        layout: '/admin'
      }
    ]
  },
  {
    name: 'Donate',
    i18Key: 'donate',
    icon: CardGiftcard,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    children: [
      {
        path: '/blood-donation',
        name: 'BloodDonation',
        i18Key: 'bloodDonation',
        layout: '/admin'
      },
      {
        path: '/medical-donation',
        name: 'MedicalDonation',
        i18Key: 'medicalDonation',
        layout: '/admin'
      }
    ]
  },
  {
    path: '/users',
    name: 'Users',
    i18Key: 'user',
    icon: Person,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/languages',
    name: 'Languages',
    i18Key: 'language',
    icon: Language,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    i18Key: 'feedback',
    icon: Feedback,
    layout: '/admin',
    roles: ['cms_admin']
  },
  {
    name: 'GeneralData',
    i18Key: 'generalData',
    icon: CardGiftcard,
    layout: '/admin',
    roles: ['cms_admin', 'cms_user'],
    children: [
      {
        path: '/countries',
        name: 'Countries',
        i18Key: 'country',
        layout: '/admin'
      },
      {
        path: '/provinces',
        name: 'Provinces',
        i18Key: 'province',
        layout: '/admin'
      },
      {
        path: '/districts',
        name: 'Districts',
        i18Key: 'district',
        layout: '/admin'
      },
      {
        path: '/wards',
        name: 'Wards',
        i18Key: 'ward',
        layout: '/admin'
      },
      {
        path: '/jobs',
        name: 'Jobs',
        i18Key: 'job',
        layout: '/admin'
      },
      {
        path: '/folks',
        name: 'Folks',
        i18Key: 'folk',
        layout: '/admin'
      },
      {
        path: '/relationships',
        name: 'Relationships',
        i18Key: 'relationship',
        layout: '/admin'
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    i18Key: 'settings',
    icon: Settings,
    layout: '/admin',
    roles: ['cms_admin']
  }
];

export default navRoutes;
