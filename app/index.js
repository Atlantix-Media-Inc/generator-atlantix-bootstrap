import Generator from 'yeoman-generator';
import { PACKAGE_JSON } from './constants/package';

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.answers = {};
    this.ciCdAnswers = {};
    this.newProject = {};

    this.conflicter.force = true;
  }

  initializing() {
    this.log(`
      Welcome to
┏━┓╺┳╸╻  ┏━┓┏┓╻╺┳╸╻╻ ╻   ┏┓ ┏━┓┏━┓╺┳╸┏━┓╺┳╸┏━┓┏━┓┏━┓
┣━┫ ┃ ┃  ┣━┫┃┗┫ ┃ ┃┏╋┛   ┣┻┓┃ ┃┃ ┃ ┃ ┗━┓ ┃ ┣┳┛┣━┫┣━┛
╹ ╹ ╹ ┗━╸╹ ╹╹ ╹ ╹ ╹╹ ╹   ┗━┛┗━┛┗━┛ ╹ ┗━┛ ╹ ╹┗╸╹ ╹╹       
      The Atlantix Media Inc Bootstrap Generator 🚀🚀🚀
      version: Beta 1.0.0
    `);
  } 

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "projectType",
        message: "What do you need to build?",
        choices: [
          {
            name: "Create a new project",
            value: "create-project",
          },
          {
            name: "Add CI/CD Configurations",
            value: "add-ci-cd",
          },
          {
            name: "Add Jest testing configuration",
            value: "add-jest-testing",
          },
        ],
      }
    ]);

    if (this.answers.projectType === "create-project") {
      this.newProject = await this.prompt([
        {
          type: "input",
          name: "name",
          message: "Your project name",
          default: 'my-project'
        },
      ]);
      this.log(`Creating project ${this.newProject.name} 🚀🚀🚀`);
    } else if (this.answers.projectType === "add-ci-cd") {
      this.ciCdAnswers = await this.prompt([
        {
          type: "checkbox",
          name: "ciCdOptions",
          message: "What do you need to build? 🏗️🏗️🏗️",
          choices: [
            {
              name: "Add commitlint + husky 🔥",
              value: "commitlint-husky",
            },
            {
              name: "Add Github build workflow ✅",
              value: "github-build-workflow",
            },
            {
              name: "Add Github test workflow 🧪",
              value: "github-test-workflow",
            },
            {
              name: "Add Github Issues/PR templates 💡",
              value: "github-issues-pr-templates",
            },
            {
              name: "Add ignore builds script 🤖",
              value: "ignore-builds-script",
            }
          ],
        }
      ]);

    } else if (this.answers.projectType === "add-jest-testing") {
      this.log("Adding Jest to your project 🧪🧪🧪");
    }
  }

  configuring() {
    if(this.answers.projectType === "create-project") {
      this.spawnCommandSync('npx', ['create-next-app@latest', this.newProject.name]);
      
      this.log('Installing commitlint 📦️');
        const packageJson = this.fs.readJSON(`${this.newProject.name}/package.json`, {});
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          ...PACKAGE_JSON.COMMIT_LINT,
        }
  
        this.log('Installing husky 📦️');
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          ...PACKAGE_JSON.HUSKY,
        }
  
        this.log('Initializing husky 📦️');
        this.spawnCommandSync('npx', ['husky'], { cwd: this.destinationPath(this.newProject.name) });

        this.log('Installing Jest 🧪🧪🧪');

        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          ...PACKAGE_JSON.JEST,
          }

        this.fs.writeJSON(`${this.newProject.name}/package.json`, packageJson);

    } else if (this.answers.projectType === "add-ci-cd") {
      if(this.ciCdAnswers.ciCdOptions.length === 0) {
        this.log('No options selected 💩💩💩');
        return;
      }
      
      this.log('Configuring your dependencies 📦️📦️📦️');
      if(this.ciCdAnswers.ciCdOptions.includes("commitlint-husky")) {
        this.log('Installing commitlint 📦️');
        const packageJson = this.fs.readJSON(this.destinationPath('package.json'), {});
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          ...PACKAGE_JSON.COMMIT_LINT,
        }
        this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
  
        this.log('Installing husky 📦️');
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          ...PACKAGE_JSON.HUSKY,
        }
        this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
  
        this.log('Initializing husky 📦️');
        this.spawnCommandSync('npx', ['husky']);
      }
    } else if (this.answers.projectType === "add-jest-testing") {
      this.log('Installing Jest 🧪🧪🧪');
      const packageJson = this.fs.readJSON(this.destinationPath('package.json'), {});
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...PACKAGE_JSON.JEST,
        }
      this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
    }
  }

  writing() {

    if(this.answers.projectType === "create-project") {
      this.log('Creating new project 🚀🚀🚀');
      let projectPath = '';

      if(this.fs.exists(`${this.newProject.name}/src/app/page.tsx`)) {
        projectPath = `${this.newProject.name}/src/app`;
      } else if(this.fs.exists(`${this.newProject.name}/app/page.tsx`)) {
        projectPath = `${this.newProject.name}/app`;
      } else {
        this.log('No app directory found 💩💩💩');
        return;
      }

      this.log('Cleaning up the base project 🧹🧹🧹');
      this.fs.copyTpl(
        this.templatePath('./nextjs/page.tsx'),
        this.destinationPath(`${projectPath}/page.tsx`),
      );

      this.fs.copyTpl(
        this.templatePath('./nextjs/atlantix-brand.svg'),
        this.destinationPath(`${this.newProject.name}/public/atlantix-brand.svg`),
      );

      this.fs.copyTpl(
        this.templatePath('./nextjs/README.md'),
        this.destinationPath(`${projectPath}/README.md`),
      );

      this.log('Configuring commitlint 🧑‍💻🧑‍💻🧑‍💻');
      this.fs.copyTpl(
        this.templatePath('commitlint.config.js'),
        this.destinationPath(`${this.newProject.name}/commitlint.config.js`),
        {
          title: 'commitlint.config.js',
        }
      )

      this.log('Configuring husky 🧵');
      this.fs.copyTpl(
        this.templatePath('commit-msg'),
        this.destinationPath(`${this.newProject.name}/.husky/commit-msg`),
        {
          title: 'commit-msg',
        }
      )

      this.log('Configuring github issues/pr templates 🦺🦺🦺');
      this.fs.copyTpl(
        this.templatePath('bug_report.md'),
        this.destinationPath(`${this.newProject.name}/.github/ISSUE_TEMPLATE/bug_report.md`),
      )
      this.fs.copyTpl(
        this.templatePath('feature_request.md'),
        this.destinationPath(`${this.newProject.name}/.github/ISSUE_TEMPLATE/feature_request.md`),
      )
      this.fs.copyTpl(
        this.templatePath('PULL_REQUEST_TEMPLATE.md'),
        this.destinationPath(`${this.newProject.name}/.github/PULL_REQUEST_TEMPLATE.md`),
      )

      this.log('Writing new jest configuration file 🔧🔧🔧');
      this.fs.copyTpl(
        this.templatePath('jest.config.ts'),
        this.destinationPath(`${this.newProject.name}/jest.config.ts`),
      );
      
      this.log('Adding extra testing scripts 🌱🌱🌱');
      const packageJson = this.fs.readJSON(`${this.newProject.name}/package.json`, {});
      packageJson.scripts = {
        ...packageJson.scripts,
        test: 'jest',
        'test:watch': 'jest --watch',
        'test:coverage': 'jest --coverage',
      }
      this.fs.writeJSON(`${this.newProject.name}/package.json`, packageJson);
    
      this.log('Creating basic testing file ⚗️⚗️⚗️');
      this.fs.copyTpl(
        this.templatePath('index.test.ts'),
        this.destinationPath(`${this.newProject.name}/__tests__/index.test.ts`),
      );

    } else if (this.answers.projectType === "add-ci-cd") {

      if(this.ciCdAnswers.ciCdOptions.length === 0) {
        return;
      }

      this.log('Writing new files 🗃️🗃️🗃️');

      if(this.ciCdAnswers.ciCdOptions.includes("commitlint-husky")) {
        this.log('Configuring commitlint 🧑‍💻');
        this.fs.copyTpl(
          this.templatePath('commitlint.config.js'),
          this.destinationPath('commitlint.config.js'),
          {
            title: 'commitlint.config.js',
          }
        )
  
        this.log('Configuring husky 🧵');
        this.fs.copyTpl(
          this.templatePath('commit-msg'),
          this.destinationPath('.husky/commit-msg'),
          {
            title: 'commit-msg',
          }
        )
      }

      if(this.ciCdAnswers.ciCdOptions.includes("github-build-workflow")) {
        this.log('Configuring github build workflow ✈️');
        this.fs.copyTpl(
          this.templatePath('build.yml'),
          this.destinationPath('.github/workflows/build.yml'),
        )
      }

      if(this.ciCdAnswers.ciCdOptions.includes("github-test-workflow")) {
        this.log('Configuring github test workflow 🧪');
        this.fs.copyTpl(
          this.templatePath('test.yml'),
          this.destinationPath('.github/workflows/test.yml'),
        )
      }

      if(this.ciCdAnswers.ciCdOptions.includes("github-issues-pr-templates")) {
        this.log('Configuring github issues/pr templates 🦺');
        this.fs.copyTpl(
          this.templatePath('bug_report.md'),
          this.destinationPath('.github/ISSUE_TEMPLATE/bug_report.md'),
        )
        this.fs.copyTpl(
          this.templatePath('feature_request.md'),
          this.destinationPath('.github/ISSUE_TEMPLATE/feature_request.md'),
        )
        this.fs.copyTpl(
          this.templatePath('PULL_REQUEST_TEMPLATE.md'),
          this.destinationPath('.github/PULL_REQUEST_TEMPLATE.md'),
        )
      }

      if(this.ciCdAnswers.ciCdOptions.includes("ignore-builds-script")) {
        this.log('Configuring ignore builds script 🤖');
        this.fs.copyTpl(
          this.templatePath('script.sh'),
          this.destinationPath('script.sh'),
        )
      }
    } else if (this.answers.projectType === "add-jest-testing") {
      
      this.log('Writing new jest configuration file 🔧🔧🔧');
      this.fs.copyTpl(
        this.templatePath('jest.config.ts'),
        this.destinationPath('jest.config.ts'),
      );
      
      this.log('Adding extra testing scripts 🌱🌱🌱');
      const packageJson = this.fs.readJSON(this.destinationPath('package.json'), {});
      packageJson.scripts = {
        ...packageJson.scripts,
        test: 'jest',
        'test:watch': 'jest --watch',
        'test:coverage': 'jest --coverage',
      }
      this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
    
      this.log('Creating basic testing file ⚗️⚗️⚗️');
      this.fs.copyTpl(
        this.templatePath('index.test.ts'),
        this.destinationPath('__tests__/index.test.ts'),
      );
    }
  }

  install() {

    if(this.answers.projectType === "create-project") {
      this.log('Installing dependencies 📦️');
      this.spawnCommandSync('npm', ['install'], { cwd: this.destinationPath(this.newProject.name) });
    } else {
      this.npmInstall();
    }
  }

  end() {
    this.log('Your project is ready to go 🎉🎉🎉');
  }
};
