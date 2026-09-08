# Create Backend CLI

A CLI tool for scaffolding modern backend applications with a consistent, clean, and production-oriented project structure.

Create Backend CLI is designed to reduce the repetitive work involved in starting a new backend project by automatically generating the initial project structure, configuration, boilerplate, and installing dependencies from the command line.

## Status

**Active Development**

This project is currently under active development. 

## What's New

This release adds several user-facing features and improvements to make project generation easier and more flexible:

- Backend scaffolding generator with support for both Express and Fastify.
- JavaScript and TypeScript template support (four templates: Express+JS, Express+TS, Fastify+JS, Fastify+TS).
- Automatic `npm install` after project creation and automatic project-name replacement in generated files.
- CLI improvements: `init` command, positional project name (`backloom init my-api`), `--framework` and `--language` flags (supports `=` syntax), and `--help`/`-h` and `--version`/`-v` flags.
- Robust validation and error handling: project-name validation (no empty names, no uppercase letters, disallowed characters, no leading/trailing `-`), rejects unsupported frameworks/languages, detects unknown options and missing flag values, and prevents overwriting existing directories.
- Generated projects now include a meaningful backend structure (config, controllers, middleware, routes, services); Fastify templates include a `plugins/` structure.

If you want, the release notes can be expanded into a CHANGELOG file or linked to GitHub releases.

### What Has Been Done So Far

- **CLI Entrypoint & Execution Engine**: `src/cli.ts` configured as the CLI binary (`create-backend`), supporting `init` commands, as well as `--help` / `-h` and `--version` / `-v` flags.
- **Interactive Prompts**: Prompts system built using `@inquirer/prompts` (`src/prompts/project-prompts.ts`) for collecting:
  - Project name
  - Framework choice (Express, with Fastify and Hono planned)
  - Language choice (TypeScript, JavaScript)
- **Input Validation**: `src/utils/valication.ts` validating npm package naming conventions (length limits, non-empty, allowed characters, hyphen placement).
- **Filesystem Helpers**: `src/utils/filesystem.ts` implementing directory checks, recursive directory copying, and string replacement across project files (`replaceInDirectory`).
- **Scaffolding Generator Engine**: `src/generator/project-generator.ts` handling directory verification, template directory copying, and replacement of `{{PROJECT_NAME}}` placeholders.
- **Automatic Dependency Installation**: `src/utils/packagemanager.ts` utilizing child process spawning to automatically execute `npm install` in the generated project directory.
- **Project Scaffolding Templates**:
  - Express + JavaScript starter template (`templates/express/javascript`)
  - Express + TypeScript starter template (`templates/express/typescript`)
- **Automated Test Suite**: Comprehensive tests for filesystem helpers, project generator, and input validation using Node.js test runner (`npm test`).
- **Error Handling**: Custom `CLIError` class (`src/utils/errors.ts`) providing user-friendly exception handling.

## Features

- Interactive project setup
- Backend project scaffolding
- Automatic project structure generation
- Configurable project templates
- Automatic package dependency installation (`npm install`)
- Support for CLI flags (`--help`, `--version`)
- Clean and consistent project structure
- Extensible architecture intended for production-oriented backend projects

## Planned Features

- Multiple backend templates (Fastify, Hono)
- Database configuration
- Authentication setup
- Environment configuration
- API boilerplate
- Custom project configurations
- npm package distribution

## Installation

The package is published on npm and is available to use immediately:

```bash
npx backloom init
```

You can also install it globally:

```bash
npm install -g backloom
```

For local development, clone the repository and install the dependencies locally:

```bash
git clone https://github.com/sharyarnaveed/backend-cli.git
cd backend-cli
npm install
```

## Usage

During development, the CLI can be run locally using the project's configured development command:

```bash
npm run dev
```

Or run the build and test scripts:

```bash
npm run build
npm test
```

The published CLI works as:

```bash
npx backloom init
```

Available flags:

```bash
backloom --help     # Show help information
backloom --version  # Output the current CLI version
```

## Example

The goal is to allow developers to create a new backend project without manually setting up initial boilerplate or installing basic dependencies.

For example:

```bash
npx backloom init
```

The CLI will guide the developer through interactive prompts (project name, framework, language), generate the files, and automatically run `npm install`.

A generated project structure may look like:

```text
my-api/
├── src/
│   ├── app.ts (or app.js)
│   └── server.ts (or server.js)
├── node_modules/
├── package.json
├── tsconfig.json
└── ...
```

## Project Structure

```text
backend-cli/
├── dist/                  # Compiled JavaScript files
├── src/
│   ├── config/            # TypeScript interfaces & configuration types
│   ├── generator/         # Core project generator logic
│   ├── prompts/           # Inquirer CLI prompt definitions
│   ├── utils/             # Filesystem, validation, package manager, & error helpers
│   └── cli.ts             # CLI entrypoint script
├── templates/             # Project starter templates
│   └── express/
│       ├── javascript/
│       └── typescript/
├── tests/                 # Unit tests (filesystem, generator, validation)
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### 1. Clone the repository

```bash
git clone https://github.com/sharyarnaveed/backend-cli.git
```

### 2. Enter the project

```bash
cd backend-cli
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the project

```bash
npm run dev
```

### 5. Run tests

```bash
npm test
```

### 6. Build the project

```bash
npm run build
```

## Roadmap

### Core CLI

- [x] Initial project setup
- [x] CLI entry point (`create-backend`)
- [x] Command handling (`init`, `--help`, `--version`)
- [x] Interactive prompts
- [x] Input validation
- [x] Project initialization command

### Project Generation

- [x] Directory generation
- [x] File generation
- [x] Template system (Express JS & TS templates, token replacement)
- [x] Configuration system
- [x] Automatic dependency installation (`npm install` after generation)
- [ ] Additional project templates (Fastify, Hono)
- [ ] PostgreSQL
- [ ] Database configuration
- [ ] Prisma
- [ ] PostgreSQL + Prisma integration

- [ ] Database-aware templates
- [ ] backloom generate
- [ ] backloom generate resource
- [ ] backloom add
- [ ] Redis
- [ ] Authentication
- [ ] Swagger/OpenAPI
- [ ] Docker
- [ ] Testing
- [ ] backloom check
- [ ] backloom doctor
- [ ] backloom routes
- [ ] backloom upgrade
- [ ] Presets
- [ ] Declarative configuration

### Developer Experience

- [x] Clear CLI output
- [x] Helpful error messages
- [x] Comprehensive unit tests
- [ ] Configuration options
- [ ] Custom templates
- [ ] Improved CLI documentation

### Release

- [x] Complete test coverage
- [x] Production build setup (`npm run build`)
- [x] npm package publishing
- [ ] GitHub releases
- [ ] Version `1.0.0`

## Contributing

Contributions are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/my-feature
```

3. Make your changes.
4. Test your changes.
5. Commit your changes.

```bash
git commit -m "feat: add my feature"
```

6. Push your branch.

```bash
git push origin feature/my-feature
```

7. Open a Pull Request.

For larger changes, open an issue first so the proposed change can be discussed.

## Issues

If you find a bug or have a feature request, please open an issue in the GitHub repository.

When reporting a bug, include:

- What you expected to happen
- What actually happened
- Steps to reproduce the issue
- Relevant error messages
- Your Node.js version
- Your operating system

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for more information.

## Author

**Sharyar Naveed**

GitHub: [@sharyarnaveed](https://github.com/sharyarnaveed)

---

⭐ If you find the project useful, consider giving it a star.
