export function formatPhoneNumber(phoneNumber) {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const formattedNumber = digitsOnly.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  return formattedNumber;
}

export function getCreatedAt(params) {
  var timeStamp = params.row.createdAt;
  var date = new Date(timeStamp).toLocaleDateString('vi-VI');
  var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
  return date + ' ' + time;
}

export function getRegisteredAt(params) {
  var timeStamp = params.row.registeredAt;
  var date = new Date(timeStamp).toLocaleDateString('vi-VI');
  var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
  return date + ' ' + time;
}

export function getExpiredAt(params) {
  var timeStamp = params.row.expiredAt;
  var date = new Date(timeStamp).toLocaleDateString('vi-VI');
  var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
  return date + ' ' + time;
}
