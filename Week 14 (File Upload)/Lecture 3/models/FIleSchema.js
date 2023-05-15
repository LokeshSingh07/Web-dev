const mongoose = require("mongoose");
const nodemailer = require("nodemailer");



const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});




// post middleware
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC ->", doc);

        // transporter
        // TODO : shift this configuration under config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // send email
        let info = await transporter.sendMail({
            from: `NextGen`,
            to: doc.email,
            subject: `New file uploaded on cloudinary`,
            html: `<h2>Hello jee</h2><p>File uploaded View here: <a href="${doc.imageUrl}">Click here</a></p>`,
        });

        console.log("INFO", info);

    }
    catch(err){
        console.error(err);
    }
})




const File = mongoose.model("File", fileSchema);
module.exports = File;
