import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this contact.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
  },
  subject: {
    type: String,
    maxlength: [150, 'Subject cannot be more than 150 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
  status: {
      type: String,
      default: 'new',
      enum: ['new', 'read', 'replied']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
