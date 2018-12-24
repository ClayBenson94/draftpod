

import * as cube from './cube'
import * as filters from '../card-filters'
import * as booster from './booster'

export default {

  name: "Unstable",

  pack_cards: 14,

  cube: cube.build,

  booster(selectCards) {

    let cards = [].concat(
      selectCards(contraption, 2),
      selectCards(unstableFilter(booster.packRareSlot), 1),
      selectCards(unstableFilter(booster.uncommon), 4),
      selectCards(unstableFilter(booster.common), 7)
    );

    return cards;
  },

}

export function contraption(card) {
  return card.type_line.includes("Contraption");
}

function unstableFilter(boosterFilter) {
  return boosterFilter.map(filter => filters.join(filter, card => !contraption(card)));
}



