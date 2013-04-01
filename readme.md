# thisconnect

Is a configurable application that:

  - Connects to [Planet](https://github.com/thisconnect/planet)
    to synchronize the state between users using Socket.IO.

  - Communicates with a sound engine, for example Pure Data via 
    [Port](https://github.com/thisconnect/port).

  - Dynamically builds a user interface with
	[Lite](https://github.com/thisconnect/lite)
	to manipulate the current state.

  - Interprets JSON files that generically describe parameters
    and settings to build the ui.


### App:Events

  - `setup` - On initialization.

  - `exit` - On termination.


## Server

A HTTP server using [Connect](http://www.senchalabs.org/connect/).

### Server:Events

  - `server setup` - before the server initialization.

  - `server connect` - (object)
    the conenct instance


### Server:Methods

  - `server add static` - (path[, target])

  - `server add favicon` - (target)


## Socket

A planetary shared state using Socket.IO and Planet.

### Socket:Events

  - `socket io` - the Socket.IO object

  - `socket` - the actual socket

  - `socket service`

  - `socket state`

