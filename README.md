# Harman Learning Session

This application is here to demonstrate the power of docker in the world of microservices.

## Build and Install

After you made sure Docker is installed properly ( run 'docker -version' in your terminal to check) it's time to bring the application up in dev mode.

There are two ways in which you can run this application:

### The first method: ( Recommended )
Download 'docker-integration' plugin on your IntelliJ, this will help us running the environment in dev mode but more importantly it will give us some great information on our running containers. 

** Once the plugin is download go to Run/Edit configuration, click on the + button, add Docker -> docker-compose. Make sure you choose in 'compose file' the 'docker-compose' file of the project.

### The second method:
will require a little bit more writing now and in the future, as you will run your docker environment from terminal. All you need to do is:

```bash
$ docker-compose up
```

This will install all the needed images from my personal/global DockerHub, once all images are download the command will run each image inside a container and wrap all in one network ( making it pretty easy for inter communication between microservices)

#### Project is running whats next?
If you ran your project with IntelliJ make sure you can see some logs on each container, if you ran manually with the terminal, check your containers statusu with 'docker ps' this will show you all running containers.

Make sure that UI is running on ```localhost:3000```


## Debugging - NodeJs and Spring Boot
Unlike other project where you can just use your IDE in debug mode with little to no configuration, when using Dockers things can be different, we need to use 
"remote debugging".


### NodeJs - How to debug?

Theses are the steps for debugging your containers:

1. First is making sure the application inside the container is running is a debug mode, which means you need to run nodemon ( restarts your code on changes ) in a debug mode 
```
nodemone --inspect=0.0.0.0
```
** usually 0.0.0.0 is not very secured, but in dev mode, inside a container in our computer, its fine.

2. Port forwarding, in the docker-compose.yml file, make sure you made port forwarding to the wanted service.
e.g. 
```
    ports:
    - '9229:9229'
```
** 9229 is usually the default debugging port for NodeJS apps.

3. Redeploy your containers or otherwise the changes won't apply - we are changing the actual containers, this should be very quick thanks to the caching mechanism docker provide us 

4. Go to Run/Edit configuration -> + --> Attach to Node.js/Chrome --> Edit the debugger port.
** in case you made your files inside the containers with different names you also need to change the path
in the 'remoteUrl' section. Usually the name of the service,for example server
should have /app as a path. 

5. Run the debugger and make sure the connection is made

6. Last step, go to the UI and open DevTools on the left side you should have a green
NodeJs button, click it, this will be your debugging console.

 ### JAVA Spring Boot - How to debug?
 
 ### Troubleshooting
 1. docker daemon is not connected
 - check if docker is running - >  ``` $sudo service docker status ```
 if docker is not running try to restart it.
   