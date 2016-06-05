"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var en_I18N={management:"Management"};angular.module("ecomovaApp.I18N",[]),angular.module("ecomovaApp",["ecomovaApp.auth","ecomovaApp.admin","ecomovaApp.constants","ngCookies","ngResource","ngSanitize","btford.socket-io","ui.router","validation.match","ngMaterial","ngMessages","pascalprecht.translate"]).config(["$urlRouterProvider","$locationProvider","$translateProvider","$mdThemingProvider",function(a,b,c,d){a.otherwise("/"),b.html5Mode(!0),c.translations("en",en_I18N),c.preferredLanguage("en"),d.theme("default").primaryPalette("light-green")}]),angular.module("ecomovaApp.admin",["ecomovaApp.auth","ui.router"]),angular.module("ecomovaApp.auth",["ecomovaApp.constants","ecomovaApp.util","ngCookies","ui.router"]).config(["$httpProvider",function(a){a.interceptors.push("authInterceptor")}]),angular.module("ecomovaApp.util",[]),function(){function a(a,b,c,d,e,f,g){var h=f.safeCb,i={},j=e.userRoles||[];c.get("token")&&"/logout"!==a.path()&&(i=g.get());var k={login:function(a,e){var f=a.email,j=a.password;return b.post("/auth/local",{email:f,password:j}).then(function(a){return c.put("token",a.data.token),i=g.get(),i.$promise}).then(function(a){return h(e)(null,a),a})["catch"](function(a){return k.logout(),h(e)(a.data),d.reject(a.data)})},logout:function(){c.remove("token"),i={}},createUser:function(a,b){return g.save(a,function(d){return c.put("token",d.token),i=g.get(),h(b)(null,a)},function(a){return k.logout(),h(b)(a)}).$promise},changePassword:function(a,b,c){return g.changePassword({id:i._id},{oldPassword:a,newPassword:b},function(){return h(c)(null)},function(a){return h(c)(a)}).$promise},getCurrentUser:function(a){if(0===arguments.length)return i;var b=i.hasOwnProperty("$promise")?i.$promise:i;return d.when(b).then(function(b){return h(a)(b),b},function(){return h(a)({}),{}})},isLoggedIn:function(a){return 0===arguments.length?i.hasOwnProperty("role"):k.getCurrentUser(null).then(function(b){var c=b.hasOwnProperty("role");return h(a)(c),c})},hasRole:function l(a,b){var l=function(a,b){return j.indexOf(a)>=j.indexOf(b)};return arguments.length<2?l(i.role,a):k.getCurrentUser(null).then(function(c){var d=c.hasOwnProperty("role")?l(c.role,a):!1;return h(b)(d),d})},isAdmin:function(){return k.hasRole.apply(k,[].concat.apply(["admin"],arguments))},getToken:function(){return c.get("token")}};return k}a.$inject=["$location","$http","$cookies","$q","appConfig","Util","User"],angular.module("ecomovaApp.auth").factory("Auth",a)}();var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b){_classCallCheck(this,a),this.users=b.query()}return a.$inject=["User"],_createClass(a,[{key:"delete",value:function(a){a.$remove(),this.users.splice(this.users.indexOf(a),1)}}]),a}();angular.module("ecomovaApp.admin").controller("AdminController",a)}(),angular.module("ecomovaApp").config(["$stateProvider",function(a){a.state("login",{url:"/login",templateUrl:"app/account/login/login.html",controller:"LoginController",controllerAs:"vm"}).state("logout",{url:"/logout?referrer",referrer:"main",template:"",controller:["$state","Auth",function(a,b){var c=a.params.referrer||a.current.referrer||"main";b.logout(),a.go(c)}]}).state("signup",{url:"/signup",templateUrl:"app/account/signup/signup.html",controller:"SignupController",controllerAs:"vm"}).state("settings",{url:"/settings",templateUrl:"app/account/settings/settings.html",controller:"SettingsController",controllerAs:"vm",authenticate:!0})}]).run(["$rootScope",function(a){a.$on("$stateChangeStart",function(a,b,c,d){"logout"===b.name&&d&&d.name&&!d.authenticate&&(b.referrer=d.name)})}]),angular.module("ecomovaApp.admin").config(["$stateProvider",function(a){a.state("admin",{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"admin",authenticate:"admin"})}]),function(a,b){a.module("ecomovaApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b,c,d){_classCallCheck(this,a),this.$http=b,this.socket=d,this.awesomeThings=[],c.$on("$destroy",function(){d.unsyncUpdates("thing")})}return a.$inject=["$http","$scope","socket"],_createClass(a,[{key:"$onInit",value:function(){var a=this;this.$http.get("/api/things").then(function(b){a.awesomeThings=b.data,a.socket.syncUpdates("thing",a.awesomeThings)})}},{key:"addThing",value:function(){this.newThing&&(this.$http.post("/api/things",{name:this.newThing}),this.newThing="")}},{key:"deleteThing",value:function(a){this.$http["delete"]("/api/things/"+a._id)}}]),a}();angular.module("ecomovaApp").component("main",{templateUrl:"app/main/main.html",controller:a})}(),angular.module("ecomovaApp").config(["$stateProvider",function(a){a.state("main",{url:"/",template:"<main></main>"})}]),angular.module("ecomovaApp").directive("toolbar",function(){return{templateUrl:"app/toolbar/toolbar.html",restrict:"E",link:function(a,b,c){a.showSearch=!1,a.toggleSearch=function(b){a.showSearch=!a.showSearch},a.toggleSidenav=function(a){}}}});var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),SettingsController=function(){function a(b){_classCallCheck(this,a),this.errors={},this.submitted=!1,this.Auth=b}return a.$inject=["Auth"],_createClass(a,[{key:"changePassword",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.changePassword(this.user.oldPassword,this.user.newPassword).then(function(){b.message="Password successfully changed."})["catch"](function(){a.password.$setValidity("mongoose",!1),b.errors.other="Incorrect password",b.message=""})}}]),a}();angular.module("ecomovaApp").controller("SettingsController",SettingsController);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),LoginController=function(){function a(b,c){_classCallCheck(this,a),this.user={},this.errors={},this.submitted=!1,this.Auth=b,this.$state=c}return a.$inject=["Auth","$state"],_createClass(a,[{key:"login",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.login({email:this.user.email,password:this.user.password}).then(function(){b.$state.go("main")})["catch"](function(a){b.errors.other=a.message})}}]),a}();angular.module("ecomovaApp").controller("LoginController",LoginController),function(){function a(a,b,c,d,e){var f;return{request:function(a){return a.headers=a.headers||{},c.get("token")&&e.isSameOrigin(a.url)&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status&&((f||(f=d.get("$state"))).go("login"),c.remove("token")),b.reject(a)}}}a.$inject=["$rootScope","$q","$cookies","$injector","Util"],angular.module("ecomovaApp.auth").factory("authInterceptor",a)}(),function(){angular.module("ecomovaApp.auth").run(["$rootScope","$state","Auth",function(a,b,c){a.$on("$stateChangeStart",function(a,d){d.authenticate&&("string"==typeof d.authenticate?c.hasRole(d.authenticate,_.noop).then(function(d){return d?void 0:(a.preventDefault(),c.isLoggedIn(_.noop).then(function(a){b.go(a?"main":"login")}))}):c.isLoggedIn(_.noop).then(function(c){c||(a.preventDefault(),b.go("main"))}))})}])}(),function(){function a(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}a.$inject=["$resource"],angular.module("ecomovaApp.auth").factory("User",a)}(),angular.module("ecomovaApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(a,b){b.addClass("footer")}}}),angular.module("ecomovaApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}});var NavbarController=function a(b,c){_classCallCheck(this,a),this.menu=[{link:"",title:"Carpool",icon:"dashboard"},{link:"",title:"Friends",icon:"group"},{link:"",title:"Messages",icon:"message"}],this.admin=[{link:"",title:"Settings",icon:"settings"}],this.isCollapsed=!0,this.isLoggedIn=b.isLoggedIn,this.isAdmin=b.isAdmin,this.getCurrentUser=b.getCurrentUser,this.$mdSidenav=c};NavbarController.$inject=["Auth","$mdSidenav"],angular.module("ecomovaApp").controller("NavbarController",NavbarController),angular.module("ecomovaApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),angular.module("ecomovaApp").controller("OauthButtonsCtrl",["$window",function(a){this.loginOauth=function(b){a.location.href="/auth/"+b}}]),angular.module("ecomovaApp").directive("oauthButtons",function(){return{templateUrl:"components/oauth-buttons/oauth-buttons.html",restrict:"EA",controller:"OauthButtonsCtrl",controllerAs:"OauthButtons",scope:{classes:"@"}}}),angular.module("ecomovaApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),SignupController=function(){function a(b,c){_classCallCheck(this,a),this.user={},this.errors={},this.submitted=!1,this.Auth=b,this.$state=c}return a.$inject=["Auth","$state"],_createClass(a,[{key:"register",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.createUser({name:this.user.name,email:this.user.email,password:this.user.password}).then(function(){b.$state.go("main")})["catch"](function(c){c=c.data,b.errors={},angular.forEach(c.errors,function(c,d){a[d].$setValidity("mongoose",!1),b.errors[d]=c.message})})}}]),a}();angular.module("ecomovaApp").controller("SignupController",SignupController),function(){function a(a){var b={safeCb:function(a){return angular.isFunction(a)?a:angular.noop},urlParse:function(a){var b=document.createElement("a");return b.href=a,""===b.host&&(b.href=b.href),b},isSameOrigin:function(c,d){return c=b.urlParse(c),d=d&&[].concat(d)||[],d=d.map(b.urlParse),d.push(a.location),d=d.filter(function(a){return c.hostname===a.hostname&&c.port===a.port&&c.protocol===a.protocol}),d.length>=1}};return b}a.$inject=["$window"],angular.module("ecomovaApp.util").factory("Util",a)}(),angular.module("ecomovaApp").run(["$templateCache",function(a){a.put("app/account/login/login.html",'<div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from<code>server/config/seed.js</code>. Default account is<code>test@example.com</code>/<code>test</code></p><p>Admin account is<code>admin@example.com</code>/<code>admin</code></p></div><div class=col-sm-12><form name=form ng-submit=vm.login(form) novalidate class=form><div class=form-group><label>Email</label><input type=email name=email ng-model=vm.user.email class=form-control></div><div class=form-group><label>Password</label><input type=password name=password ng-model=vm.user.password class=form-control></div><div class="form-group has-error"><p ng-show="form.email.$error.required &amp;&amp; form.password.$error.required &amp;&amp; vm.submitted" class=help-block>Please enter your email and password.</p><p class=help-block>{{ vm.errors.other }}</p></div><div><button type=submit class="btn btn-inverse btn-lg btn-login">Login</button> <a ui-sref=signup class="btn btn-default btn-lg btn-register">Register</a></div><hr><div class=row><div class="col-sm-4 col-md-3"><oauth-buttons classes=btn-block></oauth-buttons></div></div></form></div></div><hr></div>'),a.put("app/account/settings/settings.html",'<div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form name=form ng-submit=vm.changePassword(form) novalidate class=form><div class=form-group><label>Current Password</label><input type=password name=password ng-model=vm.user.oldPassword mongoose-error="" class=form-control><p ng-show=form.password.$error.mongoose class=help-block>{{ vm.errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword ng-model=vm.user.newPassword ng-minlength=3 required class=form-control><p ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) &amp;&amp; (form.newPassword.$dirty || vm.submitted)" class=help-block>Password must be at least 3 characters.</p></div><div class=form-group><label>Confirm New Password</label><input type=password name=confirmPassword ng-model=vm.user.confirmPassword match=vm.user.newPassword ng-minlength=3 required class=form-control><p ng-show="fvm.orm.confirmPassword.$error.match &amp;&amp; vm.submitted" class=help-block>Passwords must match.</p></div><p class=help-block>{{ vm.message }}</p><button type=submit class="btn btn-lg btn-primary">Save changes</button></form></div></div></div>'),a.put("app/account/signup/signup.html",'<div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form name=form ng-submit=vm.register(form) novalidate class=form><div ng-class="{ &quot;has-success&quot;: form.name.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.name.$invalid &amp;&amp; vm.submitted }" class=form-group><label>Name</label><input name=name ng-model=vm.user.name required class=form-control><p ng-show="form.name.$error.required &amp;&amp; vm.submitted" class=help-block>A name is required</p></div><div ng-class="{ &quot;has-success&quot;: form.email.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.email.$invalid &amp;&amp; vm.submitted }" class=form-group><label>Email</label><input type=email name=email ng-model=vm.user.email required mongoose-error="" class=form-control><p ng-show="form.email.$error.email &amp;&amp; vm.submitted" class=help-block>Doesn\'t look like a valid email.</p><p ng-show="form.email.$error.required &amp;&amp; vm.submitted" class=help-block>What\'s your email address?</p><p ng-show=form.email.$error.mongoose class=help-block>{{ vm.errors.email }}</p></div><div ng-class="{ &quot;has-success&quot;: form.password.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.password.$invalid &amp;&amp; vm.submitted }" class=form-group><label>Password</label><input type=password name=password ng-model=vm.user.password mongoose-error="" ng-minlength=3 required class=form-control><p ng-show="(form.password.$error.minlength || form.password.$error.required) &amp;&amp; vm.submitted" class=help-block>Password must be at least 3 characters.</p><p ng-show=form.password.$error.mongoose class=help-block>{{ vm.errors.password }}</p></div><div ng-class="{ &quot;has-success&quot;: form.confirmPassword.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.confirmPassword.$invalid &amp;&amp; vm.submitted }" class=form-group><label>Confirm Password</label><input type=password name=confirmPassword ng-model=vm.user.confirmPassword match=vm.user.password ng-minlength=3 required class=form-control><p ng-show="form.confirmPassword.$error.match &amp;&amp; vm.submitted" class=help-block>Passwords must match.</p></div><div><button type=submit class="btn btn-inverse btn-lg btn-register">Sign up</button> <a ui-sref=login class="btn btn-default btn-lg btn-login">Login</a></div><hr><div class=row><div class="col-sm-4 col-md-3"><oauth-buttons classes=btn-block></oauth-buttons></div></div></form></div></div><hr></div>'),a.put("app/admin/admin.html",'<div class=container><p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p><ul class=list-group><li ng-repeat="user in admin.users" class=list-group-item><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span><a ng-click=admin.delete(user) class=trash><span class="glyphicon glyphicon-trash pull-right"></span></a></li></ul></div>'),a.put("app/main/main.html","<toolbar></toolbar>"),a.put("app/toolbar/toolbar.html",'<md-toolbar ng-show=!showSearch class="animate-show md-tall md-whiteframe-z1"><div class=md-toolbar-tools><md-button ng-click="toggleSidenav(\'left\')" hide-gt-md="" aria-label=Menu class=md-icon-button><i class=material-icons>menu</i></md-button><h3>Ecomova</h3><span flex=""></span><md-button aria-label=Search ng-click=toggleSearch() class=md-icon-button><i class=material-icons>search</i></md-button><md-button aria-label="Open Settings" ng-click=showListBottomSheet($event) class=md-icon-button><i class=material-icons>help</i></md-button></div></md-toolbar><md-toolbar ng-show=showSearch class="animate-show md-hue-1 md-whiteframe-z1"><div class=md-toolbar-tools><md-button ng-click=toggleSearch() aria-label=Menu class=md-icon-button><i class=material-icons>arrow_back</i></md-button><h3 role=button ng-click=toggleSearch()>Back</h3><span flex=5></span><span><md-autocomplete md-theme=input md-input-name=autocompleteField md-no-cache=ctrl.noCache md-selected-item=ctrl.selectedItem md-search-text=ctrl.searchText md-items="item in ctrl.querySearch(ctrl.searchText)" md-item-text=item.display placeholder=Search><md-item-template><span md-highlight-text=ctrl.searchText>{{item.display}}</span></md-item-template><div ng-messages=searchForm.autocompleteField.$error ng-if=searchForm.autocompleteField.$touched><div ng-message=required>You <b>must</b> have a favorite state.</div><div ng-message=minlength>Your entry is not long enough.</div><div ng-message=maxlength>Your entry is too long.</div></div></md-autocomplete></span></div></md-toolbar>'),a.put("components/footer/footer.html",'<div class=container><p>Angular Fullstack v3.6.1 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div>'),a.put("components/navbar/navbar.html",'<md-sidenav md-component-id=left md-is-locked-open="$mdMedia(\'gt-md\')" class="md-sidenav-left md-whiteframe-z2"><md-toolbar class=md-tall><span flex=""></span><div layout=column class="md-toolbar-tools-bottom inset"><md-icon md-svg-icon=avatars:svg-1 class=md-avatar></md-icon><span>Hen</span><div>{{ nav.getCurrentUser().name }}</div></div></md-toolbar><md-content><md-list><md-list-item ng-repeat="item in nav.menu" md-ink-ripple=""><md-item-content layout=row layout-align="start center"><div class=inset><i class=material-icons>{{item.icon}}</i></div><div class=inset></div>{{item.title}}</md-item-content></md-list-item></md-list></md-content><md-divider></md-divider><md-content><md-list><md-list-item ng-repeat="item in nav.admin" md-ink-ripple=""><md-item-content layout=row layout-align="start center"><div class=inset><i class=material-icons>{{item.icon}}</i></div><div class=inset></div>{{item.title}}</md-item-content></md-list-item></md-list></md-content></md-sidenav>'),a.put("components/oauth-buttons/oauth-buttons.html",'<a ng-class=classes ng-click=OauthButtons.loginOauth(&quot;facebook&quot;) class="btn btn-facebook"><i class="fa fa-facebook"></i> Connect with Facebook</a><a ng-class=classes ng-click=OauthButtons.loginOauth(&quot;google&quot;) class="btn btn-google"><i class="fa fa-google-plus"></i> Connect with Google+</a><a ng-class=classes ng-click=OauthButtons.loginOauth(&quot;twitter&quot;) class="btn btn-twitter"><i class="fa fa-twitter"></i> Connect with Twitter</a>')}]);