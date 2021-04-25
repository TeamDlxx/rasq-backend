const { validateUser } = require("../../utils/validation/user");
const { code_verification } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const codeVerfication = async (req, res) => {
  try {
    const { error, auth, error_message, data } = await code_verification(
      req.user,
      req.params.code
    );

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    if (!auth) {
      return res.status(403).json({
        code: 403,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Customer email verification successfully",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = codeVerfication;
