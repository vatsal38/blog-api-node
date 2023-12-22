import Service from '../Service';

class BlogService extends Service {
  constructor(model) {
    super(model);
    this.getBlogsByUserIdAndBlogId = this.getBlogsByUserIdAndBlogId.bind(this);
    this.getAllBlogs = this.getAllBlogs.bind(this);
    this.getBlogsByUserId = this.getBlogsByUserId.bind(this);
    this.getBlogsByBlogId = this.getBlogsByBlogId.bind(this);
  }

  async getAllBlogs() {
    try {
      const items = await this.model
        .find()
        .populate('user', [
          '_id',
          'username',
          'firstName',
          'lastName',
          'phoneNumber',
        ]);
      const blogData = items.map((blog) => ({
        ...blog._doc,
        image: blog.image ? `data:image/jpeg;base64,${blog.image}` : null,
      }));
      return {
        error: false,
        statusCode: 200,
        data: blogData,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors,
      };
    }
  }

  async getBlogsByUserId(userId) {
    try {
      const items = await this.model
        .find({ user: userId })
        .populate('user', [
          '_id',
          'username',
          'firstName',
          'lastName',
          'phoneNumber',
        ]);
      const blogData = items.map((blog) => ({
        ...blog._doc,
        image: blog.image ? `data:image/jpeg;base64,${blog.image}` : null,
      }));
      return {
        error: false,
        statusCode: 200,
        data: blogData,
      };
    } catch (errors) {
      console.error(errors);
      return {
        error: true,
        statusCode: 500,
        message: errors.message || 'Internal Server Error',
      };
    }
  }

  async getBlogsByBlogId(blogId) {
    try {
      const item = await this.model
        .findOne({ _id: blogId })
        .populate('user', [
          '_id',
          'username',
          'firstName',
          'lastName',
          'phoneNumber',
        ]);

      const blogData = {
        ...item._doc,
        image: item.image ? `data:image/jpeg;base64,${item.image}` : null,
      };

      return {
        error: false,
        statusCode: 200,
        data: blogData,
      };
    } catch (errors) {
      console.error(errors);
      return {
        error: true,
        statusCode: 500,
        message: errors.message || 'Internal Server Error',
      };
    }
  }

  async getBlogsByUserIdAndBlogId(userId, blogId) {
    try {
      const item = await this.model.findOne({ _id: blogId, user: userId });
      console.log('item', item);
      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: 'Blog not found!',
        };
      }

      const blogData = {
        ...item._doc,
        image: item.image ? `data:image/jpeg;base64,${item.image}` : null,
      };

      return {
        error: false,
        statusCode: 200,
        data: blogData,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors,
      };
    }
  }
}

export default BlogService;
