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
		searchPhrase: '',
	},
	error: null,
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
		case ACTION_TYPE.RESET_FILTER_DATE:
			return {
				...state,
				filter: {
					...state.filter,
					dateRange: initialAppState.filter.dateRange,
				},
			};
		case ACTION_TYPE.SET_FILTER_ACCOUNT:
			return {
				...state,
				filter: {
					...state.filter,
					account: payload,
				},
			};
		case ACTION_TYPE.RESET_FILTER_ACCOUNT:
			return {
				...state,
				filter: {
					...state.filter,
					account: initialAppState.filter.account,
				},
			};
		case ACTION_TYPE.SET_FILTER_CATEGORY:
			return {
				...state,
				filter: {
					...state.filter,
					category: payload,
				},
			};
		case ACTION_TYPE.SET_SEARCH_PHRASE:
			return {
				...state,
				filter: {
					...state.filter,
					searchPhrase: payload,
				},
			};
		case ACTION_TYPE.RESET_FILTER_CATEGORY:
			return {
				...state,
				filter: {
					...state.filter,
					category: initialAppState.filter.category,
				},
			};
		case ACTION_TYPE.SET_APP_ERROR:
			return {
				...state,
				error: payload,
			};
		case ACTION_TYPE.RESET_APP_ERROR:
			return {
				...state,
				error: initialAppState.error,
			};
		case ACTION_TYPE.RESET_FILTERS:
			return {
				...state,
				filter: initialAppState.filter,
			};
		case ACTION_TYPE.SET_IS_LOADING:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					...payload,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
