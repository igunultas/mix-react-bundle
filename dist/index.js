function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mix = _interopDefault(require('laravel-mix'));

var ReactCSSModules = function ReactCSSModules() {
  this.scopedName = this.defaultScopedName();
};
/**
 * The optional name to be used when called by Mix.
 * Defaults to the class name, lowercased.
 *
 * Ex: mix.example();
 *
 * @return {String|Array}
 */


ReactCSSModules.prototype.name = function name () {
  return "reactCSSModules";
};
/**
 * Return the default scoped name value
 *
 * @return {string}
 */


ReactCSSModules.prototype.defaultScopedName = function defaultScopedName () {
  return "[name]__[local]___[hash:base64:5]";
};
/**
 * All dependencies that should be installed by Mix.
 *
 * @return {Array}
 */


ReactCSSModules.prototype.dependencies = function dependencies () {
  return ["babel-plugin-react-css-modules", "postcss-scss", "postcss-nested"];
};
/**
 * Register the component.
 *
 * When your component is called, all user parameters
 * will be passed to this method.
 *
 * Ex: register(src, output) {}
 * Ex: mix.yourPlugin('src/path', 'output/path');
 *
 * @param{*} ...params
 * @return {void}
 *
 */


ReactCSSModules.prototype.register = function register (scopedName) {
  if (scopedName) {
    this.scopedName = scopedName;
  }
};
/**
 * Override the generated webpack configuration.
 *
 * @param{Object} webpackConfig
 * @return {void}
 */


ReactCSSModules.prototype.webpackConfig = function webpackConfig (config) {
    var this$1 = this;

  // Loop through all rules
  config.module.rules = config.module.rules.map(function (rule) {
    if (!rule.loaders) {
      return rule;
    } // Loop through all loaders


    rule.loaders = rule.loaders.map(function (loader) {
      if (loader.loader === "css-loader" || loader === "css-loader") {
        // Add our options to the loader
        var options = {
          modules: {
            mode: "local",
            localIdentName: this$1.scopedName
          }
        }; // Convert string syntax to object syntax if neccessary

        loader = typeof loader === "string" ? {
          loader: loader
        } : loader; // Inject our options into the loader

        loader.options = loader.options ? Object.assign({}, loader.options, options) : options;
      }

      return loader;
    });
    return rule;
  });
  return config;
};
/**
 * Babel config to be merged with Mix's defaults.
 *
 * @return {Object}
 */


ReactCSSModules.prototype.babelConfig = function babelConfig () {
  return {
    plugins: [["react-css-modules", {
      filetypes: {
        ".scss": {
          syntax: "postcss-scss",
          plugins: ["postcss-nested"]
        }
      },
      exclude: "node_modules",
      handleMissingStyleName: "warn",
      generateScopedName: this.scopedName
    }]]
  };
};

mix.extend("reactCSSModules", new ReactCSSModules());
