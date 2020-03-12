require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async event => {
  const {
    info: {
      responseData: {
        id,
        email,
        billingAddress: { name }
      }
    }
  } = JSON.parse(event.body);

  const msg = {
    to: email,
    from: process.env.SENDGRID_OWNER_EMAIL,
    templateId: process.env.SENDGRID_ORDER_CREATED_ID,
    dynamic_template_data: {
      orderID: id,
      name
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
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};
