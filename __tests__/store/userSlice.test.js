import reducer, {
  saveUserData,
  setPlayerId,
  updatePlayerIDSuccess,
  updateProfileRequest,
  updateProfileRequestSuccess,
} from '../../src/store/slices/userSlice';

describe('userSlice', () => {
  it('saves the token and user data payload', () => {
    const state = reducer(
      undefined,
      saveUserData({
        data: {id: 1, name: 'Ava'},
        token: 'Bearer token',
      }),
    );

    expect(state.token).toBe('Bearer token');
    expect(state.userData).toEqual({id: 1, name: 'Ava'});
  });

  it('falls back to null user fields when saveUserData is called without a payload', () => {
    const state = reducer(undefined, saveUserData());

    expect(state.token).toBeNull();
    expect(state.userData).toBeNull();
  });

  it('tracks profile updates and replaces the user payload on success', () => {
    const pendingState = reducer(undefined, updateProfileRequest());
    const successState = reducer(
      pendingState,
      updateProfileRequestSuccess({id: 2, name: 'Mia'}),
    );

    expect(pendingState.updatingProfile).toBe(true);
    expect(successState.updatingProfile).toBe(false);
    expect(successState.userData).toEqual({id: 2, name: 'Mia'});
  });

  it('keeps the previous profile when no updated payload is returned', () => {
    const initialState = {
      isPlayerIdUpdated: false,
      loading: false,
      playerId: null,
      token: null,
      updatingProfile: true,
      userData: {id: 3, name: 'Sam'},
    };

    const state = reducer(initialState, updateProfileRequestSuccess());

    expect(state.userData).toEqual({id: 3, name: 'Sam'});
    expect(state.updatingProfile).toBe(false);
  });

  it('normalizes empty player ids to null', () => {
    expect(reducer(undefined, setPlayerId('')).playerId).toBeNull();
    expect(reducer(undefined, setPlayerId('null')).playerId).toBeNull();
    expect(reducer(undefined, setPlayerId(undefined)).playerId).toBeNull();
    expect(reducer(undefined, setPlayerId('player-1')).playerId).toBe('player-1');
  });

  it('marks the player id as updated', () => {
    const state = reducer(undefined, updatePlayerIDSuccess());

    expect(state.isPlayerIdUpdated).toBe(true);
  });
});
