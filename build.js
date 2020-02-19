const watch = require('chokidar').watch;
var topless = require('topless');
var psmod = require('./index');
var t2js = require('t2js');

// Compile module
function buildMOD() {
    psmod({
        dir: 'module',
        name: 'mymodule',
        className: 'MyModule',
        displayName: 'My Module',
        description: 'This is my module',
        tab: 'others',
        version: '1.0.0',
        author: 'John Doe',
        email: 'john@email.com',
        copyright: '2020 John Doe',
        ext_css: '', // External CSS file
        ext_js: '',  // External JS file
        ext_ws: ''  // External Webservice
    });
    console.log('MOD compiled. Waiting for changes...');
} buildMOD();
watch('src/mod', {
  ignored: /\.gout.*/,
  persistent: true
})
.on('change', buildMOD)
.on('unlink', buildMOD);

// Compile JS
function buildJS() {
    t2js.bundle('src/js', {
        output: 'pub/js/script.js',
        minify: true,
        enclose: true,
        init: 'initApp',
        lib: ['node_modules/jpesos/j$.js'],
        oncompiled: function(){
            console.log('JS compiled. Waiting for changes...');
        }
    });
} buildJS();
watch('src/js', {
  ignored: /\.gout.*/,
  persistent: true
})
.on('change', buildJS)
.on('unlink', buildJS);

// Compile CSS
function buildCSS() {
    topless('src/css', {
        minify: true,
        output: 'pub/css',
        oncompiled: function(){
            console.log('CSS compiled. Waiting for changes...');
        }
    });
} buildCSS();
watch('src/css', {
  ignored: /\.gout.*/,
  persistent: true
})
.on('change', buildCSS)
.on('unlink', buildCSS);