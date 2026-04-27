import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../interfaces/types';

interface TodoState {
  todos: Todo[];
  drafts: Todo[];
  editItem: Todo | null;
}
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
      state.todos.push(action.payload);
      state.drafts = state.drafts.filter(
        draft => draft.id !== action.payload.id,
      );
    },

    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map(i =>
        i.id === action.payload.id ? action.payload : i,
      );
      state.editItem = null;
    },

    deleteTodo: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.filter(i => i.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.map(i =>
        i.id === action.payload ? { ...i, favorite: !i.favorite } : i,
      );
    },

    addDraft: (state, action: PayloadAction<Todo>) => {
      state.drafts.push(action.payload);
    },

    deleteDraft: (state, action: PayloadAction<Todo['id']>) => {
      state.drafts = state.drafts.filter(i => i.id !== action.payload);
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleFavorite,
  addDraft,
  deleteDraft,
} = slice.actions;

export default slice.reducer;
