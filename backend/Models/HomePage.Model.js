import mongoose from "mongoose";

const homePageSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  homeText: {
    type: String,
    required: true,
  },
  subText: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  creatAt: {
    type: Date,
    default: Date.now(),
  },
});

const Home = mongoose.model("Home", homePageSchema);

export default Home;
