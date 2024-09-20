import express from "express";
import { deleteBlog, saveBlog, updatedblog, viewBlog, viewBlogById } from "../controller/blog.controller.js";
import { tokenVerification } from "../middleware/tokenVerification.js";
import multer from "multer";
const router = express.Router()
const upload = multer({ dest: "public/Images/" })

router.post("/save-blog", upload.single("file"), tokenVerification, saveBlog);
router.get("/view-blog", tokenVerification, viewBlog)
router.get("/view-blog-by-id/:id", tokenVerification, viewBlogById);
router.delete("/delete-blog/:id", tokenVerification, deleteBlog)
router.put("/update-blog/:id", upload.single("file"), tokenVerification, updatedblog)

export default router;