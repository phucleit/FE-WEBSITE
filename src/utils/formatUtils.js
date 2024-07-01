import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export function apiGet(url, headers = {}) {
  return axios.get(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: token,
      ...headers
    }
  });
}

export function apiPost(url, data, headers = {}) {
  return axios.post(url, data, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: token,
      ...headers
    }
  });
}

export function apiPostFile(url, data, headers = {}) {
  return axios.post(url, data, {
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: token,
      ...headers
    }
  });
}

export function apiGetById(url, id, headers = {}) {
  return axios.get(`${url}/${id}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: token,
      ...headers
    }
  });
}

export function apiUpdate(url, id, data, headers = {}) {
  return axios.put(`${url}/${id}`, data, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: token,
      ...headers
    }
  });
}

export function apiUpdateFile(url, id, data, headers = {}) {
  return axios.put(`${url}/${id}`, data, {
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: token,
      ...headers
    }
  });
}

export function apiDelete(url, id, headers = {}) {
  return axios.delete(`${url}/${id}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: token,
      ...headers
    }
  });
}

export function formatPhoneNumber(phoneNumber) {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const formattedNumber = digitsOnly.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  return formattedNumber;
}

export function getCreatedAt(params) {
  if (params) {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  }
}

export function getRegisteredAt(params) {
  if (params) {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  }
}

export function getExpiredAt(params) {
  if (params) {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  }
}

export function convertPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
