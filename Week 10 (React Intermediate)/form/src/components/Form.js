import React from 'react';
import { useState } from 'react';
import './Form.css';


function Form(){



    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        comments: false,
        candidates: false,
        offers: false,
        pushNotification: ""

    });

    function changeHandler(event){
        const {name, value, type, checked} = event.target;
        setFormData((PrevState)=>{
            return {
                ...PrevState,
                [name] : type==='checkbox' ? checked : value
            }
        })

    }

    function submitHandler(evevnt){
        evevnt.preventDefault();
        console.log(formData);
    }



    return (
        <div className='form-container'>
            <form className="form" onSubmit={submitHandler} action="">
                <label htmlFor='firstName'>FirstName : </label>
                <input type='text' placeholder='Lokesh' onChange={changeHandler} name='firstName' value={formData.firstName} required/>

                <label htmlFor='lasttName'>LastName : </label>
                <input type='text' placeholder='singh' onChange={changeHandler} name='lastName' value={formData.lastName} required/>
                
                <label htmlFor='email'>Email : </label>
                <input type='email' placeholder='lokeshsingh0089@gmail.com' onChange={changeHandler} name='email' value={formData.email} required/>
                
                <label htmlFor='country'>Country : </label>
                <select onChange={changeHandler} name="country" id="country" value={formData.country} required>
                    <option value="None">None</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="Japan">Japan</option>
                    <option value="Australia">Australia</option>
                    <option value="Poland">Poland</option>
                </select>

                <label htmlFor='streetAddress'>streetAddress</label>
                <input type="text" placeholder='1234 Main str' onChange={changeHandler} name="streetAddress" value={formData.streetAddress} required/>


                <label htmlFor='city'>City</label>
                <input type="text" placeholder='faridabad' onChange={changeHandler} name="city" value={formData.city} required/>


                <label htmlFor='state'>State / Province</label>
                <input type="text" placeholder='haryana' onChange={changeHandler} name="state" value={formData.state} required/>

                <label htmlFor='zip'>Zip / Postal code</label>
                <input type="text" placeholder='12008' onChange={changeHandler} name="zip" value={formData.zip} required/>


                <div className='by-email-selection-container'>
                    <label>By Email </label>
                    <div className='checkbox-container'>
                        <div className='checkbox-btn'>
                            <input type='checkbox' onChange={changeHandler} name="comments" id="comments" checked={formData.comments} />
                            <label htmlFor='comments'>Comments</label><br/>
                        </div>
                        <p>Get notified when someones posts a comment on a posting</p>
                    </div>

                    <div className='checkbox-container'>
                        <div className='checkbox-btn'>
                            <input type='checkbox' onChange={changeHandler} name="candidates" id="candidates" checked={formData.candidates} />
                            <label htmlFor='candidates'>Candidates</label><br/>
                        </div>
                        <p>Get notified when candidate applies for a job</p>
                    </div>

                    <div className='checkbox-container'>
                        <div className='checkbox-btn'>
                            <input type='checkbox' onChange={changeHandler} name="offers" id="offers" checked={formData.offers} />
                            <label htmlFor='offers'>Offers</label><br/>
                        </div>
                        <p>Get notified when candidate accepts or reject an offer</p>
                    </div>
                </div>

                <div className='notification-container'>
                    <h2>Push Notification</h2>
                    <p>These are delivered via SMS to your mobile phone</p>

                    <div className='notification-radio-seclection-container'>
                        <div className='notification-btn'>
                            <input type="radio" onChange={changeHandler} name="pushNotification" id="everything" value="everything" checked={formData.pushNotification === "everything"} required/>
                            <label htmlFor='everything'>Everything</label><br/>
                        </div>
                        <div className='notification-btn'>
                            <input type="radio" onChange={changeHandler} name="pushNotification" id="sameAsEmail" value="sameAsEmail" checked={formData.pushNotification === "sameAsEmail"} />
                            <label htmlFor='sameAsEmail'>Push Notification</label><br/>
                        </div>
                        <div className='notification-btn'>
                            <input type="radio" onChange={changeHandler} name="pushNotification" id="noPushNotification" value="noPushNotification" checked={formData.pushNotification === "noPushNotification"}/>
                            <label htmlFor='noPushNotification'>No Push Notification</label><br/>    
                        </div>

                    </div>
                </div>


                <br/><br/>
                <button className='save-btn'>Save</button>

            </form>
        </div>
    )
}
export default Form;