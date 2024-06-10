// import { createContext, useReducer, useState } from "react";
// import { NOTES } from "../../data/dummy-data";


// export const NotesContext = createContext({
//     notes: [],
//     addNote: ({content, updateAt, color, labelIds, isBookmarked}) => {},
//     deleteNote: (id) => {},
//     editNote: (id, {content, updateAt, color, labelIds, isBookmarked}) => {},
// });

// function notesReducer(state, action){
//     switch (action.type){
//         case 'ADD':
//             const id = "n" + Math.random().toString();
//             return [{...action.data},...state]
//         case 'EDIT':
//         case 'DELETE':
//             return state.filter((note) => note.id !== action.data);
//         default:     
//            return state;
//     }
// }
// function NotesContextProvider({children}){
//     const [notesState, dispatch] = useReducer(notesReducer, NOTES);

//     function addNote(noteData){
//         dispatch({type: 'ADD', data: noteData});
//     }

//     function deleteNote(id){
//         dispatch({type: 'DELETE', data: id});
//     }

//     function editNote(id, noteData){
//         dispatch({type: 'EDIT', data: {id: id, data: noteData}});
//     }

//     const value = {
//         notes: notesState,
//         addNote: addNote,
//         deleteNote: deleteNote,
//         editNote: editNote
//     };

//     return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
// }

// export default NotesContextProvider;