import multer from 'multer';
import auth from '../middleware/auth.middleware';
import BlogController from './blog-controller';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default (router) => {
  router.post(
    '/api/blog/create',
    auth,
    upload.single('image'),
    BlogController.createBlog,
  );
  router.get(
    '/api/:userId/blog/:blogId',
    auth,
    BlogController.getBlogsByUserIdAndBlogId,
  );
  router.get('/api/blogs', auth, BlogController.getAllBlogs);
  router.get('/api/:userId/blogs', auth, BlogController.getBlogsByUserId);
  router.get('/api/blogs/:blogId', auth, BlogController.getBlogsByBlogId);
};
