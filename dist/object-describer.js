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
  KubernetesObjectDescriber.registerKind("Route", "views/route.html")
});

angular.module('kubernetesUI').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/build.html',
    "<div>\n" +
    "  <kubernetes-object-describe-header resource=\"resource\" kind=\"kind\"></kubernetes-object-describe-header>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Name</dt>\n" +
    "    <dd>{{resource.metadata.name}}</dd>\n" +
    "    <dt>Namespace</dt>\n" +
    "    <dd>{{resource.metadata.namespace}}</dd>\n" +
    "    <dt>Created</dt>\n" +
    "    <dd>{{resource.metadata.creationTimestamp | date:'medium'}}</dd>\n" +
    "  </dl>  \n" +
    "  <h3>Build Configuration</h3>\n" +
    "  <dl class=\"dl-horizontal\" style=\"margin-bottom: 0;\">\n" +
    "    <dt>Strategy</dt>\n" +
    "    <dd>{{resource.parameters.strategy.type}}</dd>\n" +
    "  </dl>    \n" +
    "  <div ng-switch=\"resource.parameters.strategy.type\">\n" +
    "    <div ng-switch-when=\"STI\">\n" +
    "      <div ng-if=\"resource.parameters.strategy.stiStrategy.image\">\n" +
    "        <dl class=\"dl-horizontal\" style=\"margin-bottom: 0;\">\n" +
    "          <dt>Builder image</dt>\n" +
    "          <dd>{{resource.parameters.strategy.stiStrategy.image}}</dd>\n" +
    "        </dl>\n" +
    "      </div>\n" +
    "      <div ng-if=\"resource.parameters.strategy.stiStrategy.from\">\n" +
    "        <dl class=\"dl-horizontal\" style=\"margin-bottom: 0;\">\n" +
    "          <dt>Builder image repo [tag]</dt>\n" +
    "          <dd>{{resource.parameters.strategy.stiStrategy.from | imageRepoReference : resource.parameters.strategy.stiStrategy.tag}}\n" +
    "          </dd>                  \n" +
    "        </dl>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Docker\">\n" +
    "      <div ng-if=\"resource.parameters.strategy.dockerStrategy.image\">\n" +
    "        <dl class=\"dl-horizontal\" style=\"margin-bottom: 0;\">\n" +
    "          <dt>Builder image</dt>\n" +
    "          <dd>{{resource.parameters.strategy.dockerStrategy.image}}</dd>\n" +
    "        </dl>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Custom\">\n" +
    "      <dl class=\"dl-horizontal\" style=\"margin-bottom: 0;\">\n" +
    "        <dt>Builder image</dt>\n" +
    "        <dd>{{resource.parameters.strategy.customStrategy.image}}</dd>\n" +
    "      </dl>\n" +
    "    </div>\n" +
    "  </div>  \n" +
    "  <div ng-if=\"resource.parameters.source\">\n" +
    "    <div ng-if=\"resource.parameters.source.type == 'Git'\">\n" +
    "      <dl class=\"dl-horizontal\" style=\"margin-bottom: 0;\">\n" +
    "        <dt>Source repo</dt>\n" +
    "        <dd>{{resource.parameters.source.git.uri}}</dd>\n" +
    "      </dl>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <h3>Status</h3>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Phase</dt>\n" +
    "    <dd>{{resource.status}}</dd>\n" +
    "    <dt>Started</dt>\n" +
    "    <dd>\n" +
    "      <span ng-if=\"resource.startTimestamp\">{{resource.startTimestamp | date:'medium'}}</span>\n" +
    "      <span ng-if=\"!resource.startTimestamp\"><em>not started</em></span>\n" +
    "    </dd>\n" +
    "    <dt>Completed</dt>\n" +
    "    <dd>\n" +
    "      <span ng-if=\"resource.completionTimestamp\">{{resource.completionTimestamp | date:'medium'}}</span>\n" +
    "      <span ng-if=\"!resource.completionTimestamp\"><em>not complete</em></span>\n" +
    "    </dd>\n" +
    "  </dl>\n" +
    "  <kubernetes-object-describe-labels resource=\"resource\"></kubernetes-object-describe-labels>\n" +
    "  <kubernetes-object-describe-annotations resource=\"resource\"></kubernetes-object-describe-annotations>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>\n"
  );


  $templateCache.put('views/deployment-config.html',
    "<div>\n" +
    "  <kubernetes-object-describe-header resource=\"resource\" kind=\"kind\"></kubernetes-object-describe-header>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Name</dt>\n" +
    "    <dd>{{resource.metadata.name}}</dd>\n" +
    "    <dt>Namespace</dt>\n" +
    "    <dd>{{resource.metadata.namespace}}</dd>\n" +
    "    <dt>Created</dt>\n" +
    "    <dd>{{resource.metadata.creationTimestamp | date:'medium'}}</dd>\n" +
    "  </dl>\n" +
    "  <h3>Triggers</h3>\n" +
    "  <dl class=\"dl-horizontal\" ng-repeat=\"trigger in resource.triggers\">\n" +
    "    <dt>Type</dt>\n" +
    "    <dd>{{trigger.type}}</dd>\n" +
    "    <dt ng-if-start=\"trigger.type == 'ImageChange'\">Image</dt>\n" +
    "    <dd ng-if-end>{{trigger.imageChangeParams.from.name}}:{{trigger.imageChangeParams.tag}}</dd>\n" +
    "  </dl>\n" +
    "  <h3>Replication Settings</h3>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Replicas</dt>\n" +
    "    <dd>{{resource.template.controllerTemplate.replicas}}</dd>   \n" +
    "  </dl>\n" +
    "  <h4>Selector</h4>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt ng-repeat-start=\"(selectorKey, selectorValue) in resource.template.controllerTemplate.replicaSelector\">{{selectorKey}}</dt>\n" +
    "    <dd ng-repeat-end>{{selectorValue}}</dd>\n" +
    "  </dl>  \n" +
    "  <kubernetes-object-describe-pod-template template=\"resource.template.controllerTemplate.podTemplate.desiredState.manifest\"></kubernetes-object-describe-pod-template>  \n" +
    "  <kubernetes-object-describe-labels resource=\"resource\"></kubernetes-object-describe-labels>\n" +
    "  <kubernetes-object-describe-annotations resource=\"resource\"></kubernetes-object-describe-annotations>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>\n"
  );


  $templateCache.put('views/route.html',
    "<div>\n" +
    "  <kubernetes-object-describe-header resource=\"resource\" kind=\"kind\"></kubernetes-object-describe-header>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Name</dt>\n" +
    "    <dd>{{resource.metadata.name}}</dd>\n" +
    "    <dt>Namespace</dt>\n" +
    "    <dd>{{resource.metadata.namespace}}</dd>\n" +
    "    <dt>Created</dt>\n" +
    "    <dd>{{resource.metadata.creationTimestamp | date:'medium'}}</dd>\n" +
    "    <dt>Host</dt>\n" +
    "    <dd>{{resource.host}}</dd>\n" +
    "    <dt>Path</dt>\n" +
    "    <dd>{{resource.path || 'None'}}</dd>\n" +
    "    <dt>Service Name</dt>\n" +
    "    <dd>{{resource.serviceName}}</dd>\n" +
    "  </dl>\n" +
    "  <div ng-if=\"resource.tls && resource.tls.termination\">\n" +
    "    <dl class=\"dl-horizontal\">\n" +
    "      <dt>TLS Termination</dt>\n" +
    "      <dd>{{resource.tls.termination}}</dd>\n" +
    "      <dt>Certificate</dt>\n" +
    "      <dd>{{(resource.tls.certificate) ? '*****' : 'None'}}</dd>\n" +
    "      <dt>Key</dt>\n" +
    "      <dd>{{(resource.tls.key) ? '*****' : 'None'}}</dd>\n" +
    "      <dt>CA Certificate</dt>\n" +
    "      <dd>{{(resource.tls.caCertificate) ? '*****' : 'None'}}</dd>\n" +
    "      <dt>Destination CA Cert</dt>\n" +
    "      <dd>{{(resource.tls.destinationCACertificate) ? '*****' : 'None'}}</dd>\n" +
    "    </dl>\n" +
    "  </div>\n" +
    "  <kubernetes-object-describe-labels resource=\"resource\"></kubernetes-object-describe-labels>\n" +
    "  <kubernetes-object-describe-annotations resource=\"resource\"></kubernetes-object-describe-annotations>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>\n"
  );

}]);
