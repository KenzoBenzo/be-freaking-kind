require("dotenv").config();

const sgMail = require("@sendgrid/mail");

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

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const msg = {
      to: email,
      from: SENDGRID_OWNER_EMAIL,
      templateId: process.env.SENDGRID_ORDER_CREATED_ID,
      dynamic_template_data: {
        orderID: id,
        name: name
      }
    };
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
