import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import ProfileEditForm from './ProfileEditForm';
import { RootStoreContext } from '../../app/stores/rootStore';

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile, isCurrentUser } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header floated="left" icon="image" content="About User" />
            {isCurrentUser && (
              <Button
                floated="right"
                basic
                content={editMode ? 'Cancel' : 'Edit Profile'}
                onClick={() => setEditMode(!editMode)}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            {editMode ? <ProfileEditForm setEditMode={setEditMode} /> : profile?.bio}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);
