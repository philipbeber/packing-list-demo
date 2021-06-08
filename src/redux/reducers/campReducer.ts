import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applyOperationToCamp, Camp, CampOperations } from "../../model";

interface CampState {
  selectedCampId?: string;
  selectedListId?: string;
  camps: Camp[];
  pendingOperations: CampOperations[];
}
export const initialState: CampState = {
  camps: [],
  pendingOperations: []
};

const campSlice = createSlice({
  name: "camp",
  initialState,
  reducers: {
    openCamp(state, action: PayloadAction<string>) {
      state.selectedCampId = action.payload;
    },
    closeCamp(state) {
      state.selectedCampId = undefined;
    },
    openCampList(
      state,
      action: PayloadAction<{
        campId: string;
        listId: string;
      }>
    ) {
      state.selectedListId = action.payload.listId;
    },
    closeCampList(state) {
      state.selectedListId = undefined;
    },
    sendUserOperation(state, action: PayloadAction<CampOperations>) {
      // I.e. an operation that will also be queued and sent to the server
      const operation = action.payload;
      state.pendingOperations.push(operation);
      if (operation.type === "CREATE_CAMP") {
        const newCamp = new Camp(operation.campId, operation.name);
        state.selectedCampId = operation.campId;
        state.camps.push(newCamp);
      } else {
        const camp = state.camps.find((c) => c.id === operation.campId);
        if (camp) {
          applyOperationToCamp(camp, operation);
        }
        return;
      }
    },
    clearCampData() {
      return initialState;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer: campReducer } = campSlice;
export const {
  openCamp,
  closeCamp,
  //openCampList,
  closeCampList,
  sendUserOperation,
  clearCampData
} = actions;
export const openCampList = (campId: string, listId: string) =>
  actions.openCampList({ campId, listId });
// Export the reducer, either as a default or named export
export default campReducer;
