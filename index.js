#!/usr/bin/env node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs')
const express = require('express');
const git = require('simple-git');
const app = express();
const port = 12345; 

let config = {};

app.post('/update', (req, res) => {
  git().pull((err, update) => {
    if(update && update.summary.changes) {
      console.log('Changes pulled. Running user script...');
      
    }
  });
  res.send('Received update.');
});

function configure() {
    rl.question('Enter the URL of your repository: ', (url) => {
      config.url = url;
      fs.writeFileSync('./config.json', JSON.stringify(config));
      console.log('Configuration saved.');
  
      // Clone the repository
      git().clone(config.url, (err) => {
        if (err) {
          console.error('Failed to clone repository:', err);
        } else {
          console.log('Repository cloned successfully.');
        }
      });
  
      rl.close();
    });
  }

  function start() {
    fs.access('../config.json', fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Error: No config.json file found. Please run "simplecd configure" first.');
        process.exit(1);
      } else {
        console.log("Starting SimpleCD...");
        app.listen(port, '0.0.0.0', () => {
          console.log(`Now listening on port ${port}`);
        });
      }
    });
  }
  
// Map commands to functions
const commandMap = {
  configure,
  start,
};

// Parse command-line arguments
const args = process.argv.slice(2);
const command = args[0];

// Execute the corresponding function based on the command
const selectedCommand = commandMap[command];
if (selectedCommand) {
  selectedCommand();
} else {
  console.error("Invalid command. Available commands: configure, start");
}
