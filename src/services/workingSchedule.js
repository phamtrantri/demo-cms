import { client } from './client';

interface Pagination {
  page: number;
  pageSize: number;
  status?: number;
}

export const countWorkingSchedules = ({ status = '' }: { status: number }) => {
  return client.get(`/doctors/count?status=${status}`);
};

export const getWorkingSchedules = ({
  page,
  pageSize,
  status = '',
  customUrl
}: Pagination) => {
  const url = customUrl
    ? `/working-schedules?${customUrl}`
    : `/working-schedules?page=${page}&page_size=${pageSize}&status=${status}`;
  return client.get(url);
};

export const getWorkingSchedule = id => {
  return client.get(`/working-schedules/${id}`);
};

export const addWorkingSchedule = params => {
  return client.post('/working-schedules', params);
};

export const updateWorkingSchedule = ({ _id, ...rest }) => {
  return client.put(`/working-schedules/${_id}`, rest);
};

export const deleteWorkingSchedule = ({ _id, ...rest }) => {
  return client.delete(`/working-schedules/${_id}`, rest);
};
