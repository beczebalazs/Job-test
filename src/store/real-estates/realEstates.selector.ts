import { createSelector } from "reselect";

import { RootState } from "../";
import { IRealEstates } from "../../types/realEstates.type";

export const realEstatesSelector = (state: RootState) =>
    state["real-estates"].realEstates;

export const selectAllRealEstates = createSelector(
    realEstatesSelector,
    (realEstates: IRealEstates[]) => realEstates
);
