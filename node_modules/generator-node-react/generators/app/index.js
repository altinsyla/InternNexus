'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

  // prompting

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red.bgWhite.bold('Basic MERN') + ' Generator!'
    ));

    // Asking for Project Name
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your Project Name?',
      default: this.appname
    }, function(answers) {
      this.props = answers;
      this.log(answers.name);
      done();
    }.bind(this));
  },

  //Installing all the Dependencies

    install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function () {
         console.log(yosay(
      'Done..!! All set. Type'+chalk.white(" npm run start-dev")+" ."
    ));
      }
    });
  },

writing: {
  // Copying App files
  app: function(){
    this.copy('_server.js', 'server.js');
    
    // Creating Architecture
    mkdirp('views');
    mkdirp('views/components');
    mkdirp('views/containers');
    mkdirp('public');
    mkdirp('model');
    mkdirp('controller');
    this.copy('_public/_index.html','public/index.html');
    this.copy('_views/_Index.js','views/Index.js');
    this.copy('_views/_components/_IntroText.js','views/components/IntroText.js');
    this.copy('_views/_containers/_App.js','views/containers/App.js');
    this.copy('_views/_containers/_App.css','views/containers/App.css');
  },
 

  // Copying Config files
  config: function() {
    this.copy('.babelrc', '.babelrc');
    this.copy('_webpack.config.js', 'webpack.config.js');
    this.copy('_package.json', 'package.json');
  }
}

});

