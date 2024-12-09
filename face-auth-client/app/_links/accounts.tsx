import FactoryLink from './factory';

const ROOT_PATH = '/accounts';

export const LoginLink = FactoryLink(`${ROOT_PATH}/login`);
export const LogoutLink = FactoryLink(`${ROOT_PATH}/logout`);
export const RegisterLink = FactoryLink(`${ROOT_PATH}/register`);
