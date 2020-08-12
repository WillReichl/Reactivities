import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { combineValidators, isRequired } from 'revalidate';

interface IProps {
  setEditMode: (isEditMode: boolean) => void;
}

const ProfileEditForm: React.FC<IProps> = ({ setEditMode }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    loadingProfile,
    editProfile,
    editingProfile
  } = rootStore.profileStore;
  const [loading] = useState(false);

  const handleFinalFormSubmit = (values: any) => {
    editProfile(values);
    setEditMode(false);
  };

  const validate = combineValidators({
    displayName: isRequired('Display name')
  });

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <FinalForm
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            initialValues={profile}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loadingProfile}>
                <Field
                  placeholder="Display Name"
                  value={profile?.displayName}
                  name="displayName"
                  component={TextInput}
                />
                <Field
                  placeholder="Bio"
                  value={profile?.bio}
                  name="bio"
                  rows={3}
                  component={TextAreaInput}
                />
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  loading={editingProfile}
                  disabled={loading || pristine || invalid}
                />
              </Form>
            )}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ProfileEditForm);
