const successController = require("../../controllers/Payment/successControler");

const successHandler = async (req, res) => {
  try {
    const userId = req.query.userId;
    const updateProduct = JSON.parse(req.query.updateProduct);

    const data = await successController(userId, updateProduct);
    const id = data.length > 0 ? data[0].id : null;

    
    const baseRedirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://drewilifront.vercel.app/"
        : "http://localhost:5173/dd"; 

    const redirectUrl = `${baseRedirectUrl}payment/success?id=${id}`;

    res.redirect(redirectUrl);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
};

module.exports = successHandler;
