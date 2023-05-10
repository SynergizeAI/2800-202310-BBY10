// YourComponent.stories.ts|tsx

import Signup from './Signup';

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Signup',
    component: Signup,
  };
  
  export const FirstStory = {
    args: {
      //👇 The args you need here will depend on your component
    },
  };