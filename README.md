# jira-imitation

React18 + Hooks + TS4 best practices, imitating Jira enterprise-level projects.

## install jira-dev-tool

jira-dev-tool: https://www.npmjs.com/package/jira-dev-tool

### step1

```shell
yarn add jira-dev-tool@latest
```

### step2

```shell
npx msw init public
```

## JSON Server

You can use JSON Server for data simulation.

To learn more, check out the [JSON Server GitHub homepage](https://github.com/typicode/json-server).

### (1) install

```shell
yarn add json-server --dev
```

### (2) add `__json_server_mock__/db.json`

```json
{
  "users": [
    {
      "id": 1,
      "name": "name1"
    },
    ```
  ],
  "projects": [
    {
      "id": 1,
      "name": "project1",
      "personId": 1,
      "organization": "organization1",
      "created": 1604989757139
    },
    ```
  ]
}
```

### (3) modify `package.json`

```json
{
  "scripts": {
    "json-server": "json-server __json_server_mock__/db.json --watch"
  }
}
```

### (4) excute mocking

```shell
yarn json-server
```

## other settings

### 1. configure absolute path

Add a configuration to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    ```
  }
}
```

### 2. commitlint

Normalize your submission information.

- https://github.com/conventional-changelog/commitlint
- https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional

#### (1) install

Install commitlint cli and conventional config:

```shell
yarn add @commitlint/{config-conventional,cli}
```

#### (2) configure

Configure commitlint to use conventional config:

```shell
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

#### (3) install Husky

Install Husky v6:

```shell
yarn add husky --dev
```

#### (4) activate hooks

```shell
yarn husky install
```

#### (5) add hook

```shell
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

## optional settings

### 1. prettier

Prettier is an opinionated code formatter.

#### (1) install

First, install Prettier locally:

```shell
yarn add --dev --exact prettier
```

#### (2) .prettierrc.json

Then, create an empty config file to let editors and other tools know you are using Prettier:

```shell
echo {}> .prettierrc.json
```

#### (3) .prettierignore

Next, create a .prettierignore file to let the Prettier CLI and editors know which files to not format. Here’s an example:

```
# Ignore artifacts:
build
coverage
```

#### (4) start format your codes

Now, format all files with Prettier:

```shell
yarn prettier --write .
```

While the above commands need to be executed manually, we can use a tool to implement automatic formatting.

You can use Prettier with a pre-commit tool. This can re-format your files that are marked as “staged” via git add before you commit.

```shell
npx mrm@2 lint-staged
```

#### (5) resolve the conflict between eslint and prettier

```shell
yarn add --dev eslint-config-prettier
```

After the installation is complete, change your package.json file.

```json
...
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
      "prettier"
    ]
  },
...
```

#### (6) reference

- https://prettier.io/docs/en/install.html
- https://prettier.io/docs/en/precommit.html
- https://prettier.io/docs/en/install.html#eslint-and-other-linters

## `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
