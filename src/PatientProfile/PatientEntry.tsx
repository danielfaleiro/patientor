import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import HospitalPatient from "./HospitalPatient";
import HealthCheckPatient from "./HealthCheckPatient";
import OccupationalPatient from "./OccupationalPatient";
import { List } from "semantic-ui-react";

const PatientEntry: React.FC<{ entry: Entry }> = ({ entry })   => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const [{ diagnoses }] = useStateValue();
  const diagnosis = entry.diagnosisCodes
    ? entry.diagnosisCodes.map(diagnosis => {
      const result = diagnoses.find(x => x.code === diagnosis);
      const name = result ? result.name : undefined;
      return <List.Item key={diagnosis}>{diagnosis} {name}</List.Item>;
    })
    : undefined;

  switch (entry.type) {
    case "Hospital":
      return <HospitalPatient entry={entry} diagnosis={diagnosis} />;
    case "HealthCheck":
      return <HealthCheckPatient entry={entry} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return <OccupationalPatient entry={entry} diagnosis={diagnosis} />;
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;