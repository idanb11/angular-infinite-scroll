angular.module('infiniteScroll', [])
    .directive('infiniteScroll', [ "$timeout", function ($timeout) {
    "use strict";

    return {
      link:function (scope, element, attrs) {
        var offset = parseInt(attrs.threshold) || 0;
        var e = element[0];
        var timeout = attrs.timeout || 500;
        var loadTimer = false;

        element.bind('scroll', function () {
          if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {

            if (loadTimer) {
              $timeout.cancel(loadTimer);
            }

            loadTimer = $timeout(function () {
              scope.$apply(attrs.infiniteScroll);
            }, timeout);
          }
        });
      }
    };
  }]);
