import { createContext, useReducer } from "react";
import { NOTES, TRASH, LABELS } from "../../data/dummy-data";

const initialState = {
  notes: NOTES,
  trash: TRASH,
  labels: LABELS,
};

function notesReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      const id = "n" + Math.random().toString();
      return { ...state, notes: [{ ...action.data, id }, ...state.notes] };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.data.id ? { ...note, ...action.data } : note
        ),
      };
    case "DELETE_NOTE": {
        // Find the note to be deleted from the trash
      const trashIndex = state.trash.findIndex(
          (note) => note.id === action.data.id
      );
      if (trashIndex === -1) {
        // Note not found in trash, found note in the notes array and delete it from the notes array, then move it to the trash array
        const noteIndex = state.notes.findIndex(
          (note) => note.id === action.data
        );
        const updatedNotes = [
            ...state.notes.slice(0, noteIndex),
            ...state.notes.slice(noteIndex + 1),
        ];
          const updatedTrash = [...state.trash, state.notes[noteIndex]];
          return { ...state, notes: updatedNotes, trash: updatedTrash };
        }
  
        // Create a new trash array without the deleted note
        const updatedTrash = [
          ...state.trash.slice(0, trashIndex),
          ...state.trash.slice(trashIndex + 1),
        ];
  
        // Update the state with the modified trash array
        return { ...state, trash: updatedTrash };
      }
    case 'RESTORE_NOTE': {
      const restoredNote = state.trash.find((note) => note.id === action.data.id);
      if (!restoredNote) return state; // Handle potential missing note
      const restoredNotes = state.trash.filter((note) => note.id !== action.data.id);
      return {
        ...state,
        notes: [...state.notes, restoredNote],
        trash: restoredNotes,
      };
    }
    case 'RESTORE_ALL_NOTES': // Add new case for restoring all notes
      return { ...state, notes: [...state.notes, ...state.trash], trash: [] };
    case 'DELETE_ALL_PERMANENTLY': // Add new case for permanent deletion
      return { ...state, trash: [] };
    case 'EMPTY_TRASH':
      return { ...state, trash: [] };
    case 'REMOVE_LABEL_FROM_NOTES':
      return {
        ...state,
        notes: state.notes.map((note) => ({
          ...note,
          labelIds: note.labelIds.filter((labelId) => labelId !== action.data)
        }))
      };
    default:
      return state;
  }
}

export const NotesContext = createContext(initialState);

function NotesContextProvider({ children }) {
    const [notesState, dispatch] = useReducer(notesReducer, initialState);

    function addNote(noteData) {
        dispatch({ type: 'ADD_NOTE', data: noteData });
    }

    function deleteNote(id) {
        dispatch({ type: 'DELETE_NOTE', data: id });
    }

    function editNote(id, noteData) {
        dispatch({ type: 'EDIT_NOTE', data: { id, ...noteData } });
    }

    function restoreNote(id) {
        dispatch({ type: 'RESTORE_NOTE', data: id });
    }

    function restoreAllNotes() { // Implement restore all notes functionality
        dispatch({ type: 'RESTORE_ALL_NOTES' });
    }

    function deleteAllNotes() { // Implement delete all permanently functionality
        dispatch({ type: 'DELETE_ALL_PERMANENTLY' });
    }

    function emptyTrash() {
        dispatch({ type: 'EMPTY_TRASH' });
    }

    function removeLabelFromNotes(labelId) {
      dispatch({ type: 'REMOVE_LABEL_FROM_NOTES', data: labelId });
    }

    const value = {
        notes: notesState.notes,
        trash: notesState.trash,
        labels: notesState.labels,
        addNote,
        deleteNote,
        editNote,
        restoreNote,
        restoreAllNotes, 
        deleteAllNotes, 
        emptyTrash,
        removeLabelFromNotes,
    };

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export default NotesContextProvider;