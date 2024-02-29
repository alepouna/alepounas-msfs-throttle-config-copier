## ⚠️⚠️⚠️ As of 29/02/2024 this repo has been moved to GitLab at https://gitlab.com/alepouna.dev/alepounas-msfs-throttle-config-copier

# msfs-copy-throttle-config-daemon

A simple tool that copies default FlyByWire A32NX Throttle Configurations from the MSFS work directory to the new aircraft directory. Usually when testing PRs for the FBW and you use custom names (e.g. instead of 'a32nx' you have them named under the PR ID e.g. '8123') 

This tool listens the `%appdata%\Microsoft Flight Simulator\Packages\` folder for new folders, and if it detects the FBW structure it will copy the `%appdata%\Microsoft Flight Simulator\Packages\flybywire-aircraft-a320-neo\work\ThrottleConfiguration.ini` to the new folder. 

Please note that for the purposes of identification of if it's a FBW aircraft, I have set the aircraft tail number to 'FBWBETTER' which creates a file 'FBWBETTER.ini' in the AircraftStates folder, which can be used for identification. :)

You might want to do modifications for using with other aircraft or modules. 

# Use

You can either run the tool with Node (built in v20.5.0, others could work) or build the exe and run it a service. 

# Building

1. `npm install`
2. `npm run build`
