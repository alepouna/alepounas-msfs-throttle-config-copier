// build.js
import exe from '@angablue/exe';

const build = exe({
    entry: './src/index.js',
    out: './build/msfs-copy-throttle-config-daemon.exe',
    pkg: ['-C', 'GZip', '-c', './package.json'], // Specify extra pkg arguments
    version: '0.0.1',
    target: 'node18-win-x64',
    properties: {
        FileDescription: 'Checks for new msfs work folders and copys throttle config',
        ProductName: 'msfs-copy-throttle-config-daemon',
        OriginalFilename: 'msfs-copy-throttle-config-daemon.exe',
    },
});

build.then(() => console.log('Build completed!'));