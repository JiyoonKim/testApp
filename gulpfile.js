const gulp = require('gulp');
const _ = require('lodash');
const gutil = require('gulp-util');
const file = require('gulp-file');
const change = require('gulp-change');
const exec = require('child_process').exec;
const spawn = require('cross-spawn');
const ip = require('ip');


var env = gutil.env.env || 'local';
var gitID;
var run = {
	default: {
		host: 'http://' + (gutil.env.server ? gutil.env.server : ip.address()) + ':3100'
	},
	development: {
		host: 'http://' + ip.address() + ':3100'
	},
	office: {
		// host: 'https://office.o2palm.com'
		host: 'http://192.168.1.200:3100'
	},
	staging: {
		host: 'https://api.snowpalm.com'
	},
	production: {
		host: 'https://api.snowpalm.com'
	}
}
var runOpts = _.merge({}, run.default, run[env]);


gulp.task('git', function(cb) {
	exec('git rev-parse HEAD', function(err, stdout, stderr) {
		gitID = stdout.trim();
		cb(err);
	})
})

function performChange(content) {
	return content.replace(/$$host$$/g, 'FOO');
}
gulp.task('set', ['git'], () => {
	codeString = "export let data = { host: \"" +
				runOpts.host + '\", gid: \"' +
				gitID +
				"\" }";
	return file('build.js', codeString, { src: true })
			.pipe(gulp.dest('./'));
})


gulp.task('watch', ['set'], () => {
	spawn('ionic', ['serve'], { stdio: 'inherit' });
})
gulp.task('serve', ['set'], () => {
	spawn('ionic', ['serve'], { stdio: 'inherit' });
})

gulp.task('build', ['set'], function(cb) {
	spawn('ionic', ['cordova', 'build', 'ios'], { stdio: 'inherit' });
})

gulp.task('default', () => {
	console.log("usage:");
	console.log("\t// for set only environment (for use ionic command)");
	console.log("\tgulp set [--server=<ip address> | --env=[development|office|staging|production]]")
	console.log("\t자신의 computer의 서버에 연결할때: gulp set");
	console.log("\t다른 사람 computer의 서버에 연결할때: gulp set --server=<ip address>");
	console.log("\t미리 설정된 환경에 맞는 서버에 연결할때: gulp set --env=[development|office|staging|production]\n");
	console.log("\t// for ionic serve");
	console.log("\tgulp serve [--env=[development|office|staging|production]]");
	console.log("\tgulp watch [--env=[development|office|staging|production]]\n");
	console.log("\t// for ionic build");
	console.log("\tgulp build [--env=[development|office|staging|production]]");
	console.log("\n\tdefault env=local, server=" + ip.address() + "\n");
})