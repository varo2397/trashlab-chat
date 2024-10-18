import firestore from '@react-native-firebase/firestore';
export const sendMessage = async (chatId: string, senderName: string, messageText: string) => {
    try {
      // Reference to the messages subcollection in the specific chat
      const messagesRef = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages');

    
        const chatRef = firestore().collection('chats').doc(chatId);

  
      // Add the message to the messages subcollection
      await messagesRef.add({
        senderName: senderName,     // The ID of the user sending the message
        text: messageText,      // The message text
        sentAt: firestore.FieldValue.serverTimestamp(), // Server timestamp
        likes: [],              // Empty array for likes initially
        readBy: [],             // Empty array for read status initially
      });

      // Update the chat document with the last message and timestamp
    await chatRef.update({
        lastMessage: messageText,
        lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
        lastMessageSender: senderName,
      });
  
  
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

export const likeMessage = async (chatId: string, messageId: string, userSender: string) => {
  try {
    // Reference to the specific message inside the messages subcollection
    const messageRef = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .doc(messageId);

    // Update the 'likes' array field by adding the userId if it's not already there
    await messageRef.update({
      likes: firestore.FieldValue.arrayUnion(userSender),
    });

    console.log('Message liked successfully!');
  } catch (error) {
    console.error('Error liking message:', error);
  }
};

export const unlikeMessage = async (chatId: string, messageId: string, userSender: string) => {
  try {
    // Reference to the specific message inside the messages subcollection
    const messageRef = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .doc(messageId);

    // Use Firestore arrayRemove to remove the userId from the 'likes' array
    await messageRef.update({
      likes: firestore.FieldValue.arrayRemove(userSender),
    });

    console.log('Message unliked successfully!');
  } catch (error) {
    console.error('Error unliking message:', error);
  }
};