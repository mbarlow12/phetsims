PhET Simulations Intern Submission
==================================

## File List
#### ControlPanel.js
DIR: */example-sim/js/example/view/ControlPanel.js*
* Added new modules requires
* Altered signature to accept ParentNode and ModelViewTransform2 objects to simplify getting bounds and adding new elements.
* Added 2 new text button objects with listeners containing prescribed logic
* Added logic to reset function to remove elements

#### ExampleScreenView.js
DIR: */example-sim/js/example/view/ExampleScreenView.js*
* Passed proper variables to altered object constructors

#### example-sim-strings_en.json
DIR: */example-sim/example-sim-strings_en.json*
* Updated with additional keys and text values

#### Dockerfile
* Dockerfile to create a Node.js container, install the dependencies found in the development overview, copy the simulation sourecode, and run a simple http server
1. make the development directory
```
$ mkdir phetsims && cd phetsims
```

2. clone all dependencies according to development overview (Note: I added query-string-machine as I was recieving 404 errors)

3. build the container (ensure the dockerfile is in the current directory)
```
$ docker build -t your-tag-name .
```

4. run the following command to access a terminal prompt in the guest container
```
$ docker run -it -v "$PWD":/usr/src/app your-image-name bash
```
   * execute the npm and grunt commads in the /chipper and /example-sim or /simula-rasa directories
   * `$ exit` the shell

5. finally, you should be able to run the container
```
$ docker run -d -p 32789:8080 -v "$PWD":/usr/src/app your-image-name
```
   * removing the `-d` flag will print server reqests/responses to the screen
   * replacing `-p 32789:8080` with `-P` with randomly assign a host port — user `$ docker ps` for running container info


