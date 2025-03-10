import { ACTION_TYPE } from '../actions';
import { ROLE } from '../../constants';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	email: null,
	phone: null,
	session: null,
};

export const userReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
