import { Router } from 'express';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';
import { upgradeUserRole } from '../controller/admin.controller.js';

const adminRoute = Router();

// Only users passing 'auth' AND 'adminAuth' can access this route
adminRoute.put('/upgrade-role', auth, adminAuth, upgradeUserRole);

export default adminRoute;
