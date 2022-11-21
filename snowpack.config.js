const { NODE_ENV } = process.env;
const buildOptions = {};
if (NODE_ENV === 'production') {
  buildOptions.baseUrl = 'https://shuizhongyueming.com/atlas-viewer/';
}
module.exports = {
  extends: '@snowpack/app-scripts-react',
  buildOptions,
  plugins: [],
};
