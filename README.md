# Code Challenge 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Demo
The app is already deployed on GitHub Pages: https://alejandrabeltramen.github.io/subprocessors-list/

### Some decisions I made while doing this challenge:
- **Routing:** Since it is a SPA, I used `react-router` to allow navigating between different paths and avoid performing new http requests on navigation.
- **Material UI:** Decided to use `material-UI` since it provide a huge set of UI components, allows to override its theme to something custom, helps on taking care of the responsiveness and it also follows accessibility rules under the hood.
- **Reusable CRUD Management table:** The management table looks like something that could be reused for many other items (not only for sub-processors). For that reason, I have created a re-usable table for CRUD operations: it receives a list of items, the headers, the title and it creates a table with those items with actions on each row. Adding, removing and editing items will trigger handlers passed as props.
- **Subprocessors Service:** The Subprocessors Management Page renders the management table and contains the implementation for adding, editing and modifying sub-processors. To do that, It uses a `subprocessorsService` that will actually perform the action on the storage. Currently, the service operates with the local storage, but if that changes (it should actually operate with a backend), the UI will not require any concerning update, only the service implementation will change.
- **Localization:** Copy’s and all strings are isolated in an object. It means that if the application needs to be localized (translated to different languages), just the object would need to change. It could be a json file instead.
- **Form validations:** Decided to use `react-hook-form` lib (recommended by react) to help on form validations. There is also another lib `react-hook-form-mui` which already apply validations to MUI elements. Adding new validations to the inputs will be smoother.
- **Accessibility and keyboard control:** Made the table and the form accessible and usable via keyboard control. Besides that, if we want a more accessible website, then we should use **`rem`** instead of `px`. That’s why I have translated `px` to `rem` by using a utility function`pxToRem()`.  REM does not just apply to font size, but to all sizes as well. When the browser default font size is changed by the user, every size will change accordingly. 
- **Folder Structure:** Created a folder structure that I found coherent to the activity. Further information about the folder structure at the end of the readme.

### Things I would have done with more time: 
- Unit tests.
- Storybook for each new re-usable component: button, card, modal, snackers, table, CRUD management table, confirmation modal.
- I would have added a loading state for asynchronous calls.
- Documentation of the whole feature 
- Table could have been improved by having pagination (virtual scrolling, infinite scrolling, etc). 

### Instructions to run it locally
- `npm install`
- `npms start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building the app for deployment
`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### Folder structure
  - **UI folder:** Contains base stateless UI components (button, modal, etc). They are wrapped material UI components with some style adjustments and some new other components that allows composition without replicating code in the same project. It is good to have these UI components isolated since any change mainly from UX requirements can be made in a single place and be reflected in the whole app. And it can be isolated as a complete UI library with common components that could be used on any repository from the same company extending the effort (and same visual alignments) to other projects.
  - **Layout folder:** They are not base UI components but they are still reusable UI components linked to the feature needs and they work as building blocks for more complex UIs.
  - **Models Folder**: Classes that refers to the entities that are involved on the features.
  - **Pages Folder**: In SPA we still have pages that matches to the url paths. Those usually are stateful components with business logic built by using the UI components.
  - **Theme Folder**: All things related to theme styles, utilities regarding styles, etc can be placed here.
