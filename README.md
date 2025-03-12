# Note-Taking Web Application

This is a web-based note-taking application that allows users to create, edit, delete, search, and filter notes. The app also provides options for logging in with Google, uploading images and videos into the notes, and deleting the user account.

## Features

- **Google Login**: Users can log in using their Google account.
- **Create Notes**: Add new notes with title and content.
- **Edit Notes**: Edit the content of existing notes.
- **Delete Notes**: Delete unwanted notes.
- **Search Notes**: Search notes by title or content.
- **Filter Notes**: Filter notes based on specific criteria.
- **Media Embedding**: Upload and embed images and videos within notes.
- **Delete Account**: Users can delete their accounts.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MariaDB
- **Authentication**: Google OAuth

![image](https://github.com/user-attachments/assets/9fb7b011-cecc-426e-8635-e025ddb55e24)
![image](https://github.com/user-attachments/assets/29b9ab54-9d56-425f-b7f1-1fddc0fa56b2)
![image](https://github.com/user-attachments/assets/5f94e7bd-3f96-42f1-8a07-a10c10ab704e)
![image](https://github.com/user-attachments/assets/4f62b6cf-7cef-4c94-88bb-87c88838daa8)

### Setup .env file

```shell
PORT = 5000
DB_USERNAME="write username here"
DB_PASSWORD="write password here"
DB_DIALECT="mysql"
DB_DATABASE="NotesApp"
```

### Set up your google clientID

```shell
Navigate to frontend/src/index.js, and add your clientID
```

### Install node_modules

```shell
npm run install-all
```

### Start the app

```shell
npm run dev
```
