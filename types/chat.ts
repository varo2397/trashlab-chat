import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Message = {
    senderName: string;
    text?: string;
    imageUrl?: string;
    sentAt: FirebaseFirestoreTypes.Timestamp;
    likes: {
        likedBy: string;
        likedAt: FirebaseFirestoreTypes.Timestamp;
    }[];
    readBy: {
        userId: string;
        readAt: FirebaseFirestoreTypes.Timestamp;
    }[];
    messageId: string;
};

export type Chat = {
    createdAt: FirebaseFirestoreTypes.Timestamp;
    participants: string[];
    lastMessage: string;
    lastMessageTimeStamp: FirebaseFirestoreTypes.Timestamp;
    lastMessageSender: string;
    messages?: FirebaseFirestoreTypes.DocumentReference;
    chatId: string;
};

