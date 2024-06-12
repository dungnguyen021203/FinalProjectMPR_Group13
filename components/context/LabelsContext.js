import { createContext, useReducer, useContext } from "react";
import { LABELS } from "../../data/dummy-data";
import { NotesContext } from "./NotesContext";

const initialState = {
  labels: LABELS,
};

function labelsReducer(state, action) {
  switch (action.type) {
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
      const labelIndex = state.labels.findIndex((label) => label.id === action.data);
      if (labelIndex === -1) {
        return state;
      }
      const updatedLabels = [...state.labels.slice(0, labelIndex), ...state.labels.slice(labelIndex + 1)];
      return { ...state, labels: updatedLabels };
    default:
      return state;
  }
}

export const LabelsContext = createContext(initialState);

function LabelsContextProvider({ children }) {
  const [labelsState, dispatch] = useReducer(labelsReducer, initialState);
  const notesCtx = useContext(NotesContext); // Access NotesContext

  function addLabel(label) {
    dispatch({ type: 'ADD_LABEL', data: label });
  }

  function editLabel(id, label) {
    dispatch({ type: 'EDIT_LABEL', data: { id, label } });
  }

  function deleteLabel(id) {
    dispatch({ type: 'DELETE_LABEL', data: id });
    notesCtx.removeLabelFromNotes(id); // Remove label from notes
  }

  const value = {
    labels: labelsState.labels,
    addLabel,
    editLabel,
    deleteLabel,
  };

  return <LabelsContext.Provider value={value}>{children}</LabelsContext.Provider>;
}

export default LabelsContextProvider;
