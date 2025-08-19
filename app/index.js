const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.config.save();
  }

  initializing() {
    this.log('Initializing');
  }

  prompting() {
    this.log('Prompting');
  }

  configuring() {
    this.log('Configuring');
  }

  default() {
    this.log('Default');
  }

  writing() {
    this.log('Writing');
  }

  conflicts() {
    this.log('Conflicts');
  }

  install() {
    this.log('Installing');
  }

  end() {
    this.log('End');
  }
};
