import { toast } from "react-hot-toast";
import { APIConnector } from "../APIConnector";
import rzpLogo from '../../assets/Logo/rzp_Logo.png'
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";




const { studentEndpoints } = require("../APIS");


const {
    COURSE_PAYMENT_API, 
    COURSE_VERIFY_API, 
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints;




// step 1  --> load script
function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}



// step 2 --> Buy a course
export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading...");
    try{    
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await APIConnector("POST", COURSE_PAYMENT_API, 
            {courses},
            {Authorization : `Bearer ${token}`}
        )

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        console.log("Order response : ", orderResponse);


        // options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.price,
            order_id: orderResponse.data.data.id,
            name: `StudyNotion`,
            description: `ThankYou for purchasing the course`,
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response){
                // send successfull wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)

                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }


        // open razorpay window on UI
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment failed", function(response){
            toast.error("Oops! payment failed");
            console.log(response.err);
        })

    }
    catch(err){
        console.log("PAYMENT_API ERROR...", err);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}






async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await APIConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, 
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
                token
            },
            {Authorization : `Bearer ${token}`}
        )

    }
    catch(err){
        console.log("PAYMENT_SUCCESS_EMAIL_API ERROR...",err);
    }
}




// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await APIConnector("POST", COURSE_VERIFY_API, 
            bodyData,
            {Authorization : `Bearer ${token}`}
        )

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Payment successful, You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart())

    }
    catch(err){
        console.log("PAYMENT_VERIFYING ERROR...", err);
        toast.error("Could not verify Paymnet")
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}









