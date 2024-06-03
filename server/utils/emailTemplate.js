const welcomeEmailTemplate = (firstName) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
    <h1 style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; margin-top: 0;">Welcome to Our Service, ${firstName}</h1>
    <div style="padding: 30px; background-color: white; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 18px; margin-bottom: 20px;">Hi ${firstName},</p>
      <p style="font-size: 18px; margin-bottom: 20px;">Thank you for registering with us! We're excited to have you on board.</p>
      <p style="font-size: 18px; margin-bottom: 10px;">Best Regards,</p>
      <p style="font-size: 20px; font-weight: bold; color: #4CAF50;">BrainOp Tech</p>
    </div>
    
  </div>
`;

module.exports = { welcomeEmailTemplate };