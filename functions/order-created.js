require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async event => {
  console.log(event);
  let body = JSON.parse(event.body);
  console.log(body);

  const msg = {
    to: body.email,
    from: process.env.SENDGRID_OWNER_EMAIL,
    templateId: process.env.SENDGRID_ORDER_CREATED_ID,
    dynamic_template_data: {
      orderID: body.id,
      name: body.name
    }
  };

  try {
    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: "Message sent"
    };
  } catch (error) {
    return {
      statusCode: error.code,
      body: JSON.stringify(error)
    };
  }
};
