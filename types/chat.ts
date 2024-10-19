import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Message = {
    senderName: string;
    text?: string;
    imageUrl?: string;
    sentAt?: FirebaseFirestoreTypes.Timestamp;
    likes: string[];
    readBy: {
        userId: string;
        readAt: FirebaseFirestoreTypes.Timestamp;
    }[];
    messageId: string;
};

export type Chat = {
    createdAt: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
    participants: string[];
    lastMessage: string;
    lastMessageTimeStamp: FirebaseFirestoreTypes.Timestamp | null;
    lastMessageSender: string;
    messages?: FirebaseFirestoreTypes.DocumentReference;
    chatId: string;
};

