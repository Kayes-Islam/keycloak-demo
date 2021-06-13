# keycloak-demo
A demo of Keycloak with an Angular application and an Asp.net Core 3.1 Web API that can be run with docker compose. 

# How to run

Run `docker compose up --build`.

This exposes three services, Keycloak on port 8080, and Angular SPA on port 4200 and an asp.net core web-api on 5000. 

Open up the client app at [http://localhost:4200](http://localhost:4200). Click the Call API button without logging in and you'll see the web-api returning 401 un-authorized error. But if you login using the demo account below and then click "Call API" you'll see successful response with JSON data.
Demo User:
U: demo.user
P: P@ssw0rd

NOTE: If you are having an issue logging in check the console logs from the SPA. It should have an error entry that says "iat time too far in the past". "iat" is issued at time. This happens when your container's time is not in sync with your host machines time. This is an issue on WSL/WSL2 on windows, specially if you have a laptop that is set to sleep after inactivity, becase when windows wakes up, it doesn't re-sync the time  on the WSL. 
FIX: Open WSL console on windows then run `hwclock -s`.

To have a look at the admin portal open [http://localhost:4200](http://localhost:4200) and login as admin:
U: admin
P: admin
