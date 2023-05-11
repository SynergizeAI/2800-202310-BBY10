import React from 'react';
import { action } from '@storybook/addon-actions';
import ForgotPassword from './ForgotPassword';

export default {
  title: 'ForgotPassword',
  component: ForgotPassword,
};

const Template = (args) => <ForgotPassword {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  onCancel: action('cancelForgotPassword'),
};