# Contributing

Any forms of contribution are welcome. Include but not limited to:

1. [Submit an issue](https://github.com/UniCourse-TW/Frontend/issues/new) to report bugs or request features.
1. [Open a PR](https://github.com/UniCourse-TW/Frontend/compare) to fix bugs.
2. Check whether [issues](https://github.com/UniCourse-TW/Frontend/issues) are still valid in current version. You may need to setup [UniCourse backend](https://github.com/UniCourse-TW/Backend) in your local development environment.
3. Add missing tests.
4. Answer questions from our community on [Discussions](https://github.com/UniCourse-TW/UniCourse/discussions) and [Discord](https://discord.gg/aDUjjDf3yZ).

If you need to any help from maintainers and the community, you can join our [Discord server](https://discord.gg/aDUjjDf3yZ).

## Development Tools

We use many tools to help our development process.

### Used in Our Product

#### Vue 3

Vue is a modern javascript framework that helps us to build responsive web in a fast and efficient way. 

We choose Vue 3 as our frontend framework.

#### Vue Router

The official Vue router which helps us to navigate between different pages.

#### Pinia

You may know Vuex, which is a state management tool for Vue.

Pinia is something like Vuex, but better and well-typed.

#### TailwindCSS

TailwindCSS is a CSS framework that provides a set of useful CSS util classes, which is perfect for building a modern, responsive, and highly customizable web app.

#### Octicons

Octicons provides GitHub's icons, which are imported in our project by unplugin-icons.

Browse Octicons: https://icones.js.org/collection/octicon

### Used in Development

#### Vite

Vite provides a blazing fast and easy configurable dev server, which makes us able to develop and debug our web app efficiently.

#### TypeScript

We use TypeScript to make our code more safe and maintainable.

#### Prettier & ESLint

Prettier helps us to format our code with a consistent style and ESLint helps us to check our code for coding style consistency.

#### Storybook

Storybook is a powerful tool that helps us to develop our UI components and find the best way to use them.

## Project Structure

### `.github`

GitHub CI Workflow settings.

### `.storybook`

Storybook server settings.

### `.vscode`

VS Code settings, including suggested extensions.

### `public`

Files in this folder will be placed in the root of the generated website.

### `src`

The most important part of this project.

All source code are placed in this folder, including product code and *stories*.
