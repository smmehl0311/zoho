import {checkToken} from '../service/apiClient';

export const checkUserAndAuthToken = ({user, loginSuccess, setIsLoginLoading}) => {
  const authSplit = document.cookie.split('auth-token=');
  const semicolonSplit = authSplit.length > 1 ? authSplit[1].split(';') : void 0;
  const authToken = semicolonSplit ? semicolonSplit[0] : void 0;
  console.log('authToken', authToken)
  if (authToken && !user) {
    setIsLoginLoading(true);
    const username = authToken.split(':')[0];
    checkToken()
      .then(() => {
        loginSuccess(username);
        setIsLoginLoading(false);
      })
      .catch(err => console.log(err));
  }
};
