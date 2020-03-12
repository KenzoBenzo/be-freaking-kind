const { SENDGRID_API_KEY, SENDGRID_OWNER_EMAIL } = process.env;
const sgMail = require("@sendgrid/mail");

exports.handler = async event => {
  const {
    info: { responseData }
  } = JSON.parse(event.body);

  sgMail.setApiKey(SENDGRID_API_KEY);

  try {
    const { email, id } = responseData;
    const msg = {
      to: email,
      from: SENDGRID_OWNER_EMAIL,
      templateId: SENDGRID_ORDER_CREATED_ID,
      dynamic_template_data: {
        orderID: id
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
