/**
 * Created by chandrashekhardamineni on 4/7/16.
 */
'use strict';

describe('angularScopesBug', function () {

    var $rootScope, element, welcomeCtrlScope;

    beforeEach(module('angularScopesBug'));

    beforeEach(inject(function (_$rootScope_, $compile) {

        $rootScope = _$rootScope_;

        var linkFn, el;

        var scope = $rootScope.$new();

        el = angular.element(
            '<div ng-controller="WelcomeController">'+
            '<h1>Hello, {{ getName() }}</h1>'+
            '<div ng-controller="EditingController">'+
            '<button ng-click="changeName()" ng-show="!editMode">Change your name</button>'+
            '<div ng-show="editMode">'+
            '<name-editor ng-show="editMode"></name-editor>'+
            '<button ng-click="closeEditor()" ng-show="editMode">Close name editor</button>'+
            '</div>'+
            '</div>'+
            '</div>'
        );

        // The $compile method returns the directive's link function
        linkFn = $compile(el);

        // The link function returns the resulting DOM object
        element = linkFn(scope);

        element.scope().$apply();

        welcomeCtrlScope = element.scope();

    }));

    it('name should be equal to John after change', inject(function ($sniffer) {
        var inputElement = element.find("input");
        inputElement.val('John');
        inputElement.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
        $rootScope.$digest();
        expect(welcomeCtrlScope.getName()).toEqual('John');
    }));
});