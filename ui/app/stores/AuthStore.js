import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';


const CHANGE_EVENT= 'change';

function setToken(token){
  if(!localStorage.getItem('token')){
    localStorage.setItem('token', token);
  }
}

function removeToken(){
  localStorage.removeItem('token');
}

class AuthStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  isLoggedIn() {
    if (localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  getToken() {
    localStorage.getItem('token')
  }

}

const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register( action => {
  switch(action.actionType) {
    case AuthConstants.LOG_IN:
      setToken(action.token);
      AuthStore.emitChange();
      break;
    case AuthConstants.LOG_OUT:
      removeToken();
      AuthStore.emitChange();
      break;
    default:
  }
});

export default AuthStore;
