import AppDispatcher from '../dispatcher/AppDispatcher';
import WfhConstants from '../constants/WfhConstants';
import { EventEmitter } from 'events';

let _events = [];

const CHANGE_EVENT = 'change';

function setEvents(events){
  _events = events;
}

class EventStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getEvents(){
    return _events;
  }
}

const EventStore = new EventStoreClass();

EventStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.actionType) {
    case WfhConstants.GET_EVENTS:
      setEvents(action.events);
      EventStore.emitChange();
      break;
    case WfhConstants.GET_EVENTS_ERROR:
      alert(action.message);
      EventStore.emitChange();
      break;
    default:
  }

});

export default EventStore;
