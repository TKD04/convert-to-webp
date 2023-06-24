import { deleteAsync } from "del";
import GulpClient from "gulp";
import gulpWebp from "gulp-webp";

const { dest, parallel, src, series, task, watch } = GulpClient;

const convertToWebpLossy = () =>
  src("./src/*.{jpg,jpeg}").pipe(gulpWebp()).pipe(dest("./dist"));
const convertToWebpLossless = () =>
  src("./src/*.png")
    .pipe(
      gulpWebp({
        lossless: true,
      })
    )
    .pipe(dest("./dist"));
const convertToWebp = parallel(convertToWebpLossy, convertToWebpLossless);
const clean = () => deleteAsync("./dist/**");

task("watch", () => watch(["./src/*"], convertToWebp));

export default series(clean, convertToWebp);
