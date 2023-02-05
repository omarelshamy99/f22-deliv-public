import { unstable_ownerWindow } from "@mui/utils";
import { addDoc, collection, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from './firebase';

// Functions for database mutations

export const emptyEntry = {
   name: "",
   link: "",
   description: "",
   user: "",
   category: 0,
}

export async function addEntry(entry) {
   await addDoc(collection(db, "entries"), {
      name: entry.name,
      link: entry.link,
      description: entry.description,
      user: entry.user,
      category: entry.category,
      // The ID of the current user is logged with the new entry for database user-access functionality.
      // You should not remove this userid property, otherwise your logged entries will not display.
      userid: entry.userid,
   });
}

export async function updateEntry(entry) {
   
   // TODO: Create Mutation to Edit Entry  --> Looks Good
   await updateDoc(doc(db, "entries", entry.id), {
      name: entry.name,
      link: entry.link,
      description: entry.description,
      category: entry.category,
      // The ID of the current user is logged with the new entry for database user-access functionality.,
   });
}

export async function deleteEntry(entry) {

   // TODO: Create Mutation to Delete Entry --> Looks good
   await deleteDoc(doc(db, "entries", entry.id));
}