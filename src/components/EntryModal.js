import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { categories } from '../utils/categories';
import { addEntry } from '../utils/mutations';
import { updateEntry } from '../utils/mutations';
import { deleteEntry } from '../utils/mutations';


// Modal component for individual entries.

/* EntryModal parameters:
entry: Data about the entry in question

type: Type of entry modal being opened. 
   This can be "add" (for adding a new entry) or 
   "edit" (for opening or editing an existing entry from table).

user: User making query (The current logged in user). */

export default function EntryModal({ entry, type, user }) {

   // State variables for modal status

   // TODO: For editing, you may have to add and manage another state variable to check if the entry is being edited.

   const [open, setOpen] = useState(false);
   const [name, setName] = useState(entry.name);
   const [link, setLink] = useState(entry.link);
   const [description, setDescription] = useState(entry.description);
   const [category, setCategory] = React.useState(entry.category);
   const [isediting, setIsediting] = useState(false);

   // Modal visibility handlers

   const handleClickOpen = () => {
      setOpen(true);
      setName(entry.name);
      setLink(entry.link);
      setDescription(entry.description);
      setCategory(entry.category);
   };

   const handleClose = () => {
      setOpen(false);
   };

   // Mutation handlers

   // check if name is empty   --> PERSONAL TOUCH!!
   const handleAdd = () => {
      if (name ===""){
      alert("Name is required!")
      return
      }

      const newEntry = {
         name: name,
         link: link,
         description: description,
         user: user?.displayName ? user?.displayName : "GenericUser",
         category: category,
         userid: user?.uid,
      };

      addEntry(newEntry).catch(console.error);
      handleClose();
   };

   // TODO: Add Edit Mutation Handler   --> Looks good
   const handleEdit = (entry) => {
      if (isediting === false)
      setIsediting(true)
      else{
      setIsediting(true);
    
      const updatedEntry = {
        name: name,
        link: link,
        description: description,
        category: category,
        id: entry.id
      };
    
      updateEntry(updatedEntry).catch(console.error);
      handleClose();
      }
    };

   // // TODO: Add Delete Mutation Handler   ---> looks good
   const handleDelete = (entry) => {
      deleteEntry(entry).catch(console.error);
      handleClose();
    };


   // Button handlers for modal opening and inside-modal actions.
   // These buttons are displayed conditionally based on if adding or editing/opening.
   // TODO: You may have to edit these buttons to implement editing/deleting functionality.

   const openButton =
      type === "edit" ? <IconButton onClick={handleClickOpen}>
         <OpenInNewIcon />
      </IconButton>
         : type === "add" ? <Button variant="contained" onClick={handleClickOpen}>
            ADD Entry
         </Button>
            : null;

   const actionButtons = 

      type === "edit" ?
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>handleEdit(entry)} > Edit</Button>
            <Button onClick={()=>handleDelete(entry)}variant="DELETE" color="error">
            Delete
            </Button>
            
         </DialogActions>
         : type === "add" ?
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button variant="contained" onClick={handleAdd}>Add Entry</Button>
            </DialogActions>
            : null;

   return (
      <div>
         {openButton}
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{type === "edit" ? name : "Add Entry"}
            </DialogTitle>
            <DialogContent>
               
               {/* TODO: Feel free to change the properties of these components to implement editing functionality. The InputProps props class for these MUI components allows you to change their traditional CSS properties. */}

               <TextField
                  margin="normal"
                  id="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled = {type === "edit"? (!isediting):(isediting)}
               />
               <TextField
                  margin="normal"
                  id="link"
                  label="Link"
                  placeholder="e.g. https://google.com"
                  fullWidth
                  variant="standard"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  disabled = {type === "edit"? (!isediting):(isediting)}
               />
               <TextField
                  margin="normal"
                  id="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                  multiline
                  maxRows={8}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  disabled = {type === "edit"? (!isediting):(isediting)}
               />

               <FormControl fullWidth sx={{ "margin-top": 20 }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={(event) => setCategory(event.target.value)}
                  >
                     {categories.map((category) => (<MenuItem value={category.id}>{category.name}</MenuItem>))}
                  </Select>
               </FormControl>
            </DialogContent>
            {actionButtons}
         </Dialog>
      </div>
   );
}