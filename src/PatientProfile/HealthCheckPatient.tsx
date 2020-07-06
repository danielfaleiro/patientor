import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Item, List, Icon, Divider } from "semantic-ui-react";

const HealthCheckPatient: React.FC<{ 
  entry: HealthCheckEntry;
  diagnosis: React.ReactNode | undefined;
 }> = ({ entry, diagnosis }) => {
  let icon;
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      icon = <Icon name="heart" size="small" color="green" />;
      break;
    case HealthCheckRating.LowRisk:
      icon = <Icon name="heart" size="small" color="yellow" />;
      break;
    case HealthCheckRating.HighRisk:
      icon = <Icon name="heart" size="small" color="orange" />;
      break;
    case HealthCheckRating.CriticalRisk:
      icon = <Icon name="heart" size="small" color="red" />;
      break;
    default:
      icon = <Icon name="heart" size="small" color="black" />;
  }
  
  return (
    <Item>
      <Item.Header as='h3'>
        {entry.date}
        <Icon name="user md" size="big" />
      </Item.Header>
      <Item.Meta>
        {entry.description}
      </Item.Meta>
      <Item.Content>
        Health Status: {icon}
        <List bulleted>
          {diagnosis}
        </List>
        <Divider />
      </Item.Content>
    </Item>
  );
};

export default HealthCheckPatient;