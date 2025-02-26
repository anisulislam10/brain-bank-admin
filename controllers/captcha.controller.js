import axios from 'axios'

exports.verifyCaptcha = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (response.data.success) {
      res.json({ success: true, message: "CAPTCHA verified!" });
    } else {
      res.status(400).json({ error: "CAPTCHA verification failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
