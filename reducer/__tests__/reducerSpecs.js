/**
 * @description
 *
 * @author pkapako
 */
import {combineReducers, createStore} from 'redux';

describe('Test combine reducers lib', () => {
	const reducer1 = (state = {loaded: false, reducer1: false}, action) => {
		switch (action.type) {
			case 'LOAD_REDUCER_1':
				return Object.assign({}, state, {
					loaded: true,
					reducer1: true
				});
			default:
				return state;
		}
	};

	const reducer2 = (state = {loaded: false, reducer2: false}, action) => {
		switch (action.type) {
			case 'LOAD_REDUCER_2':
				return Object.assign({}, state, {
					loaded: true,
					reducer2: true
				});
			default:
				return state;
		}
	};

	it('CombineReducer returns one reducer', () => {

		const result = {
			reducer1: {loaded: true, reducer1: true},
			reducer2: {loaded: false, reducer2: false}
		};

		const reducer = combineReducers({reducer1, reducer2});
		const state = reducer({}, {type: 'LOAD_REDUCER_1'});
		expect(state).to.deep.equal(result);
	});

	it('the store has the same initial state as each reducer', () => {
		const result = {
			reducer1: {loaded: false, reducer1: false},
			reducer2: {loaded: false, reducer2: false}
		};

		const reducer = combineReducers({reducer1, reducer2});
		const store = createStore(reducer);
		const state = store.getState();
		expect(state).to.deep.equal(result);
	});

	it('initial state in createStore overrides init store of each reducer', () => {

		const initState = {
			reducer1: {loaded: true, reducer1: true}
		};

		const result = {
			reducer1: {loaded: true, reducer1: true},
			reducer2: {loaded: false, reducer2: false}
		};

		const reducer = combineReducers({reducer1, reducer2});
		const store = createStore(reducer, initState);
		const state = store.getState();
		expect(state).to.deep.equal(result);

		let action = store.dispatch({type: 'LOAD_REDUCER_2'});

		expect(action).to.deep.equal({type: 'LOAD_REDUCER_2'});
		const nextState = store.getState();
		const nextResult = {
			reducer1: {loaded: true, reducer1: true},
			reducer2: {loaded: true, reducer2: true}
		};
		expect(nextState).to.deep.equal(nextResult);
	})
	
	
	
});