# gulp-img-comment
Insert image file name in a html comment. Util for a workflow that process images and changes the name of the file, the comment has the original file name for reference.

## USAGE

##### Gulpfile.js

```js
var gulp = require('gulp');
var imgComment = require('gulp-img-comment');

gulp.task('default', function () {
	gulp.src('src/index.html')

        .pipe(imgComment())
        .pipe(gulp.dest('dist'));

});
```

##### src/index.html
```html
<tr>
    <td>
        <img src="images/test.jpg" />
    </td>
</tr>
```

##### dist/index.html
```html
<tr>
    <td>
        <img src="images/test.jpg" /> <!-- IMG SRC: test.jpg -->
    </td>
</tr>
```