import { createContext, useReducer } from "react";
import { NOTES, TRASH, LABELS, FOLDERS } from "../../data/dummy-data";

const initialState = {
  notes: NOTES,
  trash: TRASH,
  labels: LABELS,
  folders: FOLDERS,
};

function unifiedReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      const noteId = "n" + Math.random().toString();
      return { ...state, notes: [{ ...action.data, id: noteId }, ...state.notes] };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.data.id ? { ...note, ...action.data } : note
        ),
      };
    case "DELETE_NOTE": {
      const trashIndex = state.trash.findIndex((note) => note.id === action.data);
      if (trashIndex === -1) {
        const noteIndex = state.notes.findIndex((note) => note.id === action.data);
        const updatedNotes = [
          ...state.notes.slice(0, noteIndex),
          ...state.notes.slice(noteIndex + 1),
        ];
        const updatedTrash = [...state.trash, state.notes[noteIndex]];
        return { ...state, notes: updatedNotes, trash: updatedTrash };
      }

      const updatedTrash = [
        ...state.trash.slice(0, trashIndex),
        ...state.trash.slice(trashIndex + 1),
      ];
      return { ...state, trash: updatedTrash };
    }
    case 'RESTORE_NOTE': {
      const restoredNote = state.trash.find((note) => note.id === action.data);
      const restoredNotes = state.trash.filter((note) => note.id !== action.data);
      return {
        ...state,
        notes: [...state.notes, restoredNote],
        trash: restoredNotes,
      };
    }
    case 'RESTORE_ALL_NOTES':
      return { ...state, notes: [...state.notes, ...state.trash], trash: [] };
    case 'DELETE_ALL_PERMANENTLY':
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
    case 'ADD_LABEL':
      const newLabelId = "l" + Math.random().toString();
      return { ...state, labels: [...state.labels, { id: newLabelId, label: action.data }] };
    case 'EDIT_LABEL':
      return {
        ...state,
        labels: state.labels.map((label) =>
          label.id === action.data.id ? { ...label, label: action.data.label } : label
        ),
      };
    case 'DELETE_LABEL':
      const updatedLabels = state.labels.filter((label) => label.id !== action.data);
      return { ...state, labels: updatedLabels };
    default:
      return state;
  }
}

export const UnifiedContext = createContext(initialState);

function UnifiedContextProvider({ children }) {
  const [state, dispatch] = useReducer(unifiedReducer, initialState);

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

  function restoreAllNotes() {
    dispatch({ type: 'RESTORE_ALL_NOTES' });
  }

  function deleteAllNotes() {
    dispatch({ type: 'DELETE_ALL_PERMANENTLY' });
  }

  function emptyTrash() {
    dispatch({ type: 'EMPTY_TRASH' });
  }

  function removeLabelFromNotes(labelId) {
    dispatch({ type: 'REMOVE_LABEL_FROM_NOTES', data: labelId });
  }

  function addLabel(label) {
    dispatch({ type: 'ADD_LABEL', data: label });
  }

  function editLabel(id, label) {
    dispatch({ type: 'EDIT_LABEL', data: { id, label } });
  }

  function deleteLabel(id) {
    dispatch({ type: 'DELETE_LABEL', data: id });
    removeLabelFromNotes(id);
  }

  const value = {
    notes: state.notes,
    trash: state.trash,
    labels: state.labels,
    folders: state.folders,
    addNote,
    deleteNote,
    editNote,
    restoreNote,
    restoreAllNotes,
    deleteAllNotes,
    emptyTrash,
    removeLabelFromNotes,
    addLabel,
    editLabel,
    deleteLabel,
  };

  return <UnifiedContext.Provider value={value}>{children}</UnifiedContext.Provider>;
}

export default UnifiedContextProvider;
