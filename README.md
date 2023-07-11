
### Decentralized Social Network: A Django & React Application

This project is a Django & React based social media application, as described by the given files. 

## Installation

- Ensure Python, Node.js and pip are installed on your system
- Clone the repository to your local workspace

- Install the Node Modules with the following command:
```bash
npm install
```

## Launching the server

- Change to the backend directory and start the server using the following command:
```bash
python manage.py runserver
```
- In a new terminal, navigate to the frontend directory and start the node server
```bash
npm start
```

## Provided Functionality

- User registration and authentication, including token-based session management
- Standardised `urls.py` for REST-based endpoint creation 
- Users can create, view, update and delete posts
- Users can view other user's posts 
- All form entries are fully validated
- All site navigation is done via React Router

## Routes/URLs

- /admin/
- /login/
- /signup/
- /test-token/

## Models Included 

- `User`
- `Post`
- `Admin`
- `Login`
- `Signup`
- `TestToken`

## Viewsets Included 

- `AdminViewSet`
- `LoginViewSet`
- `SignupViewSet`
- `TestTokenViewSet`
- `UserViewSet`
- `PostViewSet`

## React App Structure

- App.jsx
- NavBar.jsx
- Signup.jsx
- Signin.jsx
- NewPost.jsx
- EditPost.jsx
- Profile.jsx
- PostDetails.jsx
- AuthContextComponent.jsx

## Notes

- Please note that delete a post, you need to be the author of the post.
- To update or retrieve a specific user, you can perform a GET or PUT on `/users/<username>/` or `/users/<user_id>/`.
- Similarly, to update or retrieve a specific post, you can perform a GET or PUT on `/posts/<post_id>/` or `/posts/<post_author>/`.
••◦

## Key Features

- **User Administration**: Django's built-in User model was extended upon on by adding a unique "handle". The admin view allows for manipulation of those user records.
- **Post Creation and Management**: Users can create posts, which are presented in a descending ordered list. Users can only delete their own posts.
- **Authentication Flow**: Authentication has been implemented through Token Authentication. Routes exist for login and signup, which return a token upon successful execution.
- **React Frontend**: The frontend is powered by React and provides an interactive user interface for the social media app.
- **Secure Password Storage**: User passwords are hashed before they are stored in the database, hence even developers or users with database access cannot view actual user passwords.
- **Authorization**: The deletion and editing of posts are protected routes and require the user to be authenticated.

## Usage:

- **Signup**:
  - Navigate to the signup page by clicking the "Signup" link on the Navbar
  - Fill in the required information and click the Signup button
  - Upon successful registration, the user is redirected back to the login page

- **Login**:
  - Navigate to the login page by clicking the "Signin" link on the Navbar
  - Enter your username and password and click the Login button
  - Upon successful authentication, the user is redirected to the homepage, and a user token is stored in the localStorage

- **Create new post**:
  - Navigate to the create post page, fill your contents in the text field and click the Submit button
  - The post appears on the All Posts page and the user’s Profile page.

- **View all posts**:
  - Click on the 'All posts' link in the Navbar
  - This page displays all the posts that users have created in order of creation date
  - Users are unable to delete posts they do not own

- **Delete a post**:
  - This functionality only appears for the posts that the logged-in user owns
  - Go in the detail view of the post and click the Delete button to delete a post
  - Users are redirected to the home page upon successful deletion.

- **View a user's profile** 
  - Click the username for any post. This will take you to a page that shows all posts by that user
      
## Future Work

- **Web 3.0 Integration:** Consider integrating decentralized tools and platforms, like Ethereum for smart contracts, to add cryptocurrency transactions to your app. This can provide opportunities for content creators to be paid in cryptocurrency for their posts, or for users to sell/buy products or services.

- **Decentralized Identity Verification (DiD):** Implement a decentralized identity verification system. This can enhance user data privacy as users control their own identity and choose what data to share.

- **Smart Contracts:** Automate various operations using self-executing contracts with the terms of agreement directly written into lines of code.

- **Non-Fungible Tokens (NFTs):** Introduce the ability for users to mint their posts as NFTs, which can then be sold or traded on the platform.

- **Decentralized Autonomous Organizations (DAO):** Implement a DAO model for platform governance where users vote on different proposals.

Implementing these Web 3.0 features would offer a future-proof social media platform stamped with trust, privacy, and overall better user governance.
