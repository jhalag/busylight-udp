# Busylight-UDP
Minimal daemon for GNU/Linux systems to host the `busylight` library and accept color commands

Solutions such as `busylight-cli` are functional, but require commands to be refreshed every 20 seconds or the light will go off.

## Setting Color
This package will need to be running in the background.

Binding a key combination (e.g. in GNOME) to call one of the following commands will change the color:
```
/bin/echo -n 'red' | /bin/nc -u -w 1 localhost 8000

# or

/bin/echo -n 'red' > /dev/udp/localhost/8000

# wrapping it in a shell appears to be necessary in GNOME keyboard shortcuts:

sh -c "/bin/echo -n 'green' | /bin/nc -u -w 1 localhost 8000"
```

## Deployment

### build
The `busylight` library may require the `libusb-1.0.0-dev` and `libudev-dev` packages to be installed (Ubuntu/Debian) for node-gyp to complete.

### udev
By default, the hidraw device for the busylight will not be accessible by non-root users. Placing the following rule in `/etc/udev/rules.d/50-busylight.rules` will relax permissions on busylight devices to allow non-root access.
```
SUBSYSTEM=="hidraw", PROGRAM="/bin/echo $devpath | /bin/sed -n '/.*usb.*\/[0-9A-Za-z]\{4\}:27BB:3BCA\..*hidraw/!{q1}'", MODE="0666", GROUP="1000"
```

### startup
In GNOME - an entry can be added to "startup applications" as such:
```
sh -c "node /home/user/somepath/busylight-udp/index.js"
```
