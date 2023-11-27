import { useEffect, useState } from 'react';
import './App.css';
import LoadFile from './LoadFile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Chat from './Chat';
import * as qna from "@tensorflow-models/qna";
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

function App() {

  const [messages, setMessages] = useState([{
    text: "Metin hakkında soru sorabilirsiniz? (Şimdilik ingilizce)",
    time: new Date().toLocaleString(),
    from: "chatbot"
  }])
  const [model, setModel] = useState();
  const [modelUse, setModelUse] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoadFile, setIsLoadFile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setLoading(true);
    setModelState(qna);

  }, [])

  async function setModelState(lib) {
    const model = await lib.load();
    setModel(model);
    const modelUse = await use.load();
    setModelUse(modelUse);
    setLoading(false);
  }

  // async function questionAnswering(userQuestion) {

  //   const qaData = [
  //     { question: "soru", answer: "cevap" },
  //   ];
  //   var questionEmbeddings;
  //   use.load().then(model => {
  //     const sentences = [
  //       'Hello.',
  //       'How are you?'
  //     ];
  //     model.embed(sentences).then(async embeddings => {

  //       questionEmbeddings = embeddings;
  //       const similarities = await tf.losses.cosineDistance(embeddings, qaEmbeddings).data();
  //       const maxSimilarityIndex = similarities.indexOf(Math.max(...similarities));
  //       console.log(maxSimilarityIndex);
  //     });
  //   });

  // }

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
    const answers = await model.findAnswers(message, inputValue);
    // questionAnswering(message);
    if (answers.length > 0) {
      const newMessageChatbot = {
        text: answers[0].text,
        time: new Date().toLocaleString(),
        from: "chatbot"
      }
      const mesEnd = [...mesHuman, newMessageChatbot];
      setMessages(mesEnd);
      setIsTyping(false);
    } else {
      const newMessageChatbot = {
        text: "Üzgünüm :( Bu soruna cevap veremiyorum.",
        time: new Date().toLocaleString(),
        from: "chatbot"
      }
      const mesEnd = [...mesHuman, newMessageChatbot];
      setMessages(mesEnd);
      setIsTyping(false);
    }

  }

  return (
    <div className="App">
      <Container>
        <Row className='w-100'>
          <Col xs={12}>
            {
              !isLoadFile ?
                <LoadFile saveText={saveText} /> :
                loading ?
                  <p> Lütfen Bekleyiniz.. <br/> Bir kaç dakika sürebilir...</p> :
                  <Chat messages={messages} addChat={addChat} />
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
