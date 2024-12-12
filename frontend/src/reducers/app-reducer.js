import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
	filter: {
		dateRange: { start: '', end: '' },
		account: '',
		category: '',
	},
};

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen: true,
				},
			};
		case ACTION_TYPE.SET_FILTER_DATE:
			return {
				...state,
				filter: {
					...state.filter,
					dateRange: { ...state.filter.dateRange, ...payload },
				},
			};
		case ACTION_TYPE.REMOVE_FILTER_DATE:
			return {
				...state,
				filter: {
					...state.filter,
					dateRange: initialAppState.filter.dateRange,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
