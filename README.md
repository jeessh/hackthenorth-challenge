# Hack The North 2024 - Front End Challenge

The objective of this challenge is to build a tool to showcase events for both hackers and the public.
The following requirements were set:

1. Display the information for all events provided when visiting the app
2. Sort these events in order by start_time
3. Hide the ability to view `private` events behind a login screen. Specifically, users who haven't logged in can only view `public` events, while logged in users can view both `public` and `private` events
    - Login details can be hard-coded (i.e. you can choose the username/password combination that will login properly)
4. Provide a way to link to and view each related event

This challenge implementation was built using `React` + `CSS`.

The following dependencies were used on top of React:
- `react-router-dom`
- `@apollo/client`
- `momentJS`
- `auth0`