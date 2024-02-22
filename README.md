# SimpleCD: The easier way to set up a CI/CD Pipeline.

SimpleCD is the best way to Continuous Delivery pipeline, it's FOSS, and compatable with any Git provider (GitHub, GitLab, BitBucket, Amazon CodeCommit, etc.)

# How does it work?

SimpleCD will listen for any new commits on the repository you set up after installation, pull the repository, then run any script you write.

# What are these scripts?

With SimpleCD, you can write any script in bash, that will be run when your repository is pulled. 
Some examples of what you can do with these scripts:
- Build and run a Node app
- Interact with a database to log your builds
- Notify your team members when a build succeeds/fails automatically

# How do i install and set it up?

- ```npm i simplecd -g```
- ```simplecd configure```
- Follow the configuration process
- ```cd (my-repo)```
- ```simplecd start```

Note: After running configuration, you have to run "simplecd start" in the directory of your repository, or else pulls won't work.

# Setting up scripts

The benefit of SimpleCD is that you can run scripts on your server when a push is recognized, and SimpleCD pulls the changes. To set up scripts, follow these steps:

- In your git repository, create a bash script named ```simplecd.sh```
- Write any script you want executed when a new push is pulled.

Here is an example script to automatically build and run a nextJS app

```npm install```