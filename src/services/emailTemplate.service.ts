export function getResetPasswordTemplate({ firstName, lastName, otp }: { firstName: string; lastName: string; otp: string }) {
  return `
  <!DOCTYPE html>
<html>
<head>
  <title>Reset Password</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #000000;
      margin: 0;
      padding: 20px;
      color: #ffffff;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #0a0a0a;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
      overflow: hidden;
      border: 1px solid #333;
    }
    .email-header {
      background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
      color: white;
      text-align: center;
      padding: 30px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .email-body {
      padding: 40px 30px;
      line-height: 1.8;
      font-size: 16px;
    }
    .email-footer {
      background-color: #0f0f0f;
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #999;
      border-top: 1px solid #333;
    }
    .otp-code {
      display: inline-block;
      font-size: 32px;
      font-weight: bold;
      color: #000000;
      background: linear-gradient(135deg, #ffffff, #e0e0e0);
      padding: 15px 30px;
      border-radius: 8px;
      margin: 20px 0;
      letter-spacing: 2px;
      box-shadow: 0 2px 4px rgba(255, 255, 255, 0.2);
    }
    .button {
      display: inline-block;
      margin-top: 25px;
      padding: 12px 30px;
      font-size: 16px;
      font-weight: 600;
      color: #000000;
      background: linear-gradient(135deg, #ffffff, #e0e0e0);
      text-decoration: none;
      border-radius: 6px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(255, 255, 255, 0.3);
    }
    strong {
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="email-body">
      <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
      <p>Please use the following OTP to reset your password:</p>
      <div class="otp-code">${otp}</div>
      <p>This OTP will expire in 2 minutes. If you didn't request this password reset, please ignore this email.</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Shivam Ingale. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
}
