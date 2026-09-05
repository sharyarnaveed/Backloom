# Backloom

Backloom is a simple command-line tool to scaffold a backend project from ready starter templates. It creates a full project skeleton, replaces placeholders with your project name, and runs `npm install` so the new project is ready to run.

## Quick start

Create a new backend project (interactive):

```bash
npx backloom init
```

Create a project and set the name in one command:

```bash
npx backloom init my-api
```

Or install globally and run directly:

```bash
npm install -g backloom
backloom init my-api
```

After generation:

```bash
cd my-api
npm run dev
```

## What's new / key features

- Project scaffolding with useful backend structure (config, controllers, routes, services, middleware).
- Templates for both Express and Fastify.
- Templates for JavaScript and TypeScript.
- Automatic `npm install` after project creation.
- Automatic project-name replacement in template files (`{{PROJECT_NAME}}`).
- Template resolution works correctly when Backloom is installed from npm.

Current supported template combinations:

- Express + JavaScript
- Express + TypeScript
- Fastify + JavaScript
- Fastify + TypeScript

## CLI usage examples

- Interactive init (prompts for missing values):

```bash
backloom init
```

- Positional project name:

```bash
backloom init my-api
```

- Specify framework:

```bash
backloom init my-api --framework fastify
```

- Specify language:

```bash
backloom init my-api --language javascript
```

- Combined flags:

```bash
backloom init my-api --framework fastify --language typescript
```

- Use `=` syntax if you prefer:

```bash
backloom init my-api --framework=fastify --language=typescript
```

- Standard CLI flags:

```bash
-h, --help      Show help
-v, --version   Show Backloom version
```

## Validation & error handling

Backloom validates input and handles common errors to prevent broken projects:

- Project-name validation: rejects empty names, names with uppercase letters, invalid characters, or names that start/end with `-`.
- Rejects unsupported frameworks or languages.
- Rejects unknown CLI options and detects missing flag values.
- Prevents overwriting an existing directory with the same project name.
- CLI exits with clear error messages and appropriate process exit codes on failure.

## Generated project structure

Generated projects include a useful backend layout. Example:

```text
my-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── ...
├── package.json
└── ...
```

Fastify templates also include a `plugins/` structure for organizing Fastify plugins.

## Useful commands

Show help:

```bash
npx backloom --help
```

Show the installed version:

```bash
npx backloom --version
```

## Notes

- Backloom will not overwrite an existing folder with the same project name; remove or choose a different name first.
- Templates are intentionally small and opinionated to give you a solid starting point — you can customize after generation.

If you'd like, I can also add short examples for how to run the generated projects (e.g., `npm run dev` scripts) or show one template's file list.
