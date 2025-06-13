import express from 'express';
const app=express();
const PORT=3000;
const github={
  "login": "raghavkhatri413",
  "id": 123288890,
  "node_id": "U_kgDOB1k9Og",
  "avatar_url": "https://avatars.githubusercontent.com/u/123288890?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/raghavkhatri413",
  "html_url": "https://github.com/raghavkhatri413",
  "followers_url": "https://api.github.com/users/raghavkhatri413/followers",
  "following_url": "https://api.github.com/users/raghavkhatri413/following{/other_user}",
  "gists_url": "https://api.github.com/users/raghavkhatri413/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/raghavkhatri413/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/raghavkhatri413/subscriptions",
  "organizations_url": "https://api.github.com/users/raghavkhatri413/orgs",
  "repos_url": "https://api.github.com/users/raghavkhatri413/repos",
  "events_url": "https://api.github.com/users/raghavkhatri413/events{/privacy}",
  "received_events_url": "https://api.github.com/users/raghavkhatri413/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Raghav Khatri",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 23,
  "public_gists": 0,
  "followers": 0,
  "following": 1,
  "created_at": "2023-01-22T06:23:54Z",
  "updated_at": "2025-06-06T09:52:32Z"
};

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.get('/github',(req,res)=>{
    res.json(github);
})

app.listen(PORT,()=>{
    console.log("Port is listening on",PORT);
})