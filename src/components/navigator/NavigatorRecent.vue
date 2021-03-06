
<script>

import ColorIcon from  '@/components/core/ColorIcon.vue'
import ContentPanel from '@/components/core//ContentPanel.vue'
import RemoveDraft from './RemoveDraft.vue'

import * as filters from '@/components/core/filters'
import * as selectors from '@/store/modules/draft/selectors'

import { mapGetters } from 'vuex'

export default {
  name: 'NavigatorRecent',

  filters: {
    prettyDate: filters.prettyDate
  },

  components: {
    ContentPanel, ColorIcon, RemoveDraft
  },

  props: {
    draft_history: {
      type: Array,
      required: true
    },
  },

  computed: {
    ...mapGetters([
      'draft'
    ]),
  },

  methods: {
    onDraftNavigate(draft_id) {
      let format = this.draft(draft_id).format;
      this.$router.push({ path: `/${format}/` +  draft_id });
    },
    deckSize(draft_id) {
      return selectors.draftOptions(this.draft(draft_id)).deck_size;
    },
    formatCaption(format) {
      return format === 'draft' ? 'Draft' : 'Sealed';
    }
  },

}

</script>

<template>
  <ContentPanel 
    caption="Recent" 
    class="recent-drafts user-select-none"
  >
    <transition-group 
      v-if="draft_history.length > 0" 
      name="recent-draft-row"
    >
      <div 
        v-for="draft in draft_history" 
        :key="draft.id" 
        class="row align-items-center"
        @click="onDraftNavigate(draft.id)"
      >
        <div class="col-md-3">
          <span class="set-name">
            {{ draft.set_name }}
          </span>
        </div>
        <div class="col-md-2">
          <ColorIcon 
            v-for="color in draft.card_colors" 
            :key="color.name" 
            :color="color"
          />
        </div>
        <div class="col-md-2 text-muted">
          <span>
            {{ formatCaption(draft.format) }}
          </span>
        </div>
        <div class="col-md-2 text-muted">
          <span v-if="draft.picks_complete">
            Deck: {{ draft.deck_total_cards }} / {{ deckSize(draft.id) }}
          </span>
          <span v-else>
            Pack {{ draft.current_pack }}, Pick {{ draft.current_pick }}
          </span>
        </div>
        <div class="col-md-2 text-muted">
          {{ new Date(draft.start_time).toLocaleDateString() }}
        </div>
        <div class="col-md-1 text-muted">
          <RemoveDraft 
            :draft_id="draft.id" 
            remove_source="recent"
          />
        </div>
      </div>
    </transition-group>
    <div 
      v-else 
      class="row no-drafts align-items-center"
    >
      <div class="col-sm-12">
        <div class="text-center text-muted">
          (None available)
        </div>
      </div>
    </div>
  </ContentPanel>
</template>

<style>

.recent-drafts .card-body {
  padding-left: 2.0rem;
  padding-top: 0.8rem;
}

.recent-drafts a {
  color: inherit;
}

.recent-drafts .simple-svg-wrapper {
  display: inline-block;
  margin-right: 13px;
  width: 20px;
}

.recent-drafts .simple-svg-wrapper svg {
  width: 20px;
  padding-bottom: 4px;
}

.recent-drafts .simple-svg-wrapper svg>path {
  fill: #aaa;
}

.recent-drafts .row {
  height: 50px;
}

.recent-drafts .row:hover {
  background-color:rgba(255, 255, 255, 0.075);
  cursor: pointer;
}


.recent-draft-row-enter-active, .recent-draft-row-leave-active {
  transition: all 0.5s;
  max-height: 50px;
}

.recent-draft-row-enter, .recent-draft-row-leave-to {
  opacity: 0;
  transform: translateX(1000px);
  max-height: 0;
}

.recent-drafts .set-name {
  font-size: 1.1em;
}

.recent-drafts .color-icon {
  margin-right: 8px;
  padding-bottom: 2px;
  width: 18px;
}

.recent-drafts .no-drafts {
  height: 80px;
}

</style>