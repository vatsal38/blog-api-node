import Service from '../Service';

class UserService extends Service {
  constructor(model) {
    super(model);
    this.loginUser = this.loginUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  async loginUser(username) {
    try {
      const item = await this.model.findOne({ username });
      if (!item) {
        return {
          error: true,
          statusCode: 400,
          message: 'Invalid Username or Password!',
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

  async getUserById(userId) {
    try {
      const user = await this.model.get(userId);
      if (!user) {
        return {
          error: true,
          statusCode: 404,
          message: 'User not found!',
        };
      }

      return {
        error: false,
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }
}

export default UserService;
