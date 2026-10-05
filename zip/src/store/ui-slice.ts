import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NotificationData {
  status: 'pending' | 'error' | 'success';
  title: string;
  message: string;
}

interface UiState {
  cartIsVisible: boolean;
  notification: NotificationData | null;
}

const initialState: UiState = { cartIsVisible: false, notification: null };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action: PayloadAction<NotificationData>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;