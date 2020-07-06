import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_DETAILED_PATIENT";
      payload: Patient;
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: {
        id: string;
        entry: Entry;
      };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_DETAILED_PATIENT":
      return {
        ...state,
        detailedPatients: [ ...state.detailedPatients, action.payload ]
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY":
      const detailedPatients = state.detailedPatients.map(p => {
        if (p.id === action.payload.id) {
          p.entries = [ ...p.entries, action.payload.entry ];
          return p;
        }
        return p;
      });
      return {
        ...state,
        detailedPatients: detailedPatients
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload
  };
};

export const addDetailedPatient = (payload: Patient): Action => {
  return {
    type: "ADD_DETAILED_PATIENT",
    payload
  };
};

export const setDiagnisisList = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload
  };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      id, entry
    }
  };
};
