import { Request, User, Feedback } from "../database/models";
import { Op } from "sequelize";

class RequestSvc {
  static async addRequest(data) {
    const studentId = data.user.userId
    const { title, detail, requestCategory, assigneeId } = data.body;
    const facultyExist = await User.findOne({
      where: {
        userId: assigneeId,
        [Op.or]: [{ role: "admin" }, { role: "facilitator" }]
      }
    })
    if (!facultyExist) {
      return { message404: 'Assignee not found' }
    }
    if (!facultyExist.isVerified) {
      return { message404: 'Sorry, this facilitator is not verified' }
    }
    let request
    const admin = await User.findOne({ where: { role: "admin" }})
    if (requestCategory === "administrative" ){
      request = await Request.create({
        title,
        detail,
        requestCategory,
        studentId,
        assigneeId: admin.userId,
      });
    } else {
      request = await Request.create({
      title,
      detail,
      requestCategory,
      studentId,
      assigneeId,
    });
    }   
    return { data: request };
  }
  static async getAllRequestsAdmin() {
    const allReq = await Request.findAll({
      include: [
        { model: User, as: 'student', attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'isVerified', 'createdAt', 'updatedAt'] },
        { model: User, as: 'assignee', attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'isVerified', 'createdAt', 'updatedAt'] }
      ]
    });
    return allReq;
  }
  static async getAllRequestsById(id) {
    const allReq = await Request.findAll({
      where: {
        [Op.or]: [{ studentId: id }, { assigneeId: id }]
      },
      include: [
        { model: User, as: 'student', attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'isVerified', 'createdAt', 'updatedAt'] },
        { model: User, as: 'assignee', attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'isVerified', 'createdAt', 'updatedAt'] }
      ]
    });
    return allReq;
  }
  static async createResponse(data) {
    const { userId } = data.user
    const { detail } = data.body
    const { requestId } = data.params

    const oneReq = await Request.findOne({ where: { requestId }});
    if (!oneReq) {
      return { message404: 'Request not found' }
    }

    const admin = await User.findOne({ where: { userId }})
    if (oneReq.assigneeId !== userId && oneReq.studentId !== userId && admin.role !== 'admin' ) {
      return { message400: 'Sorry, the request is not assigned to you' }
    } 

    const response = await Feedback.create({
      detail,
      respondentId: userId,
      requestId
    })
    return { response };
  }
  static async getAllFeedackOfReq(req) {
    const { userId } = req.user
    const { requestId } = req.params
    const oneReq = await Request.findOne({ where: { requestId }});
    if (!oneReq) {
      return { message404: 'Request not found' }
    }
    const admin = await User.findOne({ where: { userId }})
    if (oneReq.assigneeId !== userId && oneReq.studentId !== userId && admin.role !== 'admin' ) {
      return { message400: 'Sorry, the request is not assigned to you' }
    } 
    const allFed = await Feedback.findAll({
      where: { requestId },
      include: { model: User, as: "respondants" },
    });
    return { response: allFed };
  }
}
export default RequestSvc;
