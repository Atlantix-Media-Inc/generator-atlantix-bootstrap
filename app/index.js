const Generator = require('yeoman-generator');
const { select } = require('inquirer');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.config.save();
    this.answers = {};
    this.ciCdAnswers = {};
  }

  initializing() {
    this.log('Welcome to the Atlantix Media Inc Bootstrap Generator 🚀');
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

    } else if (this.answers.projectType === "add-page") {
      this.log("Option not available yet 💩💩💩");
    }
  }

  configuring() {
    if (this.answers.projectType === "add-ci-cd") {
      this.log('Configuring your dependencies 📦️📦️📦️');

      if(this.ciCdAnswers.ciCdOptions.includes("commitlint-husky")) {
        this.log('Installing comitlint 📦️');
        this.npmInstall(['@commitlint/cli', '@commitlint/config-conventional'], { save: true });
  
        this.log('Installing husky 📦️');
        this.npmInstall(['husky'], { save: true });
  
        this.log('Initializing husky 📦️');
        this.spawnCommandSync('npx', ['husky']);
      }
    }
  }

  default() {}

  writing() {
    if (this.answers.projectType === "add-ci-cd") {
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
    }
  }

  conflicts() {}

  install() {}

  end() {
    this.log('Your project is ready to go 🎉🎉🎉');
  }
};
