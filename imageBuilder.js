const { exec } = require("child_process");
const readline = require('readline');

const username = process.env.USERNAME
const password = process.env.PASSWORD


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const removeClonedRepo = (repo) => {
  
  console.log('Removing the cloned repo-folder...');
  exec(`rm -rf ${repo}`, (error, stdout) => {
    if(error) {
      console.log(`error: ${error.message}`);
      return;
    };
    
  console.log('Cloned repo-folder succesfully removed');

  });
};


const pushToDockerhub = (tag) => {

  console.log('Pushing image to Dockerhub...');
  exec(`docker login && docker push ${tag}`, (error, stdout) => {
    if(error) {
      console.log(`error: ${error.message}`);
      return;
    };
    console.log('Image succesfully pushed!');
  });
};

const makeImage = (repo) => {

  console.log('Creating an image...');

  const tag = `penao7/${repo}`;
  
  exec(`cd ${repo} && docker build -t ${tag} .`, (error, stdout) => {
    if(error) {
      console.log(`error: ${error.message}`);
      return;
    }

    console.log(`Image with tag ${tag} created!`);
    removeClonedRepo(repo);
    pushToDockerhub(tag);

  });
}


const cloneRepo = (url) => {

  console.log(`Attempting to clone the repository ${url}`);
  const repo = url.split("/")[4];

  exec(`git clone ${url}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    
    console.log('Repo cloned!');
    makeImage(repo);

    });
};

const askUrl = () => {
  rl.question(`Give git repository url: `, (url) => {
    cloneRepo(url);
    rl.close();
  });
};


const dockerLogin = (username, password) => {
  console.log(`Trying to log in as ${username}...`);
  exec(`docker login -u ${username} -p ${password}`, (error) => {
    if(error) {
      console.log(`error: ${error.message}`);
      return;
    };
    console.log(`Succesfully logged in as ${username}!`);
    askUrl(); 
  });
};



if(!username || !password) {
  console.log('ENV variables for Dockerhub username or password not found, please log in');
  rl.question(`username: `, (username) => {
    rl.question(`password: `, (password) => {
      dockerLogin(username, password);
    });
  });
} else {
  dockerLogin(username, password);
};
