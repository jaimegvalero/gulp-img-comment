var gutil = require('gulp-util');
var through = require('through2');
var cheerio = require('cheerio');

module.exports = function(opts) {

	// create a stream through which each file will pass
	return through.obj(function(file, enc, callback) {

		if (file.isNull()) {
			this.push(file);
			// do nothing if no contents
			return callback();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-img-comment', 'Streaming not supported'));
			return callback();
		}

		if (file.isBuffer()) {
			var $ = cheerio.load(String(file.contents));
			$('img').each(function() {
				if ($(this).attr('src')) {
					var image = $(this).attr('src');
					if(image) {
						image = image.split('/');     
                        $(this).html( $(this).html() + " <!-- IMG SRC: " + image[image.length-1] + ' --> ' );
					}
												
				}
			});
			var output = $.html();

			file.contents = new Buffer(output);

			return callback(null, file);
		}
	});
};