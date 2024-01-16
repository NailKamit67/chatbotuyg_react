import { useEffect, useState } from 'react';
import './App.css';
import LoadFile from './LoadFile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Chat from './Chat';
import axios from 'axios';

function App() {

  const [messages, setMessages] = useState([{
    text: "Metin hakkında soru sorabilirsiniz? (Şimdilik ingilizce)",
    time: new Date().toLocaleString(),
    from: "chatbot"
  }])
  const [modelUse, setModelUse] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoadFile, setIsLoadFile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setLoading(true);

  }, [])

  function saveText(input) {
    if (input) {
      setInputValue(input);
      setIsLoadFile(true);
    }
  }

  async function addChat(message) {
    const newMessageHuman = {
      text: message,
      time: new Date().toLocaleString(),
      from: "human"
    }
    const mesHuman = [...messages, newMessageHuman]
    setMessages(mesHuman);
    setIsTyping(true);
    // const answers = await model.findAnswers(message, inputValue);
    const bodyFormData = new FormData();
    bodyFormData.append('question', message);
    bodyFormData.append('context', inputValue);
    axios.post('http://127.0.0.1:5000/chatbot',bodyFormData).then((response) => {
      const newMessageChatbot = {
        text: response.data?.answer || "Üzgünüm :( Bu soruna cevap veremiyorum.",
        time: new Date().toLocaleString(),
        from: "chatbot"
      }
      const mesEnd = [...mesHuman, newMessageChatbot];
      setMessages(mesEnd);
      setIsTyping(false);
    })

  }

  return (
    <div className="App">
      <Container>
        <Row className='w-100'>
          <Col xs={12}>
            {
              !isLoadFile ?
                <LoadFile saveText={saveText} /> :
                <Chat messages={messages} addChat={addChat} />
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
