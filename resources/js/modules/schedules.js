import axios from 'axios';

export const getSchedules = () => {
  return axios.get('api/schedules').then((response) => {
      return response.data;
  })
};

export const saveSchedule = (schedule) => {
    return axios.post('api/schedules/save', schedule).then((response) => {
        return response.data
    })
};
