import { NewEntry, NewHospitalEntry, NewOccupationalHealthCareEntry, EntryType } from "../types";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";

interface ErrorInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [field: string]: any;
}

const isDateValid = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);
const shortError = (field: string) => `${field} length is too short.`;
const requiredError = "Field is required";
const dateError = "Date format should be YYYY-MM-DD";

export const PatientFormValidation = (values: PatientFormValues): ErrorInterface => {
  const errors: ErrorInterface = {};
  const { name, ssn, dateOfBirth, occupation } = values;
  const isSSNValid = (snn: string) => /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/.test(snn);

  if (!name) {
    errors.name = requiredError;
  } else if (name.length < 3) {
    errors.name = shortError("Name");
  }
  if (!ssn) {
    errors.ssn = requiredError;
  } else if (!isSSNValid(ssn)) {
    errors.ssn = "SSN is not valid";
  }
  if (!dateOfBirth) {
    errors.dateOfBirth = requiredError;
  } else if (!isDateValid(dateOfBirth)) {
    errors.dateOfBirth = dateError;
  }
  if (!occupation) {
    errors.occupation = requiredError;
  } else if (occupation.length < 2) {
    errors.occupation = shortError("Occupation");
  }
  return errors;
};

export const EntryFormValidation = (values: NewEntry): ErrorInterface => {
  const { date, description, specialist, type } = values;
  const discharge = (values as NewHospitalEntry).discharge;
  const employerName = (values as NewOccupationalHealthCareEntry).employerName;
  const sickLeave = (values as NewOccupationalHealthCareEntry).sickLeave;
  const errors: ErrorInterface = {};
  
  if (!description) {
    errors.description = requiredError;
  } else if (description.length < 3) {
    errors.description = shortError("Description");
  }
  if (!date) {
    errors.date = requiredError;
  } else if (!isDateValid(date)) {
    errors.date = dateError;
  }
  if (!specialist) {
    errors.specialist = requiredError;
  } else if (specialist.length < 3) {
    errors.specialist = shortError("Specialist Name");
  }
  switch(type) {
    case EntryType.Hospital:
      if (!discharge.date) {
        errors.discharge = { ...errors.discharge, date: requiredError };
      } else if (!isDateValid(discharge.date)) {
        errors.discharge = { ...errors.discharge, date: dateError };
      }
      if (!discharge.criteria) {
        errors.discharge = { ...errors.discharge, criteria: requiredError };
      } else if (discharge.criteria.length < 3) {
        errors.discharge = { ...errors.discharge, criteria: shortError("Discharge Criteria") };
      }
      break;
    case EntryType.HealthCheck:
      break;
    case EntryType.OccupationalHealthcare:
      if (!employerName) {
        errors.employerName = requiredError;
      } else if (employerName.length < 3) {
        errors.description = shortError("Employer Name");
      }
      if (sickLeave?.startDate && !isDateValid(sickLeave.startDate)) {
        errors.sickLeave = { ...errors.sickLeave, startDate: dateError };
      }
      if (sickLeave?.endDate && !isDateValid(sickLeave?.endDate)) {
        errors.sickLeave = { ...errors.sickLeave, endDate: dateError };
      }
      break;
    default:
      throw new Error(`Unhandled type on entry form: ${values.type}`);
  }
  return errors;
};