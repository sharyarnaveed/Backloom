# Backloom

Backloom is a command-line tool for creating a backend project quickly from a ready starter template.

It asks a few questions, creates the project folder, copies the correct template files, replaces the project name placeholders, and runs `npm install` inside the generated project.

## Run With npx

Create a new backend project:

```bash
npx backloom init
```

Create a project with a name directly:

```bash
npx backloom init my-api
```

Then enter the generated project and start it:

```bash
cd my-api
npm run dev
```

## Install Globally

You can also install it globally:

```bash
npm install -g backloom
```

Then run:

```bash
backloom init my-api
```

## What The Command Does

When you run `backloom init`, Backloom:

- Asks for the project name if you did not pass one.
- Lets you choose a backend framework.
- Lets you choose JavaScript or TypeScript.
- Creates a new project directory.
- Copies the matching backend starter template.
- Replaces `{{PROJECT_NAME}}` placeholders with your project name.
- Runs `npm install` in the new project.
- Shows the next commands to start your backend.

## Current Templates

Backloom currently supports:

- Express with JavaScript
- Express with TypeScript

More templates are planned.

## Useful Commands

Show help:

```bash
npx backloom --help
```

Show the installed version:

```bash
npx backloom --version
```

## Notes

Backloom will not overwrite an existing folder with the same project name. If the folder already exists, choose a different project name or remove the existing folder first.
