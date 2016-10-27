import AppDispatcher from '../dispatcher/AppDispatcher';
import WfhAPI from '../utils/WfhAPI';
import WfhConstants from '../constants/WfhConstants';

export default {
  getEvents: () => {
    WfhAPI.getEvents('/dummy_data/events.json')
      .then(events => {
        AppDispatcher.dispatch({
          actionType: WfhConstants.GET_EVENTS,
          events: events
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: WfhConstants.GET_EVENTS_ERROR,
          message: message
        });
      })
  }
}