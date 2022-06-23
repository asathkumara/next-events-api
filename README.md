
<table >
    <tr>
        <th>Roles</th>
        <th>Deliverables</th>
        <th>Project Specifications</th>
    </tr>
    <tr>
        <td style="">
            <p >I assumed the following roles when designing this app:</p>
            <ul>
                <li>Full-Stack Developer</li>
            </ul>
        </td>
        <td style="">
           <p>Full-Stack Development: REST API conforming to RESTful standards built using NodeJS and JavaScript framework Next.js. MongoDB is used to persist data and Mongoose is used as the ORM tool.
           </p>
           <p>Swagger was used to document the REST API</p>
        </td>
        <td style="">
           <p>Duration: 2 weeks</p>
    </tr>    
</table>

## Table of Contents

1. [Overview](#overview)
2. [Get Started](#get-started)
3. [License](#license)


## Overview

This REST API enables you to manage users and organize group events. Group messaging is also supported. 

Note: If a request throws a 500, chances are the MongoDB cluster is inactive.

## Get Started

Let's start by creating your first  group. First, you need to create a user. Open up a command prompt and enter the following command:


```bash
#POST /api/users
$ curl --location --request POST 'https://next-events-api.vercel.app/api/users/' |
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "interests": ["Music"]
}'
```

<!-- >  {
>    "name":"John Doe",
>    "interests":["Music"],
>    "active":true,
>    "_id":"62b41fd3719546a7f4a84d29",
>    "joinedAt": "6/23/2022, 8:09:55 AM",
>    "__v":0
>  }
``` -->

The json response will contain an `_id` field which represents your newly created user, "John Doe". Make note of this as you'll need this in future requests.

Next let's create a group:

```bash
#POST /api/groups
$ curl --location --request POST 'https://next-events-api.vercel.app/api/groups' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userID": "Your ID",
  "name": "Dev"
}'

> {
>    "_id":"62b42328c7442da4d0d72574"
>    "name":"Dev",
>    "members": ["62b41fd3719546a7f4a84d29"],
>    "messages":[],
>    "events":[],
>    ...
> }
```

Congrats, you're now the first member of the "Dev" group. Now you're able to send messages to the group and host events.

Let's try posting a message to the "Dev" group:

```bash
#POST /api/groups/{groupName}/messages
$ curl --location -g --request POST 'https://next-events-api.vercel.app/api/groups/Dev/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userID": "Your ID",
    "contents": "Keep an eye out on upcoming events everyone!"
}'

> {
>    "_id":"62b4245ac7442da4d0d7257a",
>    "userID":"62b41fd3719546a7f4a84d29",
>    "contents":"Keep an eye out on upcoming events everyone!",
>    ...
> }
```

A message stating "Keep an eye out for upcoming events!" is now available for every member of the "Dev" group.

Let's try creating one of those events:

```bash
#POST /api/groups/{groupName}/events
$ curl --location --request POST 'https://next-events-api.vercel.app/api/groups/Dev/events' \
--header 'Content-Type: application/json' \
--data-raw '{
  "createdBy": "Your ID",
  "name": "Standup for design sprint",
  "startsAt": "6/22/2022, 10:00:00 AM",
  "endsAt": "6/22/2022, 11:00:00 AM"
}'

> {
>    "_id":"62b426293f660669382e8e5b",
>    "createdBy":"62b41fd3719546a7f4a84d29",
>    "name":"Standup for design sprint",
>    "startsAt":"6/22/2022, 10:00:00 AM",
>    "endsAt":"6/22/2022, 11:00:00 AM",
>    ...
> }
```

That should remind everyone in the "Dev" group to attend that standup.


<a href="https://next-events-api.vercel.app/" target="_blank" title="Ctrl click to open in new window. Markdown doesn't support this yet.">> View complete documentation for API</a>


## License
This project is licensed under [MIT](https://github.com/asathkumara/next-events-api/blob/main/LICENSE). Feel free to re-use any libraries or code for **non-commercial use** but do your due diligence with attributing credit.
