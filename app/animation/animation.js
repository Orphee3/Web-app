/**
 * Created by superphung on 11/14/15.
 */
(function () {
    angular
        .module('orphee-app')
        .factory('animation', animation);

    function animation() {
        var vm = this;

        return {
            zoom: zoom,
            dezoom: dezoom
        };

        function zoom() {
            init();
            vm.zoomAnimation.play();
        }

        function dezoom() {
            vm.zoomAnimation.reverse();
        }

        function init() {
            vm.zoomAnimation = new TimelineLite({paused:true});
            vm.zoomAnimation.timeScale(1)
                .set($("#circle"), {scale: 1.2, opacity: 0})
                .set($("#details"), {display: "none"})
                .set($("#song"), {display: "none", opacity: 1})
                .set($("#details"), {display: "block"})
                .set($("#song"), {display: "block"})
                .addLabel("start")
                .to($("#grid-list-home"), 0.05, {display: "none"}, "start")
                .to($("#circle"), 0.01, {opacity: 1}, "start")
                .to($("#circle"), 0.3, {scale: 6}, "start+=0.01")
                .to($("#circle"), 0.1, {scale: 7, opacity: 0.85}, "start+=0.31")
                .to($("#circle"), 0.4, {delay: 0.2, opacity: 0}, "start+=0.5")
                .set($("#circle"), {display: "none"}, "start+=0.7")
                .to($("#song"), 0.33, { width:200, height:130, top:240, left:320}, "start")
                .set($("#playlist"), {width: 200, height: 130, top: 240, left: 320}, "start+=0.33")
                .to($("#playlist"), 0.010, {display: "block", className: ""}, "start+=0.33")
                .to($("#song"), 0.010, {opacity: 0, display: "none"}, "start+=0.33")
                .to($("#playlist"), 0.5, {left:106, top:229, width:300, height:200}, "start+=0.34");
        }
    }
})();