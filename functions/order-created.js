import sendgrid from "@sendgrid/mail";

require("dotenv").config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  let body = JSON.parse(event.body);

  try {
    await sendgrid.send({
      to: body.email,
      from: process.env.SENDGRID_OWNER_EMAIL,
      templateId: process.env.SENDGRID_ORDER_CREATED_ID,
      dynamic_template_data: {
        orderID: body.id,
        name: body.name,
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ error: "" }),
  };
};
