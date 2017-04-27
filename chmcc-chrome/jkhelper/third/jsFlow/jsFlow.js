// jsFlow.js
// copyright hbyuan
// https://github.com/hbyuan/jsFlow
// email:hongbo_yuan@foxmail.com
(function () {
	'use strict';
	var warp = function (func, that) { //包装函数 用于包装原始函数
		//封装原始函数参数以及作用域
		var args = [].slice.call(arguments, 2);
		return function (callback) {
			args.push(callback);
			func.apply(that, args);
		};
	},
		callbackBuilder = function (that, currTaskIdx) { //创建特殊的回调函数
			var newCallback = function (err, reault) {
				var i, j, isFinish = true;
				if (err) { //一旦出错就结束执行 并调用错误回调
					that.isError = true;
					that.fail && that.fail(err);
					return;
				}
				that.resultPool[currTaskIdx] = reault;
				for (i = 0, j = that.resultPool.length; i < j; i++) {
					if (that.resultPool[i] === null) { //判断是否已经全部结束
						isFinish = false;
						break;
					}
				}
				isFinish && that.success && that.success(that.resultPool);
				if (!that.isParallel) { //顺序执行时触发下一步
					next.call(that, undefined, reault);
				}
			};
			newCallback.getPreviousTaskResult = function () { //绑定获取计算结果函数
				return that.getPreviousTaskResult()
			}
			newCallback.getAllResult = function () { //绑定获取计算结果函数
				return that.getAllResult()
			}
			return newCallback;
		},
		next = function (err, result) { //执行下一任务
			if (this.isError) { //出错则结束
				return false;
			}
			if (!this.currTaskIdx && this.currTaskIdx !== 0) {
				this.currTaskIdx = 0;
			} else {
				this.currTaskIdx = this.currTaskIdx + 1;
			}
			var nextCall = this.funcPool[this.currTaskIdx];
			if (nextCall) { //存在下一个函数则继续执行
				nextCall(callbackBuilder(this, this.currTaskIdx));
				return this.isParallel && true; //并行回调由上一任务触发执行下一任务
			} else {
				return false;
			}
		};
	//流程控制函数
	var jsFlow = function (conf) {
		if (!this instanceof jsFlow) {
			return new jsFlow(conf);
		}
		this.setting = conf || {};
		//是否并行执行
		this.isParallel = this.setting.isParallel || false;
		this.funcPool = [];
		this.resultPool = [];
	};
	jsFlow.prototype = {
		add: function (func, that) { //添加执行任务
			this.funcPool.push(warp.apply(this, arguments));
			this.resultPool.push(null);
		},
		fire: function (success, fail) { //运行任务
			success && (this.success = success);
			fail && (this.fail = fail);
			if (this.funcPool.length === 0) {
				this.success && this.success(this.resultPool);
				return;
			}
			while (next.call(this)) {}
		},
		getPreviousTaskResult: function () { //顺序执行时获取上一任务结果
			if (this.isParallel) {
				return undefined; //throw '并行任务无法获取前一任务结果.';
			}
			return this.resultPool[this.currTaskIdx - 1];
		},
		getAllResult: function () { //获取当前计算结果
			return this.resultPool;
		}
	};
	//导出函数
	if (typeof exports !== 'undefined') {
		exports.jsFlow = jsFlow;
	}
	if (typeof window !== 'undefined') {
		window.jsFlow = jsFlow;
	}
}());