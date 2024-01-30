import { deleteAsync } from "del";
import GulpClient from "gulp";
import gulpWebp from "gulp-webp";

const { dest, parallel, src, series } = GulpClient;
const gulpWatch = GulpClient.watch;

// ref. https://github.com/imagemin/imagemin-webp?tab=readme-ov-file#api
const LOSSY_OPTION = {
  quality: 75,
};

const convertToWebpLossy = () =>
  src("./src/*.{jpg,jpeg}").pipe(gulpWebp(LOSSY_OPTION)).pipe(dest("./dist"));
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
export const watch = () => gulpWatch(["./src/*"], convertToWebp);
export const clean = () => deleteAsync("./dist/**");
export default series(clean, convertToWebp);
