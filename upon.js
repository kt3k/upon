
(function (window, $, Promise) {
    'use strict';

    var PromiseChain = function () {
        this.handlers = [];
    }

    var pcPrototype = PromiseChain.prototype;

    pcPrototype.then = function (onResolve, onReject) {

        this.handlers.push({
            resolve: onResolve,
            reject: onReject
        });

        return this;

    };

    pcPrototype.done = function (onResolve) {
        this.then(onResolve);

        return this;
    };

    pcPrototype.fail = function (onReject) {
        this.then(null, onReject);

        return this;
    };

    pcPrototype.loadHandlers = function (promise) {

        return this.handlers.reduce(function (promise, handler) {
            return promise.then(handler.resolve, handler.reject);
        }, promise);

    };

    $.fn.upon = function (eventName) {

        var self = this;

        var chain = new PromiseChain();

        var uponListener = function (event) {
            chain.loadHandlers(Promise.resolve({dom: self, event: event}));
        };

        this.on(eventName, uponListener);

        chain.uponListener = uponListener;

        return chain;

    };

    $.fn.apart = function (eventName, chain) {

        if (chain != null) {
            this.off(eventName, chain.uponListener);
        } else {
            this.off(eventName);
        }

    };

}(window, window.$, window.Promise));
