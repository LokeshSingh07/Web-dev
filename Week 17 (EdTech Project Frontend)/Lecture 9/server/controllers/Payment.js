const {instance} = require("../config/Razorpay");
const Course = require("../models/CourseModel");
const User = require("../models/UserModel");
const mailSender = require("../utils/MailSender");
const { default: mongoose } = require("mongoose");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");




// capture Payment --> used for inititate the order
exports.capturePayment = async(req, res)=>{

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide course Id",
        })
    }


    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(400).json({success:false, message:"Could not find the course"});
            }

            // user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({success: false, message: "Student is already enrolled",});
            }

            totalAmount += course.price;
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
    }


    // create options
    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }


    // create Order
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log("Payment response : ", paymentResponse);

        return res.status(200).json({
            success: true,
            data: paymentResponse,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order",
        });
    }


}





// verify the payment/signature
exports.verifyPayment = async(req, res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    // validation
    if(!razorpay_order_id  ||
        !razorpay_payment_id||
        !razorpay_signature ||
        !courses || !userId
    ) {
        return res.status(400).json({success: false, message:"Payment failed"});
    }


    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
    
    
    // check
    if(expectedSignature === razorpay_signature){
        // enroll the student
        await enrollStudent(courses, userId, res);

        // return response
        return res.status(200).json({success: true, message: "Payment verified"})
    }


    return res.status(500).json({
        success: false,
        message: 'Payment failed',
    })



}



const enrollStudent = async(courses, userId, res)=>{
    if(!courses || !userId){
        return res.status(400).json({success:false , message: "Please provide data for courses or userId"});
    }

    // enroll the student in multiple courses
    for(const courseId of courses){
        try{
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push : {studentsEnrolled: userId}},
                {new: true}
            )

            if(!enrolledCourse){
                return res.status(400).json({success:false, message:"Course Not Found"});
            }


            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userID: userId,
                completedVideos: []
            });



            // find the student and add the course to their list of enrolledCourse
            const enrolledStudent = await User.findOneAndUpdate(
                {_id: userId},
                {$push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }},
                {new: true}
            )


            // send mail to the student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lasttName}`)
            )
            // console.log("Email sent successfully", emailResponse.response);




        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
            
    }


}




exports.sendPaymentSuccessEmail = async(req, res)=>{
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;


    if(!orderId || !paymentId ||!amount || !userId){
        return res.status(400).json({
            success: false,
            message: "Please provide alll the fields",
        });
    }

    try{
        // find the student and send the mail
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
        )
    }
    catch(err){
        console.log("Error in sending mail", err);
        return res.status(500).json({
            error: false, 
            message: "Could not send email"
        })
    }


}











// // capture the payment aand initate the Razorpay order
// exports.capturePayment = async(req,res)=>{

//     // get courseId and userId
//     const {CourseId} = req.body;
//     const userId = req.user.id;

//     // validation
//     // valid courseId
//     if(!CourseId){
//         return res.json({
//             success: false,
//             message: "Please provide valid course ID",
//         });
//     }
    
//     // valid coursedetails
//     let course;
//     try{
//         course = await Course.findById(CourseId);
//         if(!course){
//             return res.json({
//                 success: false,
//                 message: "Could not find the course",
//             });
//         }

//         // user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success: false,
//                 message: "Student is already enrolled",
//             });
//         }


//     }
//     catch(err){
//         console.error(err);
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         })
//     }
    
//     // create order
//     const amount = course.price;
//     const currency = "INR";
    
//     const options = {
//         amount : amount*100,
//         currency,
//         receipt : Math.random(Date.now()).toString(),
//         notes: {
//             CourseId: courseId,
//             userId,
//         }
//     }

//     try{
//         // initiate the payment using RAZORPAY
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         // return response
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription : course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.orderId,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,

//         });

//     }
//     catch(err){
//         console.error(err);
//         return res.json({
//             success: false,
//             message: "Could not initiate order",
//         });
//     }


// }





// // verify signature of razorpay and server
// exports.verifySignature = async(req,res)=>{
//     const weebhookSecret = "12345678";

//     const signature = req.headers("x-razorpay-signature");

//     const shaSum = crypto.createHmac("sha256", weebhookSecret);
//     shaSum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is Authorised");

//         const {CourseId, userId} = req.body.payload.payment.entity.notes;

//         // fulfill the action
//         try{
//             // find the course and enroll the student in it
//             const enrolledCourse = Course.findOneAndUpdate(
//                 {_id: CourseId},
//                 {
//                     $push: {
//                         enrolledCourse: userId
//                     }
//                 },
//                 {new: true}
//             );
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course Not Found",
//                 });
//             }
//             console.log(enrolledCourse);

            
//             // Find the student and add course in their enrolled course
//             const enrolledStudent = await User.findByIdAndUpdate(
//                 {_id: userId},
//                 {
//                     $push: {
//                         courses: CourseId
//                     }
//                 },
//                 {new: true}
//             )
//             console.log(enrolledStudent);


//             // mail send krdo confimation wala
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from StudyNotion",
//                 "Congratulations, you are onboarding into new StudyNotion course"
//             );
//             console.log(emailResponse);
                
//             // return response
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and course added",
//             });

//         }
//         catch(err){
//             console.error(err);
//             return res.status(500).json({
//                 success: false,
//                 message: err.message,
//             });
//         }
//     }
//     else{
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request"
//         })
//     }

// }