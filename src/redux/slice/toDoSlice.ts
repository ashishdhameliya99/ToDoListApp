import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../interfaces/types';

interface TodoState {
  todos: Todo[];
  drafts: Todo[];
  editItem: Todo | null;
}

const initialState: TodoState = {
  todos: [],
  drafts: [],
  editItem: null,
};

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        item => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.todos[index] = action.payload;
      } else {
        state.todos.push(action.payload);
      }

      state.drafts = state.drafts.filter(
        draft => draft.id !== action.payload.id,
      );
    },

    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    },

    deleteItem: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
      state.drafts = state.drafts.filter(item => item.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.map(item =>
        item.id === action.payload
          ? { ...item, favorite: !item.favorite }
          : item,
      );

      state.drafts = state.drafts.map(item =>
        item.id === action.payload
          ? { ...item, favorite: !item.favorite }
          : item,
      );
    },

    addDraft: (state, action: PayloadAction<Todo>) => {
      const index = state.drafts.findIndex(
        item => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.drafts[index] = action.payload;
      } else {
        state.drafts.push(action.payload);
      }
    },

    deleteDraft: (state, action: PayloadAction<Todo['id']>) => {
      state.drafts = state.drafts.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteItem,
  toggleFavorite,
  addDraft,
  deleteDraft,
} = slice.actions;

export default slice.reducer;
