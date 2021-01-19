import { Schema, model } from 'mongoose';

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    firstName: { type: String, max_length: 64, required: true },
    lastName: { type: String, max_length: 64, required: true },
    avatar: { data: Buffer, Contenttype: String },
    dob: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        ret.fullName = doc.fullName;
        ret.dob = ret.dob?.toISOString() || '';
        ret.avatar = ret.avatar || '';
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

profileSchema
  .virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    this.firstName = v.substr(0, v.indexOf(' '));
    this.lastName = v.substr(v.indexOf(' ') + 1);
  });

export default model('Profile', profileSchema, 'profiles');
