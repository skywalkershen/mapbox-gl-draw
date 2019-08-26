const xtend = require('xtend');
const Constants = require('./constants');

function defaultOptions (sourceIdSuffix) {
  let eventSuffix = sourceIdSuffix ? `.${sourceIdSuffix}`: '';
  let layerSuffix = sourceIdSuffix ? `-${sourceIdSuffix}`: '';
  return {
    defaultMode: Constants.modes.SIMPLE_SELECT,
    keybindings: true,
    touchEnabled: true,
    clickBuffer: 2,
    touchBuffer: 25,
    boxSelect: true,
    displayControlsDefault: true,
    styles: require('./lib/theme')(layerSuffix),
    modes: require('./modes')(sourceIdSuffix),
    controls: {},
    userProperties: false
  }
};

const showControls = {
  point: true,
  line_string: true,
  polygon: true,
  trash: true,
  combine_features: true,
  uncombine_features: true
};

const hideControls = {
  point: false,
  line_string: false,
  polygon: false,
  trash: false,
  combine_features: false,
  uncombine_features: false
};

function addSources(styles, sourceIdSuffix, sourceBucket) {
  let suffix = sourceIdSuffix ? `-${sourceIdSuffix}`: '';
  return styles.map(style => {
    if (style.source) return style;
    return xtend(style, {
      id: `${style.id}.${sourceBucket}`,
      source: (sourceBucket === 'hot') ? Constants.sources.HOT + suffix : Constants.sources.COLD + suffix
    });
  });
}

module.exports = function(options = {}) {
  let withDefaults = xtend(options);

  if (!options.controls) {
    withDefaults.controls = {};
  }

  if (options.displayControlsDefault === false) {
    withDefaults.controls = xtend(hideControls, options.controls);
  } else {
    withDefaults.controls = xtend(showControls, options.controls);
  }

  withDefaults = xtend(defaultOptions(withDefaults.sourceIdSuffix), withDefaults);

  // Layers with a shared source should be adjacent for performance reasons
  withDefaults.styles = addSources(withDefaults.styles, withDefaults.sourceIdSuffix, 'cold').concat(addSources(withDefaults.styles, withDefaults.sourceIdSuffix, 'hot'));

  return withDefaults;
};
