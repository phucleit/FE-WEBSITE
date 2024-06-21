import axios from 'axios';

export function apiGet(url, token, headers = {}) {
  return axios.get(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: token,
      ...headers
    }
  });
}

export function apiDelete(url, id, token, headers = {}) {
  return axios.delete(`${url}/` + id, {
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
