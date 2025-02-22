import { useEffect, useState } from 'react'
import './App.css'
import EnterMessageForm from './components/EnterMessageForm/EnterMessageForm'
import MessagesBlock from './components/MessagesBlock/MessagesBlock'
import { getNewGUIDString, guid, MessageData } from './types'

function App() {

  const [data, setData] = useState<MessageData[]>([]);
  const [uuid, setUuid] = useState(localStorage.getItem('uuid'));
  const [lastId, setLastId] = useState<number | undefined>(undefined);

  if (!localStorage.getItem('uuid')) {
    let newUuid: string = getNewGUIDString();
    localStorage.setItem('uuid', newUuid);
    setUuid(newUuid);
  }


  useEffect(() => {
    let timerId = setInterval(() => {
      fetch(`/api/messages`)
        .then((response) => response.json())
        .then((newData) => {
          setData(newData);
        })
    }, 2000);

    return () => {
      clearInterval(timerId);
    }
  }, []);


  function onSend(e) {
    let newMessage: MessageData = {
      id: 0,
      userId: uuid,
      content: e.target.text.value
    }
    setData([...data, newMessage]);

    fetch('/api/messages', {
      method: 'POST', body: JSON.stringify(newMessage), headers: { 'Content-Type': 'application/json' }
    });

    fetch(`/api/messages`)
      .then((response) => response.json())
      .then((newData) => setData([newData]));

    e.preventDefault();
  }


  /*

  

  function refresh() {
    if (lastId > 0) {
      console.log(`refresh last id > 0 last id = ${lastId}`);
      fetch(`/api/messages/${lastId}`)
        .then((response) => response.json())
        .then((newData) => setData([newData]));
    }
    else {
      console.log(`refresh last id = 0 last id = ${lastId}`);
      fetch(`/api/messages`)
        .then((response) => response.json())
        .then((newData) => setData([newData]));
    }
  }

 



  
*/
  return (
    <div className='chat-area'>
      <p>my-uuid = {uuid}</p>
      <button onClick={() => {
        localStorage.removeItem('uuid');
        setUuid('');
      }}>get new uuid</button>
      <div className='header-area'>
        <h1>Anonymous chat</h1>
      </div>
      <div className='messages-area'>
        <MessagesBlock messages={data} myUuid={uuid}></MessagesBlock>
      </div>
      <div className='input-area'>
        <EnterMessageForm onSend={(e) => onSend(e)}></EnterMessageForm>
      </div>
    </div>
  )
}

export default App
