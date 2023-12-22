import Controller from '../Controller';
import UserService from '../user/user-service';
import Blog from './blog-model';
import BlogService from './blog-service';

const blogService = new BlogService(new Blog().getInstance());

class BlogController extends Controller {
  constructor(service) {
    super(service);
    this.createBlog = this.createBlog.bind(this);
    this.getBlogsByUserIdAndBlogId = this.getBlogsByUserIdAndBlogId.bind(this);
    this.getAllBlogs = this.getAllBlogs.bind(this);
    this.getBlogsByUserId = this.getBlogsByUserId.bind(this);
    this.getBlogsByBlogId = this.getBlogsByBlogId.bind(this);
  }

  async createBlog(req, res) {
    try {
      console.log('req.body', req.body);
      const userId = req.user.id;

      const blogData = {
        title: req.body.title,
        description: req.body.description,
        user: userId,
      };

      if (req.file) {
        const imageBuffer = req.file.buffer;
        const base64Image = imageBuffer.toString('base64');
        // blogData.image = `data:image/jpeg;base64,${base64Image}`;
        blogData.image = base64Image;
      }

      const response = await this.service.insert(blogData);
      return res.status(response.statusCode).send(response);
    } catch (error) {
      return res.status(500).send({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }

  async getBlogsByUserId(req, res) {
    const { userId } = req.params;
    const response = await this.service.getBlogsByUserId(userId);
    return res.status(response.statusCode).send(response);
  }

  async getBlogsByBlogId(req, res) {
    const { blogId } = req.params;
    const response = await this.service.getBlogsByBlogId(blogId);
    return res.status(response.statusCode).send(response);
  }

  async getAllBlogs(req, res) {
    const response = await this.service.getAllBlogs();
    console.log('response', response);
    return res.status(response.statusCode).send(response);
  }

  async getBlogsByUserIdAndBlogId(req, res) {
    const { userId, blogId } = req.params;
    const response = await this.service.getBlogsByUserIdAndBlogId(
      userId,
      blogId,
    );
    return res.status(response.statusCode).send(response);
  }
}

export default new BlogController(blogService);
