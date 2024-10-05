import mongoose from 'mongoose';

const DichVu_modelSchema = mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('DichVu_model', DichVu_modelSchema);
