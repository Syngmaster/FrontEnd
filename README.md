# FrontEnd
A simple jQuery frontend to demo microservices functionality

The front-end is a jQuery-based JavaScript application that exposed to customers. It communicates with underlying backend service via RESTful interface. 

The backend is Node.js application, which works as a gateway for the front-end to communicate to microservices. 

The microservices architecture consists of 4 microservices:
1. Authentication Server - https://github.com/Syngmaster/AuthenticationServer
2. Cart Server - https://github.com/Syngmaster/CartServer
3. Address Server - https://github.com/Syngmaster/AddressServer
4. Catalog Server - https://github.com/Syngmaster/CatalogServer

Microservices communicates with web backend application using REST protocol. 
