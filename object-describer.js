'use strict';

try { angular.module("openshiftUI") } catch(e) { angular.module("openshiftUI", []) }

angular.module("openshiftUI").requires.push("kubernetesUI");

angular.module('openshiftUI')
.filter('imageRepoReference', function(){
  return function(objectRef, tag){
    tag = tag || "latest";
    var ns = objectRef.namespace || "";
    ns = ns == "" ? ns : ns + "/";
    var ref = ns + objectRef.name;
    ref += " [" + tag + "]";
    return ref;
  };
})
.run(function(KubernetesObjectDescriber) {
  KubernetesObjectDescriber.registerKind("Build", "views/build.html")
  KubernetesObjectDescriber.registerKind("DeploymentConfig", "views/deployment-config.html")
});