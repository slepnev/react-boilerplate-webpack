import { notification } from '../shared';
import React from 'react';

const errorHandler = (error: any, message?: string) => {
  if (!error && !message) return null;

  if (error && error.response && error.response.status) {
    switch (error.response.status) {
      case 400:
        notification({
          message: 'Вы указали неправильный логин/пароль',
          type: 'error',
        });
        break;
      case 401:
        notification({
          message: 'У Вас закончилась сессия, пожалуйста, авторизуйтесь заново',
          type: 'warning',
        });
        break;
      case 500:
        notification({
          message: message || error.response.data.error.message,
          type: 'error',
        });
        break;
      default:
        notification({
          message: message || error.response.data.error.message,
          type: 'error',
        });
    }
  } else if(error && error.message === "Network Error") {
    notification({
      message: 'Ошибка соединения. Проверьте Ваше подключение к интернету',
      type: 'warning',
    });
  } else if (message) {
    notification({
      message,
      type: 'warning',
    });
  }

};

export default errorHandler;
