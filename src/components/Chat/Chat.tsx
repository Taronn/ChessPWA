// //import { Button, Icon, Link } from 'framework7-react';
// //import { IUser } from '../Shared/types';
// //import { useState } from 'react';
// //import { GameType } from '../Shared/constants';
// //import { useTranslation } from 'react-i18next';
// //import countries from 'i18n-iso-countries';
// import { useState } from 'react';
// import '../../css/app.css';
// //interface IProfileProps {
// //    user: IUser;
// //}
// export function Chat() {
//     //const { t, i18n } = useTranslation();
//     const [messages, setMessages] = useState(['asdasd', 'barior dzez', 'Vacho jan']);
//     const [inputText, setInputText] = useState('');

//     const handleMessageSend = () => {
//         if (inputText.trim() !== '') {
//             setMessages([...messages, { text: inputText, sentByUser: true }]);
//             setInputText('');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="header">
//                 <h2>Chat Messenger</h2>
//             </div>
//             <div className="chat-box">
//                 {messages.map((message, index) => (
//                     <div
//                         key={index}
//                         // className={message ${message ? 'sent' : 'received'}}
//                     >
//                         {message}
//                     </div>
//                 ))}
//             </div>
//             <div className="input-box">
//                 <input
//                     type="text"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     placeholder="Type a message..."
//                     className="message-input"
//                 />
//                 <button onClick={handleMessageSend} className="send-btn">Send</button>
//             </div>
//         </div >
//     );
// }




import React, { useEffect, useRef, useState } from 'react';
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
    const images = [
        'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
        'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
        'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
        'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
        'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
        'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
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
                text,
            });
        }
        if (messagesToSend.length === 0) {
            return;
        }
        setMessagesData([...messagesData, ...messagesToSend]);
        setMessageText('');

        // Focus area
        if (text.length) messagebar.current.focus();

        // Mock response
        if (responseInProgress.current) return;

        responseInProgress.current = true;

        setTimeout(() => {
            const answer = answers[Math.floor(Math.random() * answers.length)];
            const person = people[Math.floor(Math.random() * people.length)];
            setTypingMessage({
                name: person.name,
                avatar: person.avatar,
            });
            setTimeout(() => {
                setTypingMessage(null);
                setMessagesData([
                    ...messagesData,
                    ...messagesToSend,
                    {
                        text: answer,
                        type: 'received',
                        name: person.name,
                        avatar: person.avatar,
                    },
                ]);
                responseInProgress.current = false;
            }, 4000);
        }, 1000);
    };

    return (
        <Popup className='chatPopup' swipeToClose>
            <Page>
            {/* <Navbar title="Messages"></Navbar> */}

            <Messages>
                <MessagesTitle>
                    <b>Sunday, Feb 9,</b> 12:58
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
            </Messages>

            <Messagebar
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