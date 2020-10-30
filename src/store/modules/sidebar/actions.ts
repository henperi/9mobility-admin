/* eslint-disable import/no-cycle */
import types from './types';

/**
 * @description Method to toggle the Sidebar
 * @returns reducer action type and payload
 */
export const toggleSidebar = () => ({
  type: types.TOGGLE_SIDEBAR,
});
