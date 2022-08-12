import './App.css';
import { useState } from "react";


function App() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const submitFormToNotion = () =>{
    console.log("We are in");
    fetch("http://localhost:4000/submitFormToNotion", {
      method:"post",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        phoneNumber: phoneNumber,
        extraInfo: extraInfo
      })
    }).then(response => response.json())
    .then(data => {
      console.log("Success", data);
    }).catch(error=>{
      console.log(error);
    })
  }
  
  return (
    <div className="App">
      <div style={{maxWidth: "500px", margin: "0 auto"}}>
        <h1>Interested in learning more? Put your info in below!</h1>
        <p>Name</p>
        <input type="text" id="name" onChange={(e)=>setName(e.target.value)}/>
        <p>Phone Number</p>
        <input type="text" id="phoneNumber" onChange={(e)=>setPhoneNumber(e.target.value)}/>
        <p>Anything else?</p>
        <textarea onChange={(e)=>setExtraInfo(e.target.value)} rows={10} cols={25}/>

        <div>
          <button onClick={submitFormToNotion}>
            Submit to notion
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
