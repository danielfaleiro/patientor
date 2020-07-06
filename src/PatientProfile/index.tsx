import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Patient, Gender, Entry, NewEntry } from "../types";
import { Icon, Divider, Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue, addDetailedPatient, addEntry } from "../state";
import PatientEntry from "./PatientEntry";
import AddEntryModal from "../AddEntryModal";

const GenderIcon: React.FC<{ gender: string }> = ({ gender }) => {
  if (gender === Gender.Male)
    return <Icon name="mars" />;
  if (gender === Gender.Female)
    return <Icon name="venus" />;
  return <Icon name="genderless" />;
};

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [{ detailedPatients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: entry } = await Axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, entry));
      closeModal();
    } catch (e) {
      console.error('ERROR: ', e.response.data);
      setError(e.response.data);
    }
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }
    const fetchPatient = async () => {
      try {
        const { data } = await Axios.get(`${apiBaseUrl}/patients/${id}`);
        dispatch(addDetailedPatient(data));
        setPatient(data);
      } catch(e) {
        console.error(e);
      } 
    };
    
    const detailedPatient = detailedPatients.find((a) => id === a.id);

    if (detailedPatient) {
      setPatient(detailedPatient);
    } else {
      fetchPatient();
    }
  }, [setPatient, id, dispatch, detailedPatients]);

  if (!patient) {
    return <div>Loading Patient...</div>;
  }

  const entries = patient.entries
    ? patient.entries.map(entry => <PatientEntry key={entry.id} entry={entry} />)
    : undefined;

  return (
    <div>
      <h1>
        {patient.name}
        <GenderIcon gender={patient.gender} />
      </h1>
      <p>
        SSN: {patient.ssn}<br />
        Occupation: {patient.occupation}<br />
      </p>
      <h2>Entries</h2>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <Divider />
      {entries}
    </div>
  );
};

export default PatientProfile;