import React from "react";
import { OccupationalHealthCareEntry } from "../types";
import { Item, Icon, Divider, List } from "semantic-ui-react";

const OccupationalPatient: React.FC<{
  entry: OccupationalHealthCareEntry;
  diagnosis: React.ReactNode | undefined;
}> = ({ entry, diagnosis }) => {
  return (
    <Item>
      <Item.Header as="h3">
        {entry.date}
        <Icon name="stethoscope" size="big" />
      </Item.Header>
      <Item.Meta>
        {entry.description}
      </Item.Meta>
      <Item.Content>
        Employer name: {entry.employerName}<br />
        {
          entry.sickLeave &&
          `Sick leave: ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`
        }
        <List bulleted>
          {diagnosis}
        </List>
        <Divider />
      </Item.Content>
    </Item>
  );
};

export default OccupationalPatient;