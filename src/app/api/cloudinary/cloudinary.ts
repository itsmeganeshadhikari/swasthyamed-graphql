const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "ddyo7gkzj",
    api_key: "168544197498899",
    api_secret: "hFvY4b6rvdHEEPGuSqqEVAGFES4",
    secure: true,
});

export default cloudinary;