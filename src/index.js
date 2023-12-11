/* 

Purpose:
Listen the %APPDATA%\Microsoft Flight Simulator\Packages\ folder for new folders. When a new folder is detected, check if the folder contains a /work folder and if so check if it contains a 'FBWBETTER.ini' file.
If it does, copy the "ThrottleConfiguration.ini" from '%APPDATA%\Microsoft Flight Simulator\Packages\flybywire-aircraft-a320-neo\work' to the new folder.

*/


const fs = require('fs').promises;
const { watch } = require('chokidar');
const { version } = require('../package.json');

// Path to the MSFS packages folder
const packagesPath = `${process.env.APPDATA}\\Microsoft Flight Simulator\\Packages\\`;

console.log('------------------------------------------------');
console.log('');
console.log(`https://github.com/auroraisluna/msfs-copy-throttle-config-daemon`);
console.log(`Version: ${version}`);
console.log('');
console.log('------------------------------------------------');

const watcher = watch(packagesPath, {

    // Ignore files
    ignored: /(^|[\/\\])\../,

    // Only watch for new folders
    ignoreInitial: true,

    // Don't watch for changes in subfolders
    depth: 0,

    // Don't watch for changes in the /work folder
    ignored: /(^|[\/\\])work([\/\\]|$)/

});

console.log(`👀 Listening for new folders in: ${packagesPath}`);

watcher.on('addDir', async (path) => {

    console.log(`🚧 New folder detected: ${path}`);

    console.log('⌛ Waiting 5 seconds to make sure the folder is fully created')

    //Wait 5 seconds to make sure the folder is fully created
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check if the folder contains a /work folder
    const workPath = `${path}\\work`;

    try {

        console.log(`👀 Checking if ${workPath} exists`);

        await fs.access(workPath);

    } catch (error) {

        console.log(`❌ No /work folder found in ${path}`);
        return;

    }

    //Loop until the /work/AircraftStates folder is fully created
    let aircraftStatesPath = `${workPath}\\AircraftStates`;

    let attempts = 1;

    while (true) {

        try {

            if (attempts > 25) {
                    
                console.log(`🛑 No /AircraftStates folder found in ${workPath} after ${attempts} attempts, giving up`);
                return;

            }

            console.log(`👀 Checking if ${aircraftStatesPath} exists (Attempt ${attempts})`);

            await fs.access(aircraftStatesPath);

            break;

        } catch (error) {

            console.log(`❌ No /AircraftStates folder found in ${workPath}`);
            console.log('⌛ Waiting 5 seconds to check again');

            attempts++;

            //Wait 5 seconds to check again
            await new Promise(resolve => setTimeout(resolve, 5000));

        }

    }

    // Check if the /work folder contains a 'FBWBETTER.ini' file
    const iniPath = `${workPath}\\AircraftStates\\FBWBETTER.ini`;

    try {

        console.log(`👀 Checking if ${iniPath} exists`);

        await fs.access(iniPath);

    } catch (error) {

        console.log(`❌ No FBWBETTER.ini file found in ${workPath}\\AircraftStates`);
        return;

    }

    // Copy the "ThrottleConfiguration.ini" from '%APPDATA%\Microsoft Flight Simulator\Packages\flybywire-aircraft-a320-neo\work' to the new folder.

    try {

        await fs.copyFile(`${packagesPath}flybywire-aircraft-a320-neo\\work\\ThrottleConfiguration.ini`, `${workPath}\\ThrottleConfiguration.ini`);
        console.log(`🟢 Copied ThrottleConfiguration.ini to ${workPath}`);

    } catch (error) {

        console.log(error);

    }

    console.log('✅ DONE!');
    console.log('------------------------------------------------');
    console.log(`👀 Listening for new folders in: ${packagesPath}`);

});