var nodemailer = require('nodemailer');

const sendMail = async (userName, bookName, returnDate, email) => {
  var transporter = nodemailer.createTransport({
    host: 'mail.tempmail.us.com',
    auth: {
      user: 'mdutdm5ek4hrbd7@tempmail.us.com',
      pass: 'lxxyiywoq0or0kp1f23qqlemcrzbzo'
    }
  });


  var mailOptions = {
    from: 'branson59@ethereal.email',
    to: email,
    subject: 'Order summary',
    text: `Dear ${userName},
         Your order on Book : ${bookName} and Return Date : ${returnDate}`
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail;