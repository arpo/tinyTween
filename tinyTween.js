/*
 * TinyTween 1.0
 */

var tw = {};
tw.c = 0;
tw.TwO = function(data) {

    this.from = data.from;
    this.id = data.id;
    this.val = data.from;
    this.to = data.to;
    this.prog = 0;
    this.time = 0;
    this.paused = data.paused;
    this.inc = data.dur / (60 * data.dur);
    this.dur = data.dur;
    this.onStep = data.onStep;
    this.onComplete = data.onComplete;

};

tw.TwO.prototype.fn = function(scope) {

    scope.prog = scope.time / scope.dur;
    scope.val = tw.ease.easeInOut(scope.prog * scope.dur, scope.from, scope.prog * (scope.to - scope.from), scope.dur);

    if (scope.time >= scope.dur) {
        scope.prog = 1;
        scope.val = scope.to;
        scope.onComplete();
        tw.all[scope.id].kill();
    }

    scope.onStep({
        prog: scope.prog,
        val: scope.val
    });
    scope.time += scope.inc;

};

tw.TwO.prototype.kill = function() {

    var that = this,
        t = tw.all[that.id];

    if (t.tm) {
        clearTimeout(t.tm);
    }
    delete tw.all[that.id];

};

tw.init = function() {
    tw.init = null;
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    tw.loop();
};
tw.loop = function() {

    requestAnimFrame(tw.loop);

    for (var t in tw.all) {
        if (tw.all.hasOwnProperty(t)) {
            if (!tw.all[t].paused) {
                tw.all[t].fn(tw.all[t]);
            }
        }
    }

};
tw.tween = function(from, to, dur, onStep, onComplete, paused) {

    if (tw.init) tw.init();
    var id = 'tw' + (tw.c++);

    var data = {
        from: from,
        id: id,
        val: from,
        to: to,
        prog: 0,
        time: 0,
        inc: dur / (60 * dur),
        dur: dur,
        paused: paused,
        onStep: onStep,
        onComplete: onComplete
    };

    tw.all[id] = new tw.TwO(data);
    return tw.all[id];

};
tw.all = {};
tw.ease = {};

// To keep things small, only uncomment the ease you use
// Easing equations by Robert Penner

// simple linear tweening - no easing, no acceleration
// tw.ease.linearTween = function(t, b, c, d) {
//     return c * t / d + b;
// };

// Easa in / out, tweeked by me
tw.ease.easeInOut = function(t, b, c, d) {
    t /= d / 3;
    if (t < 1.5) return c / 3 * t * t + b;
    t--;
    return -c / 3 * (t * (t - 3) - 1) + b;
};

// quadratic easing in - accelerating from zero velocity
// tw.ease.easeInQuad = function(t, b, c, d) {
//     t /= d;
//     return c * t * t + b;
// };

// quadratic easing out - decelerating to zero velocity
// tw.ease.easeOutQuad = function(t, b, c, d) {
//     t /= d;
//     return -c * t * (t - 2) + b;
// };

// quadratic easing in/out - acceleration until halfway, then deceleration
// tw.ease.easeInOutQuad = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t + b;
//     t--;
//     return -c / 2 * (t * (t - 2) - 1) + b;
// };

// cubic easing in - accelerating from zero velocity
// tw.ease.easeInCubic = function(t, b, c, d) {
//     t /= d;
//     return c * t * t * t + b;
// };

// cubic easing out - decelerating to zero velocity
// tw.ease.easeOutCubic = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return c * (t * t * t + 1) + b;
// };

// cubic easing in/out - acceleration until halfway, then deceleration
// tw.ease.easeInOutCubic = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t * t + b;
//     t -= 2;
//     return c / 2 * (t * t * t + 2) + b;
// };

// quartic easing in - accelerating from zero velocity
// tw.ease.easeInQuart = function(t, b, c, d) {
//     t /= d;
//     return c * t * t * t * t + b;
// };

// quartic easing out - decelerating to zero velocity
// tw.ease.easeOutQuart = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return -c * (t * t * t * t - 1) + b;
// };

// quartic easing in/out - acceleration until halfway, then deceleration
// tw.ease.easeInOutQuart = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t * t * t + b;
//     t -= 2;
//     return -c / 2 * (t * t * t * t - 2) + b;
// };


// quintic easing in - accelerating from zero velocity
// tw.ease.easeInQuint = function(t, b, c, d) {
//     t /= d;
//     return c * t * t * t * t * t + b;
// };

// quintic easing out - decelerating to zero velocity
// tw.ease.easeOutQuint = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return c * (t * t * t * t * t + 1) + b;
// };

// quintic easing in/out - acceleration until halfway, then deceleration
// tw.ease.easeInOutQuint = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t * t * t * t + b;
//     t -= 2;
//     return c / 2 * (t * t * t * t * t + 2) + b;
// };

// sinusoidal easing in - accelerating from zero velocity
// tw.ease.easeInSine = function(t, b, c, d) {
//     return -c * cos(t / d * (PI / 2)) + c + b;
// };

// sinusoidal easing out - decelerating to zero velocity
// tw.ease.easeOutSine = function(t, b, c, d) {
//     return c * sin(t / d * (PI / 2)) + b;
// };

// sinusoidal easing in/out - accelerating until halfway, then decelerating
// tw.ease.easeInOutSine = function(t, b, c, d) {
//     return -c / 2 * (cos(PI * t / d) - 1) + b;
// };


// exponential easing in - accelerating from zero velocity
// tw.ease.easeInExpo = function(t, b, c, d) {
//     return c * pow(2, 10 * (t / d - 1)) + b;
// };

// exponential easing out - decelerating to zero velocity
// tw.ease.easeOutExpo = function(t, b, c, d) {
//     return c * (-pow(2, -10 * t / d) + 1) + b;
// };

// exponential easing in/out - accelerating until halfway, then decelerating
// tw.ease.easeInOutExpo = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * pow(2, 10 * (t - 1)) + b;
//     t--;
//     return c / 2 * (-pow(2, -10 * t) + 2) + b;
// };

// circular easing in - accelerating from zero velocity
// tw.ease.easeInCirc = function(t, b, c, d) {
//     t /= d;
//     return -c * (Math.sqrt(1 - t * t) - 1) + b;
// };


// circular easing out - decelerating to zero velocity
// tw.ease.easeOutCirc = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return c * Math.sqrt(1 - t * t) + b;
// };

// circular easing in/out - acceleration until halfway, then deceleration
// tw.ease.easeInOutCirc = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
//     t -= 2;
//     return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
// };
