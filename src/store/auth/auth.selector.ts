import { RootState } from "../";

export const authTokenSelect = (state: RootState) => state.auth.userToken;
export const authLoading = (state: RootState) => state.auth.loading;
export const authErrorMessage = (state: RootState) => state.auth.error;
