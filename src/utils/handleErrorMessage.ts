import { t } from 'i18next';

export function handleErrorMessage(response){
  const data = response.data.message;
  const errorCode = Array.isArray(data) ? data[0] : data;
  const message = t(`Errors.${errorCode}`);
  return {errorCode, message};
}