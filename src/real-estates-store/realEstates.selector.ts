import { createSelector } from "reselect";
import { RootState } from "../store";
import { RealEstates } from "./realEstates.slice";

export const realEstatesSelector = (state: RootState) =>
    state["real-estates"].realEstates;

export const selectAllRealEstates = createSelector(
    realEstatesSelector,
    (realEstates: RealEstates[]) => realEstates
);
