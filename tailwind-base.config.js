const muiColors = require('material-ui-colors');
const muiColorsMapped = {};
// loop through colors
for (let color of Object.keys(muiColors)) {
  // loop through shades
  for (let shade of Object.keys(muiColors[color])) {
    muiColorsMapped[`${color}-${shade}`] = muiColors[color][shade];
  }
}
module.exports = {
  theme: {
    minWidth: {
      '1/4': '25vw',
    },
    extend: {
      colors: {
        ...muiColorsMapped,
        'amberAccent-200': '#ffab40',
        'blueAccent-200': '#448aff',
        'cyanAccent-200': '#18ffff',
        'deepOrangeAccent-200': '#ff6e40',
        'deepPurpleAccent-200': '#7c4dff',
        'greenAccent-200': '#69f0ae',
        'indigoAccent-200': '#536dfe',
        'lightBlueAccent-200': '#40c4ff',
        'lightGreenAccent-200': '#b2ff59',
        'limeAccent-200': '#eeff41',
        'orangeAccent-200': '#ffab40',
        'pinkAccent-200': '#ff4081',
        'purpleAccent-200': '#e040fb',
        'redAccent-200': '#ff5252',
        'tealAccent-200': '#64ffda',
        'yellowAccent-200': '#ffff00',
        'transparent-white-80': 'rgba(255, 255, 255, 0.8)',
        'transparent-white-60': 'rgba(255, 255, 255, 0.6)',
        'transparent-white-40': 'rgba(255, 255, 255, 0.4)',
        'transparent-white-20': 'rgba(255, 255, 255, 0.2)',
        'primary-100': muiColorsMapped['green-100'],
        'primary-200': muiColorsMapped['green-200'],
        'primary-300': muiColorsMapped['green-300'],
        'primary-400': muiColorsMapped['green-400'],
        'primary-500': muiColorsMapped['green-500'],
        'primary-600': muiColorsMapped['green-600'],
        'primary-700': muiColorsMapped['green-700'],
        'primary-800': muiColorsMapped['green-800'],
        // sourced from hex colors website from 500 values, tints/shades
        'secondary-100': '#dcdbef',
        'secondary-200': '#b9b7df',
        'secondary-300': '#9693cf',
        'secondary-400': '#726fbf',
        'secondary-500': '#504caf',
        'secondary-600': '#403c8c',
        'secondary-700': '#302d69',
        'secondary-800': '#201e46',
        'tertiary-100': '#efdcdb',
        'tertiary-300': '#cf9693',
        'tertiary-200': '#dfb9b7',
        'tertiary-400': '#bf726f',
        'tertiary-500': '#af504c',
        'tertiary-600': '#8c403c',
        'tertiary-700': '#69302d',
        'tertiary-800': '#46201e',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    ({ addUtilities, variants }) => {
      const colorMap = Object.keys(muiColorsMapped).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: muiColorsMapped[color] },
        [`.border-r-${color}`]: { borderRightColor: muiColorsMapped[color] },
        [`.border-b-${color}`]: { borderBottomColor: muiColorsMapped[color] },
        [`.border-l-${color}`]: { borderLeftColor: muiColorsMapped[color] },
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
  ],
};
