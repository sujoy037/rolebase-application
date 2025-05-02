const svgCaptcha = require('svg-captcha');

const captchaStore = new Map(); // Temporary in-memory store for CAPTCHA values

// Generate CAPTCHA
const generateCaptcha = () => {
  const captcha = svgCaptcha.create({ noise: 2, color: true });
  const captchaId = Math.random().toString(36).substring(2, 15); // Generate unique ID
  captchaStore.set(captchaId, captcha.text.toLowerCase()); // Save CAPTCHA value

  // Auto-remove CAPTCHA after 5 minutes
  setTimeout(() => captchaStore.delete(captchaId), 5 * 60 * 1000);

  return { captchaImage: captcha.data, captchaId };
};

// Verify CAPTCHA
const verifyCaptcha = (captchaId, captcha) => {
  const storedCaptcha = captchaStore.get(captchaId);
  captchaStore.delete(captchaId); // Delete after verification to prevent reuse
  return storedCaptcha && storedCaptcha === captcha.toLowerCase();
};

module.exports = { generateCaptcha, verifyCaptcha };
