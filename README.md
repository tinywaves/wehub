# jira-imitation

React18+Hook+TS4 best practices, imitating Jira enterprise-level projects.

## install jira-dev-tool

jira-dev-tool: https://www.npmjs.com/package/jira-dev-tool

### step 1

```shell
yarn add jira-dev-tool@latest
```

### step 2

```shell
npx msw init public
```

## JSON Server

You can use JSON Server for data simulation.

To learn more, check out the [JSON Server GitHub homepage](https://github.com/typicode/json-server).

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

### 2. commitlint

Normalize your submission information.

https://github.com/conventional-changelog/commitlint
