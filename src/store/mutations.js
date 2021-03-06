
import Vue from 'vue'
export const SET_PLAYER_INFO = 'SET_PLAYER_INFO'
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES'
export const SET_DRAFT = 'SET_DRAFT'
export const REMOVE_DRAFTS = 'REMOVE_DRAFTS'
export const SET_CARDPOOL = 'SET_CARDPOOL'
export const REMOVE_CARDPOOL = 'REMOVE_CARDPOOL'
export const SET_FIREBASE_ERROR = 'SET_FIREBASE_ERROR'

import _omit from 'lodash/omit'

export default {

  [SET_PLAYER_INFO](state, player) {
    
    // update the player id
    state.player = {
      ...state.player,
      ...player
    }
  
  },

  [UPDATE_PREFERENCES](state, prefs) {
    
    // global preferences
    state.preferences = {
      ...state.preferences,
      ...prefs
    }
    
    // set preferences
    if (!state.preferences.sets[prefs.set_code])
      Vue.set(state.preferences.sets, prefs.set_code, {});
    Vue.set(state.preferences.sets[prefs.set_code], "cardpool", prefs.cardpool);  
  },

  [SET_DRAFT](state, { draft_id, draft }) {
    Vue.set(state.drafts, draft_id, draft);
  },

  [REMOVE_DRAFTS](state, draft_ids) {
    removeDrafts(state, draft_ids);
  },

  [SET_CARDPOOL](state, { set_code, name, cards }) {

    // ensure we have a key for this set
    if (!state.cardpools[set_code])
      Vue.set(state.cardpools, set_code, {});

    // set the cardpool
    Vue.set(state.cardpools[set_code], name, {
      cards,
      updated: new Date().getTime()
    })
  },

  [REMOVE_CARDPOOL](state, { set_code, name }) {
    Vue.delete(state.cardpools[set_code], name);
  },

  [SET_FIREBASE_ERROR](state, error ) {
    if (error) {
      Vue.set(state, "firebase_error", {
        code: error.code,
        name: error.name,
        message: error.message
      });
    } else {
      Vue.set(state, "firebase_error", null);
    }
  },

}

function removeDrafts(state, draft_ids) {
  state.drafts = _omit(state.drafts, draft_ids);
}