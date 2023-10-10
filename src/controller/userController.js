import bcrypt from "bcrypt";
import UserSvc from "../services/userServices";
import { Jwt } from "../helpers/jwt";
import { User } from "../database/models";

const saltRounds = Number(process.env.SALTROUNDS) || 10;
class Users {
  static async registerStudent(req, res) {
    try {
      const { data, message400 } = await UserSvc.addStudent(req.body);
      if(message400) {
        return res.status(400).json({ status: "fail", message: message400 })
      } if (data) {
        return res.status(201).json({
        status: "success",
        data,
      });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async registerFaculty(req, res) {
    try {
      const { data, message400 } = await UserSvc.addFaculty(req.body);
      if(message400) {
        return res.status(400).json({ status: "fail", message: message400 })
      } if (data) {
        return res.status(201).json({
        status: "success",
        data,
      });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json({ status: "fail", message: "Account does not exist" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: "fail", message: "Incorrect Credentials" });
      }
      if (user.isVerified === false) {
        return res
          .status(400)
          .json({ status: "fail", message: "Your account is not verified  please contact administrator to verify it" });
      }
      
      const token = Jwt.generateToken({
        userId: user.userId,
        role: user.role,
        isVerified: user.isVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });

      const decodedToken = Jwt.verifyToken(token);
      const { exp } = decodedToken.value;
      const expInMilliseconds = exp * 1000;
      const expirationDate = new Date(expInMilliseconds);
      const formattedExpiration = expirationDate.toLocaleString();
      return res.status(200).json({
        status: "success",
        data: {
          email,
          token,
          expiration: formattedExpiration,
          message: "Login Successful",
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { user } = req;
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: "fail", message: "Incorrect old password" });
      }
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = newHashedPassword;
      await user.save();

      return res
        .status(200)
        .json({ status: "success", message: "Password updated successfully" });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err: err.message,
      });
    }
  }

  static async verifyFacultyAccount(req, res) {
    try {
      const { id } = req.params;
      const user = await UserSvc.getUserById(id);
      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }
      const users = await UserSvc.changeUserStatus(id);
      const statusMessage = users.isVerified ? "activated" : "deactivated";
      return res.status(200).json({
        status: "success",
        message: `User ${statusMessage} successfully`,
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const { userId } = req.user;
      const user = await UserSvc.getUserById(userId);
      return res.status(200).json({ status: "success", data: user });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
  
  static async updateProfile(req, res) {
    try {
      const { userId } = req.user;
      const { error, value } = await UserSvc.updateUser(req.body, userId);

      if (error) {
        return res.status(400).json({ status: "fail", error });
      }

      return res.status(200).json({
        status: "success",
        data: value,
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
  
  static async getAllFaculty(req, res) {
    try {
      const allFac = await UserSvc.getAllFacilitators()
      return res.status(200).json({ status: "success", data: allFac });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }

  static async getAllStudents(req, res) {
    try {
      const allStu = await UserSvc.getAllStudents()
      return res.status(200).json({ status: "success", data: allStu });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
}
export default Users;
