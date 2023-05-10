import React from 'react';
import { action } from '@storybook/addon-actions';
import Logout from './Logout';

export default {
  title: 'Logout',
  component: Logout,
};

const Template = (args) => <Logout {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  onLogout: action('loggedOut'),
};