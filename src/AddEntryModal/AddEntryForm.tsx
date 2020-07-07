import React from "react";
import { Formik, Field } from "formik";
import { HealthCheckRating, EntryType, NewEntry } from "../types";
import { Form, Grid, Button } from "semantic-ui-react";
import { SelectField, TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryFormValidation } from "../utils/formValidation";

const typeOptions = [
  { label: "Hospital", value: EntryType.Hospital},
  { label: "Health Check", value: EntryType.HealthCheck},
  { label: "Occupational Healthcare", value: EntryType.OccupationalHealthcare},
];

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        },
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => EntryFormValidation(values)}
    >
      {({ isValid, dirty, values, isSubmitting, handleSubmit, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui" onSubmit={handleSubmit}>
            <SelectField
              label="Type*"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Description*"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date*"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist*"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            {
              values.type === EntryType.Hospital &&
              <>
                <Field
                  label="Discharge Date*"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria*"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>       
            }
            {
              values.type === EntryType.OccupationalHealthcare &&
              <>
                <Field
                  label="Employer Name*"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }
            {
              values.type === EntryType.HealthCheck &&
              <Field
                label="Health Rating*"
                name="healthCheckRating"
                component={NumberField}
                min={HealthCheckRating.Healthy}
                max={HealthCheckRating.CriticalRisk}
              />
            }
            <p>* fields are required.</p>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid || isSubmitting}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;