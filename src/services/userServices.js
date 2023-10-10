import bcrypt from "bcrypt";
import { User } from "../database/models";
import { Op } from "sequelize";

const saltRounds = Number(process.env.SALTROUNDS);
class UserSvc {
  static async addStudent(data) {
    data.password = await bcrypt.hash(data.password, saltRounds);
    const { firstName, lastName, email, password } = data;
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'alustudent.com') {
      return { message400: 'Invalid ALU student email address'}
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return { data: user };
  }
  static async addFaculty(data) {
    data.password = await bcrypt.hash(data.password, saltRounds);
    const { firstName, lastName, email, password } = data;
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'alueducation.com') {
      return { message400: 'Invalid ALU faculty email address'}
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'facilitator',
      isVerified: false
    });
    return { data: user };
  }
  static async getUserById(userId) {
    const user = await User.findOne({
      where: { userId: userId },
    });
    return user;
  }
  static async changeUserStatus(userId) {
    const user = await User.findOne({ where: { userId: userId } });
    user.isVerified = !user.isVerified;
    await user.save();
    return user;
  }
  static async updateUser(fields, userId) {
    const user = await User.findOne({ where: { userId: userId } });
    await user.update(fields);
    return { value: user };
  }

  static async getAllStudents() {
    const allUsers = await User.findAll({
      where: {
        role: {
          [Op.eq]: "student",
        },
      },
    });

    return allUsers;
  }

  static async getAllFacilitators() {
    const allUsers = await User.findAll({
      where: {
        role: {
          [Op.eq]: "facilitator",
        },
      },
    });

    return allUsers;
  }
}
export default UserSvc;
