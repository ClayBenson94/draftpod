<script>

import * as selectors from '@/store/modules/draft/selectors'

import PlayersPlayer from './PlayersPlayer.vue'
import PlayersArrow from './PlayersArrow.vue'

export default {
  name: 'PlayersPopup',

  components: {
    PlayersPlayer, PlayersArrow
  },

  props: {
    draft: {
      type: Object,
      required: true
    },
  },

  
  computed: {

    current_pack: function() {
      return this.draft.table.current_pack;
    },
    pass_left: function() {
      return (this.current_pack % 2) > 0;
    },
    picks_complete: function() {
      return this.draft.table.picks_complete;
    },
    options: function() {
      return selectors.draftOptions(this.draft);
    },
    players: function() {
      return this.draft.table.players;
    }
  },

  methods: {
    onShowBotColors(event) {
      event.stopPropagation();
      this.setShowBotColors({ show_bot_colors: true });
    }
  },

  inject: [
    'setShowBotColors'
  ],
}

</script>

<template>
  <div class="players">
    <div class="players-column players-column-left">
      <PlayersPlayer 
        :player="players[0]" 
        :draft="draft"
      />
      <PlayersPlayer 
        :player="players[1]" 
        :draft="draft"
      />
      <PlayersPlayer 
        :player="players[2]" 
        :draft="draft"
      />
      <PlayersPlayer 
        :player="players[3]" 
        :draft="draft"
      />
    </div>

    <div class="players-table">
      <div 
        v-if="!picks_complete" 
        class="pack-number"
      >
        <PlayersArrow 
          v-if="pass_left" 
          corner="top-right"
        />
        <PlayersArrow 
          v-if="pass_left" 
          corner="bottom-left"
        />
        <PlayersArrow 
          v-if="!pass_left" 
          corner="top-left"
        />
        <PlayersArrow 
          v-if="!pass_left" 
          corner="bottom-right"
        />
        Pack {{ current_pack }}
      </div>
      <a 
        v-if="!picks_complete && !options.show_bot_colors && !options.multi_player" 
        class="show-bot-colors"
        @click="onShowBotColors"
      >
        Show bot colors
      </a>
    </div>

    <div class="players-column players-column-right">
      <PlayersPlayer 
        :player="players[7]" 
        :draft="draft"
      />
      <PlayersPlayer 
        :player="players[6]" 
        :draft="draft"
      />
      <PlayersPlayer 
        :player="players[5]" 
        :draft="draft"
      />
      <PlayersPlayer 
        :player="players[4]" 
        :draft="draft"
      />
    </div>
  </div>
</template>

<style>

.players {
  width: 310px;
  height: 290px;
}

.players-menu {
  margin-top: 1px;
}

.player {
  height: 70px;
}

.players-table {
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 80px;
  width: 150px;
  border: 5px solid #aaa;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.players-table .pack-number {
  font-size: 1.1em;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  margin-top: 100px;
}

.players-table .show-bot-colors {
  font-size: 0.7rem;
  padding-top: 5px;
  text-decoration: underline !important;
  cursor: pointer;
}

.players-table .show-bot-colors:hover {
  color: #e9ecef !important;
} 

.players-column {
  position: absolute;
  top: 5px;
  bottom: 5px;
  width: 70px;
}

.players-column-left {
  left: 5px;
}

.players-column-right {
  right: 5px;
}

</style>