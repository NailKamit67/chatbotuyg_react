import { createRef, useEffect, useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';

function Chat(props) {
    const [message, setMessage] = useState("");

    const chatWindow = createRef();

    function sendMessage(){
        props.addChat(message);
        setMessage("");
        chatWindow.current.scrollIntoView({ behavior: "smooth" });
    }

    function onKeydown(e) {
        if(e.keyCode === 13) {
            sendMessage();
        }
    }

    return (
        <>
            <div className="chat_window" ref={chatWindow}>
                {
                    props.messages ?
                        props.messages.map(obj => {
                            return (
                                <div className={obj.from === "chatbot" ? "chat_item chat_item--customer" : "chat_item chat_item--expert"} key={obj.time} >
                                    <div className="chat_item-meta">
                                        <div className="chat_item-avatar">
                                            <img className="chat_item-avatarImage" src="https://image.ibb.co/eTiXWa/avatarrobot.png" />
                                        </div>
                                    </div>
                                    <div className="chat_item-chatContent">
                                        <div className="chat_item-chatText">{obj.text}</div>
                                        <div className="chat_item-timeStamp"><strong>{obj.from === 'chatbot' ? "ChatBot" : "Ben"}</strong> • {obj.time}</div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                }

            </div>
            <div className='d-flex'>
                <FormControl className='inputMessage' as="textarea" placeholder='Metin hakkında sorular sorabilirsiniz?' rows={3} onKeyDown={(e)=> onKeydown(e)} value={message} onChange={e=> setMessage(e.target.value)} />
                <Button className='h-50' onClick={()=> sendMessage()}> Gönder</Button>
            </div>
        </>
    );
}

export default Chat;
