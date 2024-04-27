## EdocFlow
Electronic Document Management system &#9983;<br/>
Running app through `docker`
### Steps to manage web-app
#### 1. Go to `server` folder and `build` docker image
```shell
cd server
docker build -t spring-server:v1.0 .
```
#### 2. Go to `client` folder and `build` docker image
```shell 
cd client
docker build -t react-client:v1.0 .
```
#### 3. To create running `container` for client 
```shell 
make run-client
```
#### 4. To create running `container` for server
```shell 
make run-server
```