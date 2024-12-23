import FactoryPath from './factory';

const ROOT_PATH = '/accounts';

export const LoginPage = FactoryPath(`${ROOT_PATH}/login`);
export const LogoutPage = FactoryPath(`${ROOT_PATH}/logout`);
export const RegisterPage = FactoryPath(`${ROOT_PATH}/register`);
export const RegisterEmailSendPage = FactoryPath(`${ROOT_PATH}/register/email/send`);
export const RegisterEmailResendPage = FactoryPath(`${ROOT_PATH}/register/email/resend`);
export const PasswordResetPage = FactoryPath(`${ROOT_PATH}/password/reset/email`);
export const PasswordResetEmailSendPage = FactoryPath(`${ROOT_PATH}/password/reset/email/send`);
