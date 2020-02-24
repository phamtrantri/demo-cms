import { client } from './client';
import { accountClient } from './accountClient';
import { CATEGORY_TYPE } from '../constants';

import store from 'store';

interface Pagination {
  page: number;
  pageSize: number;
  status?: number;
}

// auth
export const login = (params: { username: string, password: string }) => {
  return accountClient.post('/v1/account/sign-in', params);
};

export const changePassword = (params: {
  current_password: string,
  new_password: string
}) => {
  return accountClient.put('/v1/account/update-password', params);
};

export const requestResetPassword = (params: {
  account_type: number,
  email: string,
  endpoint: string
}) => {
  // console.log(params);
  return accountClient.post('/v1/account/reset-password-by-email', params);
};

export const resetPassword = (params: { token: string, password: string }) => {
  return accountClient.put('/v1/account/update-password-by-email', params);
};

// info
export const getInfo = () => {
  return client.get('/info');
};

export const updateInfo = ({ id, ...rest }) => {
  return client.put(`/info/${id}`, rest);
};

export const countCountries = ({ status = '' }) => {
  return client.get(`/countries/count?status=${status}`);
};
export const getCountries = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/countries?status=${status}&page=${page}&page_size=${pageSize}`
  );
};
export const getCountry = (id: number) => {
  return client.get(`/countries/${id}`);
};

export const addCountry = params => {
  return client.post('/countries', params);
};

export const updateCountry = ({ _id, ...rest }) => {
  return client.put(`/countries/${_id}`, rest);
};
export const deleteCountry = ({ _id, ...rest }) => {
  return client.delete(`/countries/${_id}`, rest);
};

// data
export const getProvinces = () => {
  return client.get('/provinces');
};
export const getProvincesWithPaging = ({ status = '', page, pageSize }) => {
  return client.get(
    `/provinces/with-paging?status=${status}&page=${page}&page_size=${pageSize}`
  );
};
export const countProvinces = ({ status = '' }) => {
  return client.get(`/provinces/count?status=${status}`);
};
export const getProvince = (id: number) => {
  return client.get(`/provinces/${id}`);
};
export const addProvince = params => {
  return client.post('/provinces', params);
};
export const updateProvince = ({ _id, ...rest }) => {
  return client.put(`/provinces/${_id}`, rest);
};
export const deleteProvince = ({ _id, ...rest }) => {
  return client.delete(`/provinces/${_id}`, rest);
};

export const getDistricts = () => {
  return client.get('/districts');
};
export const getDistrictsWithPaging = ({ status = '', page, pageSize }) => {
  return client.get(
    `/districts/with-paging?status=${status}&page=${page}&page_size=${pageSize}`
  );
};
export const countDistricts = ({ status = '' }) => {
  return client.get(`/districts/count?status=${status}`);
};
export const getDistrict = (id: number) => {
  return client.get(`/districts/${id}`);
};
export const addDistrict = params => {
  return client.post('/districts', params);
};
export const updateDistrict = ({ _id, ...rest }) => {
  return client.put(`/districts/${_id}`, rest);
};
export const deleteDistrict = ({ _id, ...rest }) => {
  return client.delete(`/districts/${_id}`, rest);
};

export const getWardsByDistrict = districtId => {
  return client.get(`/wards/get-by-district?district_id=${districtId}`);
};
export const getWards = ({ status = '', page, pageSize }) => {
  return client.get(
    `/wards?status=${status}&page=${page}&page_size=${pageSize}`
  );
};
export const countWards = ({ status = '' }) => {
  return client.get(`/wards/count?status=${status}`);
};
export const getWard = (id: number) => {
  return client.get(`/wards/${id}`);
};
export const addWard = params => {
  return client.post('/wards', params);
};
export const updateWard = ({ _id, ...rest }) => {
  return client.put(`/wards/${_id}`, rest);
};
export const deleteWard = ({ _id, ...rest }) => {
  return client.delete(`/wards/${_id}`, rest);
};

// resource
export const uploadResource = ({ type, file }) => {
  const form = new FormData();
  form.append('image', file);
  return client.post(`/files/upload/${type}`, form, {
    headers: {
      'Content-Type': 'application/form-data; charset=UTF-8'
    }
  });
};

export const getArticleDoctor = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.BAC_SI}&status=1`
  );
};

export const getArticleDepartment = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.CHUYEN_KHOA}&status=1`
  );
};

export const getArticleService = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.DICH_VU}&status=1`
  );
};

export const getArticleBanner = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.BANNER}&status=1`
  );
};

export const getArticleAppointment = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.DAT_LICH_HEN}`
  );
};

export const getArticleHighlight = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.DIEM_NOI_BAT}`
  );
};

export const getArticleQA = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.HOI_DAP}`
  );
};

export const getArticleConference = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.HOI_NGHI_KHOA_HOC}`
  );
};

export const getArticleIntro = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.INTRO}`
  );
};

export const getArticleProcess = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.QUY_TRINH}`
  );
};

export const getArticleOthers = ({ page, pageSize }: Pagination) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${CATEGORY_TYPE.OTHERS}`
  );
};

// article
export const countArticles = ({
  type,
  status = ''
}: {
  type: number,
  status: number | string
}) => {
  return client.get(`/articles/count?type=${type}&status=${status}`);
};

export const getArticles = ({
  page,
  pageSize,
  type,
  status = ''
}: Pagination & { type: number, status: number | string }) => {
  return client.get(
    `/articles?page=${page}&page_size=${pageSize}&type=${type}&status=${status}`
  );
};

export const getArticle = (id: number) => {
  return client.get(`/articles/${id}`);
};

export const addArticle = params => {
  return client.post('/articles', params);
};

export const updateArticle = ({ _id, ...rest }) => {
  return client.put(`/articles/${_id}`, rest);
};
export const deleteArticle = ({ _id, ...rest }) => {
  return client.delete(`/articles/${_id}`, rest);
};

// category
export const countCategories = ({ status = '' }: { status: number }) => {
  return client.get(`/categories/count?status=${status}`);
};

export const getCategories = ({ page, pageSize, status = '' }: Pagination) => {
  return client.get(
    `/categories?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getCategory = (id: number) => {
  return client.get(`/categories/${id}`);
};

export const addCategory = params => {
  return client.post('/categories', params);
};

export const updateCategory = ({ _id, ...rest }) => {
  return client.put(`/categories/${_id}`, rest);
};
export const deleteCategory = ({ _id, ...rest }) => {
  return client.delete(`/categories/${_id}`, rest);
};
// service
export const countServices = ({ status = '' }: { status: number }) => {
  return client.get(`/services/count?status=${status}`);
};

export const getServices = ({ page, pageSize, status = '' }: Pagination) => {
  return client.get(
    `/services?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getService = (id: number) => {
  return client.get(`/services/${id}`);
};

export const addService = params => {
  return client.post('/services', params);
};

export const updateService = ({ _id, ...rest }) => {
  return client.put(`/services/${_id}`, rest);
};

export const deleteService = ({ _id, ...rest }) => {
  return client.delete(`/services/${_id}`, rest);
};

// service price
export const countServicePrices = ({ status = '' }: { status: number }) => {
  return client.get(`/service-prices/count?status=${status}`);
};

export const getServicePrices = ({
  page,
  pageSize,
  status = '',
  customUrl
}: Pagination) => {
  const url = customUrl
    ? `/service-prices?${customUrl}`
    : `/service-prices?page=${page}&page_size=${pageSize}&status=${status}`;
  return client.get(url);
};

export const getServicePrice = (id: number) => {
  return client.get(`/service-prices/${id}`);
};

export const addServicePrice = params => {
  return client.post('/service-prices', params);
};

export const updateServicePrice = ({ _id, ...rest }) => {
  return client.put(`/service-prices/${_id}`, rest);
};
export const deleteServicePrice = ({ _id, ...rest }) => {
  return client.delete(`/service-prices/${_id}`, rest);
};
// service price types

export const countServicePriceTypes = ({ status = '' }: { status: number }) => {
  return client.get(`/service-price-types/count?status=${status}`);
};

export const getServicePriceTypes = ({
  page,
  pageSize,
  status = ''
}: Pagination) => {
  return client.get(
    `/service-price-types?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getServicePriceType = (id: number) => {
  return client.get(`/service-price-types/${id}`);
};

export const addServicePriceType = params => {
  return client.post('/service-price-types', params);
};

export const updateServicePriceType = ({ _id, ...rest }) => {
  return client.put(`/service-price-types/${_id}`, rest);
};
export const deleteServicePriceType = ({ _id, ...rest }) => {
  return client.delete(`/service-price-types/${_id}`, rest);
};

// doctor
export const countDoctors = ({ status = '' }: { status: number }) => {
  return client.get(`/doctors/count?status=${status}`);
};

export const getDoctors = ({ page, pageSize, status = '' }: Pagination) => {
  return client.get(
    `/doctors/get-all-with-services?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getDoctorsWithServicesAndDepartments = ({
  page,
  pageSize,
  status = ''
}: Pagination) => {
  return client.get(
    `/doctors/get-all-with-services?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getDoctor = (id: number) => {
  return client.get(`/doctors/${id}?department_status=1&service_status=1`);
};

export const addDoctor = params => {
  return client.post('/doctors', params);
};

export const updateDoctor = ({ _id, ...rest }) => {
  return client.put(`/doctors/${_id}`, rest);
};

export const deleteDoctor = ({ _id, ...rest }) => {
  return client.delete(`/doctors/${_id}`, rest);
};

// doctor department
export const countDoctorDepartments = ({ status = '' }: { status: number }) => {
  return client.get(`/doctor-departments/count?status=${status}`);
};

export const getDoctorDepartments = ({
  page,
  pageSize,
  status = ''
}: Pagination) => {
  return client.get(
    `/doctor-departments?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getDoctorDepartment = (id: number) => {
  return client.get(`/doctor-departments/${id}`);
};

export const addDoctorDepartment = params => {
  return client.post('/doctor-departments', params);
};

export const updateDoctorDepartment = ({ _id, ...rest }) => {
  return client.put(`/doctor-departments/${_id}`, rest);
};
export const deleteDoctorDepartment = ({ _id, ...rest }) => {
  return client.delete(`/doctor-departments/${_id}`, rest);
};
// doctor service
export const countDoctorServices = ({ status = '' }: { status: number }) => {
  return client.get(`/doctor-services/count?status=${status}`);
};

export const getDoctorServices = ({
  page,
  pageSize,
  status = ''
}: Pagination) => {
  return client.get(
    `/doctor-services?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getDoctorService = (id: number) => {
  return client.get(`/doctor-services/${id}`);
};

export const addDoctorService = params => {
  return client.post('/doctor-services', params);
};

export const updateDoctorService = ({ _id, ...rest }) => {
  return client.put(`/doctor-services/${_id}`, rest);
};
export const deleteDoctorService = ({ _id, ...rest }) => {
  return client.delete(`/doctor-services/${_id}`, rest);
};

// department
export const countDepartments = ({ status = '' }: { status: number }) => {
  return client.get(`/departments/count?status=${status}`);
};

export const getDepartments = ({ page, pageSize, status = '' }: Pagination) => {
  return client.get(
    `/departments?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getDepartment = (id: number) => {
  return client.get(`/departments/${id}`);
};

export const addDepartment = params => {
  return client.post('/departments', params);
};

export const updateDepartment = ({ _id, ...rest }) => {
  return client.put(`/departments/${_id}`, rest);
};
export const deleteDepartment = ({ _id, ...rest }) => {
  return client.delete(`/departments/${_id}`, rest);
};
// language
export const countLanguages = ({ status = '' }: { status: number }) => {
  return client.get(`/languages/count?status=${status}`);
};

export const getLanguages = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/languages?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getLanguage = (id: number) => {
  return client.get(`/languages/${id}`);
};

export const addLanguage = params => {
  return client.post('/languages', params);
};

export const updateLanguage = ({ _id, ...rest }) => {
  return client.put(`/languages/${_id}`, rest);
};
export const deleteLanguage = ({ _id, ...rest }) => {
  return client.delete(`/languages/${_id}`, rest);
};

// user
export const getUsers = () => {
  const info = store.getState().info;
  const hospital_id = info.data ? info.data.ref_code : null;

  let path = `/v1/account/hospital-agents?partner_id=${hospital_id}`;
  return accountClient.get(path);
};

export const getUser = (id: number) => {
  return accountClient.get(`/v1/account/profile`);
};

export const addUser = params => {
  return accountClient.post('/v1/account/create', params);
};

export const updateUser = ({ id, ...rest }) => {
  return accountClient.put(`/v1/account/profile`, rest);
};

export const deleteUser = ({ id }) => {
  return accountClient.delete(`/auth/user/delete?id=${id}`);
};

// registration
export const countRegistrations = ({ status = '' }: { status: number }) => {
  return client.get(`/registrations/count?status=${status}`);
};

export const getRegistrations = ({
  page,
  pageSize,
  status = '',
  customUrl = ''
}) => {
  const url = customUrl
    ? `/registrations?${customUrl}`
    : `/registrations?page=${page}&page_size=${pageSize}&status=${status}`;
  return client.get(url);
};

export const getRegistration = (id: number) => {
  return client.get(`/registrations/${id}`);
};

export const addRegistration = params => {
  return client.post('/registrations', params);
};

export const updateRegistration = ({ _id, ...rest }) => {
  return client.put(`/registrations/${_id}`, rest);
};

// contact
export const countContacts = ({ status = '' }: { status: number }) => {
  return client.get(`/contacts/count?status=${status}`);
};

export const getContacts = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/contacts?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getContact = (id: number) => {
  return client.get(`/contacts/${id}`);
};

export const addContact = params => {
  return client.post('/contacts', params);
};

export const updateContact = ({ _id, ...rest }) => {
  return client.put(`/contacts/${_id}`, rest);
};
export const deleteContact = ({ _id, ...rest }) => {
  return client.delete(`/contacts/${_id}`, rest);
};

// room
export const countRooms = ({ status = '' }: { status: number }) => {
  return client.get(`/rooms/count?status=${status}`);
};

export const getRooms = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/rooms?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getRoom = id => {
  return client.get(`/rooms/${id}`);
};

export const addRoom = params => {
  return client.post('/rooms', params);
};

export const updateRoom = ({ _id, ...rest }) => {
  return client.put(`/rooms/${_id}`, rest);
};

export const deleteRoom = ({ _id, ...rest }) => {
  return client.delete(`/rooms/${_id}`, rest);
};

// location
export const countLocations = ({ status = '' }: { status: number }) => {
  return client.get(`/locations/count?status=${status}`);
};

export const getLocations = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/locations?page=${page}&page_size=${pageSize}&status=${status}`
  );
};

export const getLocation = id => {
  return client.get(`/locations/${id}`);
};

export const addLocation = params => {
  return client.post('/locations', params);
};

export const updateLocation = ({ _id, ...rest }) => {
  return client.put(`/locations/${_id}`, rest);
};

export const deleteLocation = ({ _id, ...rest }) => {
  return client.delete(`/locations/${_id}`, rest);
};

export const countFolks = ({ status = '' }) => {
  return client.get(`/folks/count?status=${status}`);
};
export const getFolks = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/folks?status=${status}&page=${page}&page_size=${pageSize}`
  );
};
export const getFolk = (id: number) => {
  return client.get(`/folks/${id}`);
};

export const addFolk = params => {
  return client.post('/folks', params);
};

export const updateFolk = ({ _id, ...rest }) => {
  return client.put(`/folks/${_id}`, rest);
};
export const deleteFolk = ({ _id, ...rest }) => {
  return client.delete(`/folks/${_id}`, rest);
};

export const countJobs = ({ status = '' }) => {
  return client.get(`/jobs/count?status=${status}`);
};
export const getJobs = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/jobs?status=${status}&page=${page}&page_size=${pageSize}`
  );
};
export const getJob = (id: number) => {
  return client.get(`/jobs/${id}`);
};

export const addJob = params => {
  return client.post('/jobs', params);
};

export const updateJob = ({ _id, ...rest }) => {
  return client.put(`/jobs/${_id}`, rest);
};
export const deleteJob = ({ _id, ...rest }) => {
  return client.delete(`/jobs/${_id}`, rest);
};

export const countRelationships = ({ status = '' }) => {
  return client.get(`/relationships/count?status=${status}`);
};
export const getRelationships = ({ page, pageSize, status = '' }) => {
  return client.get(
    `/relationships?status=${status}&page=${page}&page_size=${pageSize}`
  );
};
export const getRelationship = (id: number) => {
  return client.get(`/relationships/${id}`);
};

export const addRelationship = params => {
  return client.post('/relationships', params);
};

export const updateRelationship = ({ _id, ...rest }) => {
  return client.put(`/relationships/${_id}`, rest);
};
export const deleteRelationship = ({ _id, ...rest }) => {
  return client.delete(`/relationships/${_id}`, rest);
};

export const countPhotos = ({ status = '' }: { status: number }) => {
  return client.get(`/images/count?status=${status}`);
};

export const getPhotos = ({
  page,
  pageSize,
  status = '',
  customUrl
}: Pagination) => {
  const url = customUrl
    ? `/images?${customUrl}`
    : `/images?page=${page}&page_size=${pageSize}&status=${status}`;
  return client.get(url);
};

export const getPhoto = id => {
  return client.get(`/images/${id}`);
};

export const addPhoto = params => {
  return client.post('/images', params);
};

export const updatePhoto = ({ _id, ...rest }) => {
  return client.put(`/images/${_id}`, rest);
};

export const deletePhoto = ({ _id, ...rest }) => {
  return client.delete(`/images/${_id}`, rest);
};
