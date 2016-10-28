import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import WfhAPI from '../utils/WfhAPI';

export default {

  loginUser: (userid, pwd) => {
    WfhAPI.login('', userid, pwd)
      .then(token => {
          AppDispatcher.dispatch({
          actionType: AuthConstants.LOG_IN,
          token: token
        });
      });
  },

  logOutUser: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOG_OUT
    });
  }

}