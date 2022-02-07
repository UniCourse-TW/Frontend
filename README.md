# ✨ UniCourse Frontend ✨

🦄 The frontend of UniCourse, a modern course information platform for NTNU students.

![UniCourse Logo](https://unicourse-tw.github.io/Public-Assets/banner/UniCourse_banner_transparentBG.svg)

## 🏠 How to Setup?

### 1. Install Node 16+

Install Node.js through NVM is recommended.

### 2. Install PNPM

PNPM is a package manager for Node, which is faster than NPM (and Yarn).

### 3. Install Dependencies

Run `pnpm i` to install all dependencies you need in this project.

### 4. Done

Congratulation! You can now run `pnpm run dev` to start the dev server!

## ⚙️ Development Tools

We use many tools to help our development process.

### 📦 Used in Our Product

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

### ⚡️ Used in Development

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
