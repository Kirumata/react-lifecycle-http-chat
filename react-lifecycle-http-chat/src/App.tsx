import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import EnterMessageForm from './components/EnterMessageForm/EnterMessageForm'
import MessagesBlock from './components/MessagesBlock/MessagesBlock'
import { getNewGUIDString, guid, MessageData } from './types'

function App() {

  const [data, setData] = useState<MessageData[]>([]);
  const [message, setMessage] = useState<MessageData>({id: 0, userId: getUuid(), content: ""});
  const [uuid, setUuid] = useState(localStorage.getItem('uuid'));
  const [lastId, setLastId] = useState<number>(0);

  

  function getUuid() : string{
    let curUuid : string | null = localStorage.getItem('uuid');
    let result : string;
    if (!curUuid) {
      let newUuid: string = getNewGUIDString();
      localStorage.setItem('uuid', newUuid);
      result = newUuid;
    }
    else{
      result = curUuid as string;
    }
    return result;
  }
  
  async function refresh() {
    console.log(`http://localhost:7070/messages?from=${lastId}`);
    let response = await fetch(`http://localhost:7070/messages`);
    let newData = await response.json();
    setData(newData);
    /*
    for (let i = 0; i < newData.length; i++){
      setData([...data, newData[i]]);
    }*/
  }

  useEffect(() => {
    let timerId = setInterval(async () => {
      await refresh();
    }, 2000);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  useEffect(() => {
    console.log("hi"+data.length);
    setLastId(data.length);
    console.log("lastId"+lastId);
    }, [data]);
 

  async function submit(e: React.FormEvent) {
    setData([...data, message]);

    fetch('http://localhost:7070/messages', {
      method: 'POST', body: JSON.stringify(message), headers: { 'Content-Type': 'application/json' }
    });

    refresh();

    e.preventDefault();
  }

  function change(e: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setMessage(prevForm => ({ ...prevForm, [name]: value }));
  };

  return (
    <>
    <p>my-uuid = {uuid}</p>
      <button onClick={() => {
        localStorage.removeItem('uuid');
        setUuid('');
      }}>get new uuid</button>
    <div className='chat-area'>
      <div className='header-area'>
        <h1>Anonymous chat</h1>
      </div>
      <div className='messages-area'>
        <MessagesBlock messages={data} myUuid={uuid}></MessagesBlock>
      </div>
      <div className='input-area'>
        <EnterMessageForm handleSubmit={submit} handleChange={change}></EnterMessageForm>
      </div>
    </div>
    </>
  )
}

export default App
