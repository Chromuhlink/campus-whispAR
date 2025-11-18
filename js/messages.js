// Message operations with Firebase
import { db, collection, addDoc, getDocs } from './firebase-config.js';

// Save a message to Firestore
export async function saveMessage(messageText) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      text: messageText,
      timestamp: new Date().toISOString(),
      location: "campus" // You can customize this
    });
    console.log("Message saved with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving message:", error);
    return { success: false, error: error.message };
  }
}

// Get all messages from Firestore
export async function getMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return messages;
  } catch (error) {
    console.error("Error getting messages:", error);
    return [];
  }
}
