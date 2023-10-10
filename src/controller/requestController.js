import RequestSvc from "../services/requestServices";

class Requests {
  static async createRequest(req, res) {
    try {
      const { data, message404 } = await RequestSvc.addRequest(req);
      if (message404) {
        return res.status(404).json({ status: "fail", message: message404 });
      }
      if (data) {
        return res.status(201).json({ status: "success", data });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
  static async getAllRequests(req, res) {
    try {
      const allReq = await RequestSvc.getAllRequestsAdmin();
      return res.status(200).json({ status: "success", data: allReq });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
  static async getAllRequestUser(req, res) {
    try {
      const { userId } = req.user;
      const allReq = await RequestSvc.getAllRequestsById(userId);
      return res.status(200).json({ status: "success", data: allReq });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
  static async addResponse(req, res) {
    try {
      const { message400, message404, response } =
        await RequestSvc.createResponse(req);
      if (message400) {
        return res.status(400).json({ status: "fail", message: message400 });
      }
      if (message404) {
        return res.status(404).json({ status: "fail", message: message404 });
      }
      if (response) {
        return res.status(200).json({ status: "success", data: response });
      }
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
  static async getAllFeedbackRequests(req, res) {
    try {
      const { message400, message404, response } =
        await RequestSvc.getAllFeedackOfReq(req);
      if (message400) {
        return res.status(400).json({ status: "fail", message: message400 });
      }
      if (message404) {
        return res.status(404).json({ status: "fail", message: message404 });
      }
      if (response) {
        return res.status(200).json({ status: "success", data: response });
      }
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
}
export default Requests;
