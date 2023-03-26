import React from "react";
import { useEffect, useState } from "react";


function Form(){

    const [formData, setFormData] = useState({
        firstName:"",
        lastName: "",
        email: "",
        country: "India",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        comments: false,
        candidates: false,
        offers: false,
        pushNotification: ""
    })

    // console.log(formData);


    function changeHandler(event){
        const {type, name, value, checked} = event.target;

        setFormData((prevState)=>{
                return {
                    ...prevState, 
                    [name] : type==='checkbox' ? checked : value
                    // [event.target.name] : event.target.value                      
                }
            })
        }

        function submitHandler(event){
            event.preventDefault();
            console.log(formData)
        }
    
        


    return (
        <div className="w-full h-full border border-blue-100 px-[1rem] mb-[1rem]">
            <form onSubmit={submitHandler} 
            className="flex flex-col justify-center items-center m-3">

                    {/* firstName */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        FirstName : 
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder={"Enter the FirstName"}
                            className="outline-none border focus:border-gray-500 p-2" 
                            required
                        />
                    </label>

                    {/* lastName */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        LastName : 
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={changeHandler}
                            placeholder={"Enter the FirstName"}
                            className="outline-none border focus:border-gray-500 p-2" 
                            required
                        />
                    </label>

                    {/* Email Address */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        Email : 
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            placeholder={"Enter the email"}
                            className="outline-none border focus:border-gray-500 p-2" 
                            required
                        />
                    </label>

                    {/* Country */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        country
                        <select name="country" value={formData.country} onChange={changeHandler} className="p-2">
                            <option value='India'>India</option>
                            <option value='Japan'>Japan</option>
                            <option value='Norway'>Norway</option>
                            <option value='South Korea'>South Korea</option>
                            <option value='Poland'>Poland</option>
                        </select>
                    </label>

                    {/* Street Addrsss */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        Street Address : 
                        <input
                            type="text"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={changeHandler}
                            placeholder={"Enter the streetAddress"}
                            className="outline-none border focus:border-gray-500 p-2" 
                            required
                        />
                    </label>

                    {/* City */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        City : 
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={changeHandler}
                            placeholder={"Enter the city"}
                            className="outline-none border focus:border-gray-500 p-2" 
                            required
                        />
                    </label>

                    {/* State */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        State / province : 
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={changeHandler}
                            placeholder={"Enter the state"}
                            className="outline-none border focus:border-gray-500 p-2" 
                            required
                        />
                    </label>
                    
                    {/* Zip / Postal code */}
                    <label className="w-full flex flex-col gap-2 mt-5">
                        Zip / Postal code: 
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={changeHandler}
                            placeholder={"Enter the zip"}
                            className="outline-none border focus:border-gray-500 p-2" 
                            required
                        />
                    </label>


                    {/* By Email */}
                    <fieldset className="w-full flex flex-col gap-2 mt-5">
                        <legend>By Email</legend>
                        {/* comments */}
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    id="comments"
                                    name="comments"
                                    checked={formData.comments}
                                    onChange={changeHandler}
                                    className="mr-3"
                                />
                            Comments
                            </label>
                            <p>Get notified when someones posts a comment on a posting</p>
                        </div>

                        {/* candidate */}
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    id="candidates"
                                    name="candidates"
                                    checked={formData.candidates}
                                    onChange={changeHandler}
                                    className="mr-3"
                                />
                            Candidates
                            </label>
                            <p>Get notified when candidate applies for a job</p>
                        </div>

                        {/* offers */}
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    id="offers"
                                    name="offers"
                                    checked={formData.offers}
                                    onChange={changeHandler}
                                    className="mr-3"
                                />
                            Offers
                            </label>
                            <p>Get notified when candidate accepts or reject an offer</p>   
                        </div>
                    </fieldset>



                    {/* Push Notification */}
                    <fieldset className="w-full flex flex-col gap-2 mt-5">
                        <legend>Push Notification</legend>
                        <p>These are delivered via SMS to your mobile phone</p>

                        
                        <label className="w-full flex flex-row gap-2 mt-5">
                            <input 
                                type={"radio"}
                                name='pushNotification'
                                value={"Push Notification"}
                                onChange = {changeHandler}
                            />
                            Everything
                        </label>
                        <label className="w-full flex flex-row gap-2 mt-5">
                            <input 
                                type={"radio"}
                                name='pushNotification'
                                value={"Same As Email"}
                                onChange = {changeHandler}
                            />
                            Same as Email
                        </label>
                        <label className="w-full flex flex-row gap-2 mt-5">
                            <input 
                                type={"radio"}
                                name='pushNotification'
                                value="No Push Notification"
                                onChange = {changeHandler}
                            />
                            No Push notification
                        </label>
                        

                    </fieldset>




                    <button className="bg-blue-500 text-white py-2 px-3 rounded-md mt-[2rem]">Submit</button>
            </form>

        </div>
    )
}
export default Form;