import React, { useState, useEffect, useRef } from 'react';
import { useSignalR } from '../../hooks/useSignalR'; // Assuming you have a useSignalR hook
import {
  Navbar,
    Page,
    Messages,
    MessagesTitle,
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
  const [sending, setSending] = useState(false); // State to track sending state
  const messagebar = useRef(null);
  const messagesEndRef = useRef(null);
  const [typingMessage, setTypingMessage] = useState(null);

  useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messagesData]);

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
  const sendToGeminiAPI = async (message) => {
    try {
      setSending(true); // Set sending state to true
      setMessageText('');
      setTypingMessage({
            name: 'Chess Assistan',
            avatar: 'https://library.kissclipart.com/20190209/jww/kissclipart-catur-kuda-clipart-chess-battlefy-inc-game-9c1a9d225f763183.png'
      });

      const response = await fetch('https://chess-gemini.azurewebsites.net/api/chess-gemini?code=QXqNrbk8VEJjAX5LCyFerl8szL_4bK1qDcJ1406s9RC7AzFurelOGQ==', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "prompt": message
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      setTypingMessage(null);

      const data = await response.text();
      return data;
    } catch (error) {
        console.error('Error sending message:', error);
        return null;
    } finally {
      setSending(false);
    }
  };

  // Function to handle sending a message
  const sendMessage = async () => {
      
    const text = messageText.trim();

    if (!text || sending) {
      return; // Do nothing if message is empty or already sending
    }

    try {
        const sentMessage = {
            type: 'sent',
            text,
        };
        setMessagesData([...messagesData, sentMessage]);

        const geminiResponse = await sendToGeminiAPI(text);

        if (!geminiResponse) {
        // Handle API error if sendToGeminiAPI returned null
        return;
        }    
        
        const plainText = geminiResponse.replace(/[`*]/g, '');

        const receivedMessage = {
            type: 'received',
            text: plainText,
            name: 'Chess Assistant',
            avatar: 'https://library.kissclipart.com/20190209/jww/kissclipart-catur-kuda-clipart-chess-battlefy-inc-game-9c1a9d225f763183.png',
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
       <Messages style={{height: '80vh'}}>
                    <MessagesTitle>
                            <b>Your AI assistant</b>
                    </MessagesTitle>
                    {messagesData.length === 0 && 
                        (
                           <span 
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '30px',
                                color: 'lightgray',
                                height: '100%', 
                                width: '100%', 
                            }}
                            >
                            How can I assist you?
                        </span>
                        )
                    }

                    {messagesData.map((message, index) => (
                        <Message
                            key={index}
                            type={message.type}
                            image={message.image}
                            name={message.name}
                            avatar={message.avatar}
                            first={true}
                            last={true}
                            tail={true}
                            
                        >
                            {message.text && (
                                <span slot="text" dangerouslySetInnerHTML={{ __html: message.text }} />
                            )}
                        </Message>
                    ))}

                    {typingMessage && (
                        <Message
                            type="received"
                            typing={true}
                            first={true}
                            last={true}
                            tail={true}
                            header={`${typingMessage.name} is typing`}
                            avatar={typingMessage.avatar}
                        />
                    )}
                    
                    <div ref={messagesEndRef} />
            </Messages>
        <Messagebar 
        style={{ paddingLeft: 13 }} 
        value={messageText} 
        onInput={(e) => setMessageText(e.target.value)}>
          <Link 
          iconIos="f7:arrow_up_circle_fill" 
          iconMd="material:send" 
          slot="inner-end" 
          onClick={sendMessage} 
          disabled={sending} 
          style={sending ? { color: 'gray' } : {}} />
        </Messagebar>
      </Page>
    </Popup>
  );
}
