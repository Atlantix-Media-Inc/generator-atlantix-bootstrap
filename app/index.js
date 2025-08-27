import Generator from 'yeoman-generator';
export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.answers = {};
    this.ciCdAnswers = {};

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
      this.log("Option not available yet 💩💩💩");
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
    if (this.answers.projectType === "add-ci-cd") {

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
          '@commitlint/cli': '^19.6.0',
          '@commitlint/config-conventional': '^19.6.0',
        }
        this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
  
        this.log('Installing husky 📦️');
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          husky: '^9.1.7',
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
          jest: '^29.7.0',
          'jest-environment-jsdom': '^29.7.0',
          '@testing-library/react': '^15.0.0',
          '@testing-library/dom': '^10.4.0',
          '@testing-library/jest-dom': '^6.6.3',
          'ts-node': '^10.9.2',
          '@types/jest': '^29.5.12'
        }
      this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
    }
  }

  writing() {
    if (this.answers.projectType === "add-ci-cd") {

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
    this.npmInstall();
  }

  end() {
    this.log('Your project is ready to go 🎉🎉🎉');
  }
};
