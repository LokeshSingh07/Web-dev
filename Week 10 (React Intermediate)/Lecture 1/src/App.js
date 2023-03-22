import React, { useState } from "react";

const App = () => {

  // const [firstName, setFirstName] = useState("");
  // const [lasttName, setLasttName] = useState("");

  // function changeFirstNameHandler(event){
  //   // console.log("Printing firstName")
  //   // console.log(event.target.value);
  //   setFirstName(event.target.value)
  // }
  // function changeLastNameHandler(event){
  //   // console.log("Printing lastName")
  //   // console.log(event.target.value);
  //   setLasttName(event.target.value)
  // }



  const [formData, setFormData] = useState({firstName : "", lastName: "", email: "", comment:"", isVisible:true, mode:"", favCar:""});
  // console.log(formData);

  function changeHandler(event){
    
    const {name, value, checked, type} = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name] : type==='checkbox' ? checked : value
      }
    })
  }


  function submitHandler(evevnt){
    event.preventDefault();

    console.log("Finally printing the entire form data");
    console.log(formData);
  }



  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        {/* <input type="text" placeholder="First Name" onChange={changeFirstNameHandler}/> */}
        <input type="text" placeholder="First Name" onChange={changeHandler} name="firstName" value={formData.firstName}/>
        <br/><br/>
        {/* <input type="text" placeholder="Last Name" onChange={changeLastNameHandler}/> */}
        <input type="text" placeholder="Last Name" onChange={changeHandler} name="lastName" value={formData.lastName}/>
        <br/><br/>
        <input type="email" placeholder="Enter your emai herel" onChange={changeHandler} name="email" value={formData.email}/>
      
      <br/><br/>

      <textarea placeholder="Enter your comment here " onChange={changeHandler} name="comment" value={formData.comment}/>
      
      <br/><br/>

      <input type="checkbox" onChange={changeHandler} id="isVisible" name="isVisible" checked={formData.isVisible}/>
      <label htmlFor="isVisible">Am I visible ?</label>

      <br/><br/>

      <fieldset>
        <legend>Mode: </legend>
        <input type="radio" onChange={changeHandler} name="mode" id="Online-Mode" value="Online-Mode" checked={formData.mode === "Online-Mode"}/>
        <label htmlFor="Online-Mode">Online Mode </label>
        
        <input type="radio" onChange={changeHandler} name="mode" id="Ofline-Mode" value="Ofline-Mode" checked={formData.mode === "Ofline-Mode"}/>
        <label htmlFor="Online-Mode">Ofline Mode</label>  
      </fieldset>

      <br/><br/>


      <label htmlFor="favCar">Tell me your favourite car</label><br/>
      <select onChange={changeHandler} name="favCar" id="favCar" value={formData.favCar}>
        <option value="Scorpio">Scorpio</option>
        <option value="Fortuner">Fortuner</option>
        <option value="Defender">Defender</option>
        <option value="Thar">Thar</option>
        <option value="lambo">lambo</option>
      </select>

      <br/><br/>


      {/* <input type="submit" value="submit"/> */}
      <br/>
      <button>Submit</button>

      </form>
    </div>
  );
};

export default App;
