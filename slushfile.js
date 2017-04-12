const yarn        = require('gulp-yarn')
const gulp        = require('gulp')
const runSequence = require('run-sequence')
const inquirer    = require('inquirer')
const pkg         = require('./package.json')
const shell       = require('shelljs')


gulp.task('copy', function() {
	return gulp.src(__dirname + '/templates/**', {dot: true})
		.pipe(gulp.dest('./'))
})

gulp.task('install', function() {
	return gulp.src('./package.json')
		.pipe(yarn())
})

gulp.task('setup', function(done) {

	inquirer.prompt([
		{
			name: 'project',
			message: 'What is the name of your project?',
			default: 'project'
		}
	]).then(function(answers) {

		// add correct year to LICENSE
		shell.sed('-i', /CURRENTYEAR/g, new Date().getFullYear(), 'LICENSE')

		// add graphic name to README
		shell.sed('-i', /PROJECT/g, answers.project, 'README.md')

		// add graphic name to site title
		shell.sed('-i', /PROJECT/g, answers.project, 'src/data/meta.json')

		done()

	})

})

gulp.task('default', function(done) {

	runSequence(
		'copy',
		'install',
		'setup',
		done
	)
})
