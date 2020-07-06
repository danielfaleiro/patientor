import React from "react";
import { HospitalEntry } from "../types";
import { Item, Icon, Divider, List } from "semantic-ui-react";

const HospitalPatient: React.FC<{ 
  entry: HospitalEntry;
  diagnosis: React.ReactNode | undefined;
 }> = ({ entry, diagnosis }) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header as='h3'>
          {entry.date}
          <Icon name="hospital" size="big" />
        </Item.Header>
        <Item.Meta>
          {entry.description}
        </Item.Meta>
        <Item.Description>
          {entry.discharge.date}: {entry.discharge.criteria}<br />
          <List bulleted>
            {diagnosis}
          </List>
        </Item.Description>
        </Item.Content>
        <Divider />
    </Item>
  );
};

export default HospitalPatient;