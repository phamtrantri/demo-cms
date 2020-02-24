export const DEV = process.env.NODE_ENV === 'development';

export const DEFAULT_PAGE_SIZE = 200;

export const storageKeys = {
  TOKEN: 'token',
  USER: 'user'
};

export const actionSuffixes = {
  GET_ALL_AJAX: 'GET_ALL_AJAX',
  GET_ALL_SUCCEEDED: 'GET_ALL_SUCCEEDED',
  GET_ALL_FAILED: 'GET_ALL_FAILED',
  GET_ALL_CLEAN: 'GET_ALL_CLEAN',
  GET_ALL_CANCELLED: 'GET_ALL_CANCELLED',

  GET_AJAX: 'GET_AJAX',
  GET_SUCCEEDED: 'GET_SUCCEEDED',
  GET_FAILED: 'GET_FAILED',
  GET_CLEAN: 'GET_CLEAN',
  GET_CANCELLED: 'GET_CANCELLED',

  INSERT_AJAX: 'INSERT_AJAX',
  INSERT_SUCCEEDED: 'INSERT_SUCCEEDED',
  INSERT_FAILED: 'INSERT_FAILED',
  INSERT_CLEAN: 'INSERT_CLEAN',
  INSERT_CANCELLED: 'INSERT_CANCELLED',

  UPDATE_AJAX: 'UPDATE_AJAX',
  UPDATE_SUCCEEDED: 'UPDATE_SUCCEEDED',
  UPDATE_FAILED: 'UPDATE_FAILED',
  UPDATE_CLEAN: 'UPDATE_CLEAN',
  UPDATE_CANCELLED: 'UPDATE_CANCELLED',

  DELETE_AJAX: 'DELETE_AJAX',
  DELETE_SUCCEEDED: 'DELETE_SUCCEEDED',
  DELETE_FAILED: 'DELETE_FAILED',
  DELETE_CLEAN: 'DELETE_CLEAN',
  DELETE_CANCELLED: 'DELETE_CANCELLED'
};

export const ajaxSuffixes = {
  AJAX_CALL: '_AJAX',
  AJAX_CALL_SUCCEEDED: '_SUCCEEDED',
  AJAX_CALL_FAILED: '_FAILED',
  AJAX_CALL_CANCELLED: '_CANCELLED'
};

export const CATEGORY_TYPE = {
  OTHERS: -1,
  INTRO: 0,
  BANNER: 1,
  QUY_TRINH: 2,
  DIEM_NOI_BAT: 3,
  HOI_NGHI_KHOA_HOC: 4,
  HOI_DAP: 5,
  DAT_LICH_HEN: 6,
  BAC_SI: 7,
  DICH_VU: 8,
  CHUYEN_KHOA: 9,
  MENU: 10
};

export const CATEGORY_TYPE_MAP = {
  '-1': 'Khác',
  0: 'Phần Giới thiệu',
  1: 'Phần Banner',
  2: 'Phần Quy trình',
  3: 'Phần Điểm nổi bật',
  4: 'Phần Hội nghị khoa học',
  5: 'Phần Hỏi đáp',
  6: 'Phần Đặt lịch hẹn',
  7: 'Phần Bác sĩ',
  8: 'Phần Dịch vụ',
  9: 'Phần Chuyên khoa',
  10: 'Menu'
};

export const SELECT_CATEGORY_TYPE = [
  {
    value: -1,
    label: 'Khác'
  },
  {
    value: 0,
    label: 'Phần Giới thiệu'
  },
  {
    value: 1,
    label: 'Phần Banner'
  },
  {
    value: 2,
    label: 'Phần Quy trình'
  },
  {
    value: 3,
    label: 'Phần Điểm nổi bật'
  },
  {
    value: 4,
    label: 'Phần Hội nghị khoa học'
  },
  {
    value: 5,
    label: 'Phần Hỏi đáp'
  },
  {
    value: 6,
    label: 'Phần Đặt lịch hẹn'
  },
  {
    value: 7,
    label: 'Phần Bác sĩ'
  },
  {
    value: 8,
    label: 'Phần Dịch vụ'
  },
  {
    value: 9,
    label: 'Phần Chuyên khoa'
  },
  {
    value: 10,
    label: 'Menu'
  }
];

export const MENU = {
  DICH_VU: 1,
  GIOI_THIEU: 2,
  CHUYEN_KHOA: 3,
  DOI_NGU_BAC_SI: 4,
  HUONG_DAN: 5,
  TIN_TUC_SU_KIEN: 6,
  LIEN_HE: 7
};

export const MENU_MAP = {
  1: 'Dịch vụ',
  2: 'Giới thiệu',
  3: 'Chuyên khoa',
  4: 'Đội ngũ bác sĩ',
  5: 'Hướng dẫn',
  6: 'Tin tức sự kiện',
  7: 'Liên hệ'
};

export const SELECT_MENU = [
  {
    value: 1,
    label: 'Dịch vụ'
  },
  {
    value: 2,
    label: 'Giới thiệu'
  },
  {
    value: 3,
    label: 'Chuyên khoa'
  },
  {
    value: 4,
    label: 'Đội ngũ bác sĩ'
  },
  {
    value: 5,
    label: 'Hướng dẫn'
  },
  {
    value: 6,
    label: 'Tin tức sự kiện'
  },
  {
    value: 7,
    label: 'Liên hệ'
  }
];

export const USER_ROLE = {
  ADMIN: 'cms_admin',
  USER: 'cms_user'
};

export const DAYS = [2, 3, 4, 5, 6, 7, 8];

export const HOURS = new Array(24).fill(1).map((i, idx) => idx);

export const MINUTES = [0, 15, 30, 45];

export const COMMON_STATUS = [
  { value: '1', label: 'active' },
  { value: '2', label: 'inactive' }
];

export const GENDER_STATUS = {
  '1': 'Nam',
  '2': 'Nữ'
};

export const ALL_STATUS = '-1';
export const INACTIVE_STATUS = '2';

export const REGISTRATION_T_STATUS = [
  { value: '1', label: 'new' },
  { value: '2', label: 'accept' },
  { value: '3', label: 'examined' },
  { value: '4', label: 'canceled' },
  { value: '5', label: 'expired' }
];

export const REGISTRATION_STATUS = {
  '1': 'Mới',
  '2': 'Chấp nhận',
  '3': 'Đã khám',
  '4': 'Đã huỷ',
  '5': 'Hết hạn'
};
export const REGISTRATION_IS_VERIFIED = {
  '0': 'Chưa kích hoạt',
  '1': 'Đã kích hoạt'
};
export const REGISTRATION_IS_VERIFIED_T = [
  { value: 0, label: 'Chưa kích hoạt' },
  { value: 1, label: 'Đã kích hoạt' }
];
