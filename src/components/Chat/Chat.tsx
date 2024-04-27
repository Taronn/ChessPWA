import React, { useEffect, useRef, useState } from 'react';
import { useSignalR } from '../../hooks/useSignalR';
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

export function Chat() {
    const avatars = [
        'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
        'https://cdn.framework7.io/placeholder/cats-200x260-4.jpg',
    ];
    const people = [
        {
            name: 'Kate Johnson',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        },
        {
            name: 'Blue Ninja',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
        },
    ];
    const answers = [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!',
    ];
    const { SignalRContext } = useSignalR();
    const [typingMessage, setTypingMessage] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [messagesData, setMessagesData] = useState([
        {
            type: 'sent',
            text: 'Hi, Kate',
        },
        {
            type: 'sent',
            text: 'How are you?',
        },
        {
            name: 'Kate',
            type: 'received',
            text: 'Hi, I am good!',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        },
        {
            name: 'Blue Ninja',
            type: 'received',
            text: 'Hi there, I am also fine, thanks! And how are you?',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
        },
        {
            type: 'sent',
            text: 'Hey, Blue Ninja! Glad to see you ;)',
        },
        {
            type: 'sent',
            text: 'Hey, look, cutest kitten ever!',
        },
        {
            type: 'sent',
            image: 'https://cdn.framework7.io/placeholder/cats-200x260-4.jpg',
        },
        {
            name: 'Kate',
            type: 'received',
            text: 'Nice!',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        },
        {
            name: 'Kate',
            type: 'received',
            text: 'Like it very much!',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        },
        {
            name: 'Blue Ninja',
            type: 'received',
            text: 'Awesome!',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
        },
    ]);

    const responseInProgress = useRef(false);
    const messagebar = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        f7ready(() => {
            messagebar.current = f7.messagebar.get('.messagebar');
        });
    });
    const isFirstMessage = (message, index) => {
        const previousMessage = messagesData[index - 1];
        if (message.isTitle) return false;
        if (
            !previousMessage ||
            previousMessage.type !== message.type ||
            previousMessage.name !== message.name
        )
            return true;
        return false;
    };
    const isLastMessage = (message, index) => {
        const nextMessage = messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
            return true;
        return false;
    };
    const isTailMessage = (message, index) => {
        const nextMessage = messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
            return true;
        return false;
    };
    const sendMessage = () => {
        const text = messageText.replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        if (text.length) {
            messagesToSend.push({
                type:'sent',
                text,
            });
        }
        if (messagesToSend.length === 0) {
            return;
        }
        SignalRContext.invoke('SendMessage', text);
        setMessagesData([...messagesData, ...messagesToSend]);       
        setMessageText('');
        

        // Focus area
        if (text.length) messagebar.current.focus();

        // Mock response
        if (responseInProgress.current) return;

        responseInProgress.current = true;

    };

    SignalRContext.useSignalREffect('ReceiveMessage', (player, message) => {
        const messagesToSend = [];
        if (message.length) {
            messagesToSend.push({
                text: message,
                type: 'received',
                name: player.username,
                avatar: player.picture 
            });
        }
        if (messagesToSend.length === 0) {
            return;
        }

        setTimeout(() => {
            setTypingMessage({
                name: player.username,
                avatar: player.picture,
            });
            setTimeout(() => {
                setTypingMessage(null);
                setMessagesData([
                    ...messagesData,
                    {
                        text: message,
                        type: 'received',
                        name: player.username,
                        avatar: player.picture
                    },
                ]);
            }, 1000);
        }, 1000);

    }, [setMessagesData]);

    // Scroll to bottom of messages when messagesData updates
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messagesData]);

    const currentDate = new Date();

    // Define months array for month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Format date and time string
    const formattedDate = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    return (
        <Popup className='chatPopup' swipeToClose>
            <Page>
            {/* <Navbar title="Messages"></Navbar> */}

                <Messages>
                    <MessagesTitle>
                            <b>{formattedDate}</b>
                    </MessagesTitle>

                    {messagesData.map((message, index) => (
                        <Message
                            key={index}
                            type={message.type}
                            image={message.image}
                            name={message.name}
                            avatar={message.avatar}
                            first={isFirstMessage(message, index)}
                            last={isLastMessage(message, index)}
                            tail={isTailMessage(message, index)}
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

                <Messagebar style={{ paddingLeft: 13 }}
                    value={messageText}
                    onInput={(e) => setMessageText(e.target.value)}
                >
                    <Link
                        iconIos="f7:arrow_up_circle_fill"
                        iconMd="material:send"
                        slot="inner-end"
                        onClick={sendMessage}
                    />
                </Messagebar>
                
            </Page>
        </Popup>
    );
};