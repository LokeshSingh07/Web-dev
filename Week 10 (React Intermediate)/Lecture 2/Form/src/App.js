import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from './components/Form'





function App() {
  return (
    <div className="w-[800px] h-full flex flex-col justify-center mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-[2rem]">Form Details</h1>

      <Form/>






    </div>
  );
}

export default App;
