# thisconnect

Consist of the following parts that can run independently:

  - [Planet](https://github.com/thisconnect/planet)
    synchronizes the state between users.

  - [DSP](https://github.com/thisconnect/dsp)
    wraps [Port](https://github.com/thisconnect/port)
	to control Pure Data (aka Pd) and connects to
	the Planet.

  - [Satellite](https://github.com/thisconnect/satellite)
    a minimal user interface to edit the state.

  - A manifest to describe the tools for the DSP engine
    and the controllers for the UI.

The app is just an event emitter to glue everything together.


Events
------

  - `setup` - Initiallizion.

  - `exit` - Terminate the application.
	

Server
------

  - `server setup` - before the server initialization.

  - `server connect` - (object)
    the [connect](http://www.senchalabs.org/connect/)
	instance


Methods
-------

  - `server add static` - (path[, target])

  - `server add favicon` - (target)
