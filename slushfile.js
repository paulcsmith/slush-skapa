const yarn        = require('gulp-yarn')
const gulp        = require('gulp')
const runSequence = require('run-sequence')
const inquirer    = require('inquirer')
const pkg         = require('./package.json')
const shell       = require('shelljs')
const template 		= require('gulp-template')


gulp.task('copy', function() {
	return gulp.src(__dirname + '/templates/**', {dot: true})
		.pipe(gulp.dest('./'))
})

gulp.task('setup-name', function(done) {

	inquirer.prompt([
		{
			name: 'project',
			message: 'What is the name of your project?',
			default: 'project'
		}
	]).then(function(answers) {
		// add correct year to LICENSE
		// shell.sed('-i', /CURRENTYEAR/g, new Date().getFullYear(), 'LICENSE')
		// add graphic name to README
		shell.sed('-i', '||PROJECT||', answers.project, 'README.md')
		// add graphic name to site title
		shell.sed('-i', '||PROJECT||', answers.project, 'src/data/meta.json')

		done()
	})
})

gulp.task('setup-options', function(done) {

	inquirer.prompt([
		{
			type: 'confirm',
			name: 'bootstrap',
			message: 'Add bootstrap to this project?',
		}
	]).then(function(answers) {

		return gulp.src(__dirname + '/templates/**')
			.pipe(template(answers, { interpolate: /${{{([\s\S]+?)}}}$/g }))
			.pipe(gulp.dest('./'))
			.on('end', done)
	}).catch(err => { console.log(err); })

})

gulp.task('install', function() {
	return gulp.src('./package.json')
		.pipe(yarn())
})

gulp.task('default', function(done) {

	runSequence(
		'copy',
		'setup-name',
		'setup-options',
		'install',
		done
	)
})
