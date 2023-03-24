import React,{useEffect, useState} from "react";



function App() {


  const [text, setText] = useState("");
  const [name, setName] = useState("lokesh");


  
  // Variation 1 --> Every Render
  // useEffect(()=>{
  //   console.log("UI Rendering Done -- Variation 1");
  // });


  // Variation 2 --> First Render
  // useEffect(()=>{
  //   console.log("UI Rendering Done  --  Variation 2");
  // },[]);



  // Variation 3 -->First Render + Whenever dependencies-(condition) changes
  // useEffect(()=>{
    // console.log("Change observed  --  Variation 3");
  // },[text]);
  
  // useEffect(()=>{
  //   console.log("Change observed  --  Variation 3"); 
  // },[name]);



  // Variation 3 -->First Render + Whenever dependencies-(condition) changes
  useEffect(()=>{
    console.log("Listener added"); 

    // this will execute first than clg("Listener added")
    return ()=>{
      console.log("Listener removed")
    }
  },[text]);





  function changeHandler(event){
    console.log(text);
    setText(event.target.value);
  }




  return (
    <div className="App text-center">
    
      <input 
        type = "text" 
        onChange = {changeHandler}
        className = "border-2 border-indigo-600  mt-2"
        placeholder = "Type here..."  
      />
       

    </div>
  );
}

export default App;
