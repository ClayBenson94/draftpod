

import * as filters from '../card-filters'
import * as ai from './draft-ai'
import * as cube from './draft-cube'

export default {

  name: "Guilds of Ravnica",

  cube: function(cardsInSet, multiples) {

    // generate default cube
    let cards = cube.defaultCube(cardsInSet, multiples);

    // generate additional guildgates (since 1 appears in every
    // pack we need roughly 2x the multiple of commons)
    return cards.concat(
      cube.cardsForCube(cardsInSet, guildgate, multiples.common)
    );
    
  },

  booster(cards) {

    return [].concat(
      cards(filters.packRareSlot, 1),
      cards(filters.uncommon, 3),
      cards([filters.common, card => !guildgate(card)], 10),
      cards(guildgate, 1),
    );


  },

  pick(deck, pack) {

    return ai.pick(deck, pack);

  }

}

function guildgate(card) {
  const GUILDGATES =  ["Boros Guildgate", "Dimir Guildgate", "Golgari Guildgate",
                       "Izzet Guildgate", "Selesnya Guildgate"];
  return GUILDGATES.indexOf(card.name) >= 0;
}
