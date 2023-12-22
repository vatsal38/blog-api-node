import mongoose from 'mongoose';
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
        .find({})
        .populate('user', ['firstName', 'lastName']);
      // console.log('items', items[0]._doc);
      // eslint-disable-next-line array-callback-return
      // const blogData = items.map(blog => {
      //   // eslint-disable-next-line no-param-reassign
      //   blog.image = blog.image ? `data:image/jpeg;base64,${blog.image}` : null;
      // });
      return {
        error: false,
        statusCode: 200,
        data: items,
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
        .populate('user', ['_id', 'username', 'firstName', 'lastName']);

      return {
        error: false,
        statusCode: 200,
        data: items,
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
        .populate('user', ['_id', 'username', 'firstName', 'lastName']);

      return {
        error: false,
        statusCode: 200,
        data: item,
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
      const item = await this.model
        .findOne({ _id: blogId, user: userId })
        .populate('user', ['_id', 'username', 'firstName', 'lastName']);

      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: 'Blog not found!',
        };
      }
      return {
        error: false,
        statusCode: 200,
        data: item,
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
