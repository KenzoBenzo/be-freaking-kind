require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async ({ event, context, callback }) => {
  let body = JSON.parse(event.body);
  console.log(body);

  const msg = {
    to: email,
    from: process.env.SENDGRID_OWNER_EMAIL,
    templateId: process.env.SENDGRID_ORDER_CREATED_ID,
    dynamic_template_data: {
      orderID: id,
      name: name
    }
  };

  try {
    await sgMail.send(msg).then(() => {
      console.log(
        `Contact form sent from: ${process.env.SENDGRID_OWNER_EMAIL}, to: ${body.email}, with name: ${body.name}`
      );
      callback();
    });

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
