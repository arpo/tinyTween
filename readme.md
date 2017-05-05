tinyTween.js
=========

I was commissioned to create a banner and hade limited of kb to use, therefor I created tinyTween.
It's only around 600 b gzipped, around 1kb uncompressed, when minified.

Call it like this:

    tw.tween(from, to, dur, onStep, onComplete)

* from and to is any numeric value
* dur is in seconds
* onStep is a function and is called with an object containing current value and current progress.
* onStep is also called at the end together with the onComplete function.
* onComplete is called when the tween is done and has no data in the call.


Example:

    //First catch the element to tween.
    var $el = document.getElementById('d1')

    //Then set up the tween.
    tw.tween(10, 600, 0.8, function(data) {
        //Do your stuff on the tick callback.
        $el.style.left = data.val + 'px';
    }, function() {
        console.log('Complete!!');
    });


I also created tinyTweenUtils with utils to make some recurrent actions easier to do.

Example:

    tw.x('#d1', {
        to: 600,
        yoyo: true
    });

    tw.y('#d1', {
        to: 300
    });

    tw.scale('#d1', {
        to: 3
    });

    tw.rotate('#d1', {
        to: 180
    });

    tw.rotate('#d2', {
        to: 720,
        dur: 3
    });

And to que animations:

    var tl = new tw.Q({
        onComplete: function() {
            tl.play();
        }
    });

    tl.add({t: '#d1', what: 'x', to: 200, dur: 0.3});
    tl.add({t: '#d1', what: 'y', to: 200, dur: 0.3});
    tl.add({t: '#d1', what: 'scale', to: 1.4, dur: 0.3});
    tl.add({t: '#d1', what: 'rotate', to: 360, dur: 0.6});
    tl.add({t: '#d1', what: 'opacity', to: 0, dur: 0.3});
    tl.add({t: '#d1', what: 'opacity', to: 1, dur: 0.5});

    tl.add({t: '#d1', what: 'x', to: 10, dur: 0.3});
    tl.add({t: '#d1', what: 'y', to: 10, dur: 0.3});
    tl.add({t: '#d1', what: 'scale', to: 1, dur: 0.3});
    tl.add({t: '#d1', what: 'rotate', to: -360, dur: 0.6});

    tl.play();