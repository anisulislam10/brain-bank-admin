import axios from "axios";

export const verifyCaptcha = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    console.log("🔍 Received CAPTCHA Token:", token);
    console.log("🔑 Using Secret Key:", process.env.RECAPTCHA_SECRET_KEY);

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

   

    console.log("🔍 Google reCAPTCHA Response:", response.data);

    if (response.data.success) {
      return res.json({ success: true, message: "CAPTCHA verified!" });
    } else {
      return res.status(400).json({ error: "CAPTCHA verification failed", details: response.data });
    }
  } catch (error) {
    console.error("❌ CAPTCHA Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
