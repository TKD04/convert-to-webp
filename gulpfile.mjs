import { deleteAsync } from "del";
import GulpClient from "gulp";
import gulpWebp from "gulp-webp";

const { dest, parallel, src, series } = GulpClient;

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

export const convert = () => convertToWebp;
export const watch = () => watch(["./src/*"], convertToWebp);
export const clean = () => deleteAsync("./dist/**");
export default series(clean, convertToWebp);
