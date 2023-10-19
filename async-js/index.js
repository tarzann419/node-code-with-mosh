console.log('Before')

// async callback functions
getUser(1, displayUsers)


function displayUsers(user){
    getRepo( user.username, displayRepos )
}


function displayRepos(repos){
    getCommits(repos, displayCommits)
        console.log(repos)
}


function displayCommits(commits){
    console.log(commits)
}
// SYNC CALLBACK
console.log('Before');
const user = getUser(1);
const getRepo = getRepo(repos);
// const getCommit = getCommits(getRepo[0]);
console.log('After')


console.log('After')

function getUser(id, callback){
    setTimeout( () => {
        console.log('Reading a user from database...');
        callback({ id:id, username:'tarzann419' });
    }, 2000)
}


function getRepo(username, callback){
    setTimeout( () => {
        const repos = ['repo1', 'repo2', 'repo3'];
        console.log('just a sec...')
        callback(repos);
    }, 2000 )
    return ['repo1', 'repo2', 'repo3']
}