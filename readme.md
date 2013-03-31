# thisconnect

  - [Planet](https://github.com/thisconnect/planet)
    synchronizes the state between users.

  - [Port](https://github.com/thisconnect/port)
    communicates with Pure Data.

  - [Lite](https://github.com/thisconnect/lite)
    a minimal user interface to edit the state.

  - A manifest format to describe the parameters
  	for the DSP engine and the controllers for the UI.

  - The app is just an event emitter to that glues
    everything together.


### App:Events

  - `setup` - Initiallizion.

  - `exit` - Terminate the application.
	

Modules
-------

### Server

A HTTP server using [Connect](http://www.senchalabs.org/connect/)

#### Server:Events

  - `server setup` - before the server initialization.

  - `server connect` - (object)
    the conenct instance


#### Server:Methods

  - `server add static` - (path[, target])

  - `server add favicon` - (target)


### Socket

A planetary shared state using Socket.IO

#### Socket:Events

  - `socket io` - the Socket.IO object

  - `socket` - the actual socket

  - `socket service`

  - `socket state`

