import React, { useState, useEffect, useRef } from 'react';
import { useSignalR } from '../../hooks/useSignalR'; // Assuming you have a useSignalR hook
import {
  Navbar,
  Page,
  Messages,
  Message,
  Messagebar,
  Link,
  MessagebarAttachments,
  MessagebarAttachment,
  MessagebarSheet,
  MessagebarSheetImage,
  f7ready,
  f7,
  Popup,
} from 'framework7-react';

export function AiAssistant() {
  const [messageText, setMessageText] = useState('');
  const [messagesData, setMessagesData] = useState([]);
  const messagebar = useRef(null);

  // Fetch message bar reference after component mounts
  useEffect(() => {
    const getMessagebarRef = async () => {
      try {
        messagebar.current = document.querySelector('.messagebar');
      } catch (error) {
        console.error('Error fetching message bar reference:', error);
      }
    };
    getMessagebarRef();
  }, []);

  // Function to send a POST request to the API
  const sendToGeminiAPI = async (messageText) => {
    try {
      const response = await fetch('https://chess-gemini.azurewebsites.net/api/chess-gemini?code=QXqNrbk8VEJjAX5LCyFerl8szL_4bK1qDcJ1406s9RC7AzFurelOGQ==', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                                "prompt": `${messageText}`
                              }),
      });
      debugger
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle errors here (consider logging or displaying an error message)
      console.error('Error sending message:', error);
      return null; // Indicate error or handle differently
    }
  };

  // Function to handle sending a message
  const sendMessage = async () => {
      
    const text = messageText.trim();

    if (!text) {
      return; // Do nothing if message is empty
    }

    try {
      const geminiResponse = await sendToGeminiAPI(text);

      if (!geminiResponse) {
        // Handle API error if sendToGeminiAPI returned null
        return;
      }
      debugger
      const sentMessage = {
        type: 'sent',
        text,
      };

      const receivedMessage = {
        type: 'received',
        text: geminiResponse.message,
        name: 'Gemini',
        avatar: 'https://mspoweruser.com/wp-content/uploads/2023/12/Google-Gemini-AI-model.jpg',
      };

      setMessagesData([...messagesData, sentMessage, receivedMessage]);
      setMessageText('');

      if (messagebar.current) {
        messagebar.current.focus();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Popup className='AiAssistant' swipeToClose>
      <Page>
        <Messages>
          {messagesData.map((message, index) => (
            <Message key={index} type={message.type} text={message.text} />
          ))}
        </Messages>

        <Messagebar style={{ paddingLeft: 13 }} value={messageText} onInput={(e) => setMessageText(e.target.value)}>
          <Link iconIos="f7:arrow_up_circle_fill" iconMd="material:send" slot="inner-end" onClick={sendMessage} />
        </Messagebar>
      </Page>
    </Popup>
  );
}
