import { Router } from "express";
import { login, register, logout, adminLogin} from "../controller/authController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = Router();

router.post('/register', register);
router.post('/login',authenticateUser,login);
// router.post('/login-staff', staffLogin);
router.post('/login-admin', authenticateUser,adminLogin);
router.get('/logout', authenticateUser, logout)


export default router;