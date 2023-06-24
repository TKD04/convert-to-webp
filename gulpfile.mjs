import GulpClient from "gulp";
import gulpWebp from "gulp-webp";

const { dest, parallel, src, task, watch } = GulpClient;

const convertToWebpLossy = () =>
  src("./src/*.jpg").pipe(gulpWebp()).pipe(dest("./dist"));
const convertToWebpLossless = () =>
  src("./src/*.png")
    .pipe(
      gulpWebp({
        lossless: true,
      })
    )
    .pipe(dest("./dist"));
const convertToWebp = parallel(convertToWebpLossy, convertToWebpLossless);

task("watch", () => watch(["./src/*"], convertToWebp));

export default convertToWebp;
