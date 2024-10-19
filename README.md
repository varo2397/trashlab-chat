# Installation

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
2. Create the ios and android folders

   ```bash
   npx expo prebuild --clean // this is just to make sure you have everything ready
   ```
3. Start the app

   ```bash
    npx expo run:ios or npx expo run:ios
   ```

# Folder structure
├── app // default expo folder where to keep the screens
├── assets // storage of static assets like images and fonts
├── components // if a component belongs to a screen it's a folder with the name of the route
├── constants // keep constants used throughout the app, colors in ths case
├── context // place to kepp all global state management
├── firebase // each firebase feature used, has it own folder with files specific to one feature
├── services // abstractions of packages so that if in the feature I want to change the implementation, I can do it one place
├── types // types manly for backend return objects

# Firestore architecture 

1. Users Collection (users)
Purpose: Stores basic user information, since the user is not the focus of this app
Document ID: Typically, the document ID is the userId, which uniquely identifies each user.
Fields:
username: The user’s display name.
Example:
```
users/
  userId1
  userId2
  userId3
```

2. Chats Collection (chats)
Purpose: Stores metadata about each chat between users, such as participants, the last message sent, and timestamps.
Document ID: The chatId, which is a unique identifier for each conversation.
Fields:
participants: An array of user IDs (e.g., ["username1", "username2"]) who are part of the chat.
lastMessage: A preview of the last message sent in the chat. Ths is to keep things simpler and not have to search the conversation each time we just wanted the last message
lastMessageTimestamp: A timestamp for the last message.
createdAt: Timestamp for when the chat was created.
Example:
```
chats/
  chatId1
  chatId2
```

3. Messages Subcollection (messages)
Purpose: Stores all messages exchanged between participants in a specific chat. This is a subcollection inside each chat document.
Document ID: The messageId, which uniquely identifies each message within the chat.
Fields:
senderName: The username of the user who sent the message.
text: The message content in case is a text.
timestamp: The time the message was sent.
likedBy: An array of usernames who have liked the message.
imageURL: The image url saved in the bucket of firebase storage
isRead: A boolean indicating if the message has been read by the recipient(s), this wasn't implemented due to time restraints, however it exists the possibility of adding it.
Example:
```
chats/
  chatId1/
    messages/
      messageId1
      messageId2
  chatId2/
    messages/
      messageId3
      messageId4
```

# Additional features that could be added 
- Read and amount of unread messages in each conversation
- Group chats
- Search in contacts screen
- Push notifications
- Vibration when a new message when you're inside the app or when you double tap to like a message


# Posible improvements 
- Add eslint and prettier to the project
- Clean up subscriptions for snapshots in firebase(Typescript kept complaining that the snapshot didn't return a unsubscribe function)
- Create a proper design system so that styling can be more organized and easier to change in the future
- Better error handling, the app as it is, only handles console logs for when something goes wrong, there should something to notify the user of what happened

