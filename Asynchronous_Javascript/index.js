/***
 * Callback is a function
 * in setTimeOut, there are two params, first one is for decalring a function
 */


console.log("Hello")
getUser(1, (user)=>{
    console.log('User: ',user)

    getRepositories(user.username, (repo)=>
    {
        console.log(repo)
    })
})

console.log("Wait....")

function getUser(id, callback)
{
    console.log(id)
    setTimeout(()=>{
        callback({id: id, username: 'Hamdan'})
    },2000)
}

function getRepositories(user, callback)
{
    const repos = ['repo1','repo2', 'repo3']
    setTimeout(()=>{
        callback({name: user, type: repos})
    },2000)
    
}