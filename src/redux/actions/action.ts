import { Dispatch } from '@reduxjs/toolkit';
import { deleteDraft, deleteTodo } from '../slice/toDoSlice';

export const deleteTodoAndDraft = (id: string) => (dispatch: Dispatch) => {
  dispatch(deleteTodo(id));
  dispatch(deleteDraft(id));
};
