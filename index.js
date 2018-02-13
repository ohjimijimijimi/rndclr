const rc = require('randomcolor');
const yargs = require('yargs');

const argv = yargs
    .option('h', {
        alias: 'hue',
        describe: 'Controls the hue of the generated color. You can pass a string representing a color name: red, orange, yellow, green, blue, purple, pink and monochrome are currently supported. If you pass a hexidecimal color string such as #00FFFF, randomColor will extract its hue value and use that to generate colors.',
        type: 'string'
    })
    .option('l', {
        alias: 'luminosity',
        describe: 'Controls the luminosity of the generated color. You can specify a string containing bright, light or dark.',
        choices: ['bright', 'light', 'dark']
    })
    .option('c', {
        alias: 'count',
        describe: 'An integer which specifies the number of colors to generate.',
        type: 'number'
    })
    .option('s', {
        alias: 'seed',
        describe: 'An integer or string which when passed will cause randomColor to return the same color each time.',
        type: 'number'
    })
    .option('f', {
        alias: 'format',
        describe: 'A string which specifies the format of the generated color.',
        choices: ['rgb', 'rgba', 'rgbArray', 'hsl', 'hsla', 'hslArray', 'hex'],
        default: 'hex'
    })
    .option('a', {
        alias: 'alpha',
        describe: 'A decimal between 0 and 1. Only relevant when using a format with an alpha channel (rgba and hsla). Defaults to a random value.',
        type: 'number'
    })
    .argv;

const options = (({hue, luminosity, count, seed, format, alpha}) => ({hue, luminosity, count, seed, format, alpha}))(argv);

const colors = rc(options);

let output = colors;
if (Array.isArray(colors)) {
    output = colors.join(' ');
}

console.log(output);
