Setting Up NodeJS Web Server into VM

Go to the VM and under the root privelege download the Global dependecies as follows:

(i)   NodeJs
(ii)  Install MongoDB

Steps to install MongoDB can be found under this link:

https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04

Moreover, we need some local dependecies as well:

(i) sudo npm install babel-cli -g
(ii) cd path/to/scaventure-backend npm install
(iii) .env file configurations .env file should be manually created in project root directory as vi .env

vi.env should have the following content in it:

DB_URL=mongodb://localhost/scaventure
JWT_SECRET=somerandomhashyoushouldgenerate

Now, change the port no. of our MongoDB to 3000.

Also, in order to check if the server is set up properly and running use Insomnia rest client app
Below is the link to get it:

https://insomnia.rest/download/

Change the BASE_URL to "myvmlab.senecacollege.ca:6099"
  
