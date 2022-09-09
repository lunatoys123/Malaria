import { SET_CURRENT_USER } from "../action/Auth_action";
import _ from 'lodash'

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        Authenticated: !(_.isEmpty(action.payload)),
        user: action.payload,
      };
    default:
      return state;
  }
}
