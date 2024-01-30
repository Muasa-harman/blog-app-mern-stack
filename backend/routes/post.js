import  express  from "express";
import {verifyToken} from '../utils/verifyUser.js'
import { createPost, deletepost, getposts } from "../controllers/postController.js";

const router = express.Router();

router.post("/create", verifyToken,createPost)
router.get("/getposts", getposts)
router.delete("/deletepost/:postId/:useId",verifyToken,deletepost)

export default router;