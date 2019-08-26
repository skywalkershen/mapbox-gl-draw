module.exports = function (suffix) {
  return {
    simple_select: require('./simple_select')(suffix),
    direct_select: require('./direct_select')(suffix),
    draw_point: require('./draw_point')(suffix),
    draw_polygon: require('./draw_polygon')(suffix),
    draw_line_string: require('./draw_line_string')(suffix),
  };
}
