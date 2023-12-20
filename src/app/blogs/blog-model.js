import mongoose, { Schema } from 'mongoose';

class Blogs {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        title: {
          type: String,
          required: [true, 'Title is required.'],
        },
        description: {
          type: String,
          required: [true, 'Description is required.'],
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users', // Reference the User model
          required: [true, 'User ID is required.'],
        },
      },
      {
        timestamps: true,
      },
    );

    mongoose.model('blogs', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('blogs');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('blogs');
  }
}

export default Blogs;
