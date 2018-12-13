
import { firestore } from '../../firebase'

export default {

  // constants for rejected promises
  error_invalidated: "0972183F-BA7B-49F8-A402-4EA22F33640D",

  // create a draft within the firestore
  createDraft(id, draft) {
    return firestore.collection('drafts').doc(id).set({
      set: draft.set,
      options: draft.options,
      table: JSON.stringify(draft.table)
    });
  },

  // update the draft table
  updateDraftTable(id, writer, invalidator) {

    // get a reference to the draft document
    let docRef = firestore.collection("drafts").doc(id);

    // run the transaction
    return firestore.runTransaction(transaction => {

      // fetch the latest copy of the draft table
      return transaction.get(docRef).then(doc => {

        // read the table
        let table = JSON.parse(doc.data().table);

        // use optional invalidator to confirm we should still perform the write
        if (invalidator && !invalidator(table))
          return Promise.reject(this.error_invalidated);

        // apply the changes using the passed writer
        writer(table);

        // update the database
        transaction.update(docRef, {
          table: JSON.stringify(table)
        });

        // return success
        return Promise.resolve();
      });
    });
  },

  // subscribe to updates
  onDraftTableChanged(id, onchanged) {
    return firestore.collection("drafts").doc(id)
      .onSnapshot(doc => {
        let table = JSON.parse(doc.data().table);
        onchanged(table);
      }, error => {
        // TODO: improve handling
        // eslint-disable-next-line
        console.log(error);
      });
  },

}