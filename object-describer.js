'use strict';

try { angular.module("openshiftUI") } catch(e) { angular.module("openshiftUI", []) }

angular.module("openshiftUI").requires.push("kubernetesUI");

angular.module('openshiftUI')
.run(function(KubernetesObjectDescriber) {
  KubernetesObjectDescriber.registerKind("Build", "views/build.html")
});