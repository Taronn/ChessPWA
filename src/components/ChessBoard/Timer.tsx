import { Icon, List, ListItem } from 'framework7-react';

export function Timer() {
  return (
    <List>
      <ListItem title="5:00"><Icon material="access_time" slot="before-title" className="margin-horizontal-half"/></ListItem>
    </List>
  );
}