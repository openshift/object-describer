'use strict';

try { angular.module("openshiftUI") } catch(e) { angular.module("openshiftUI", []) }

angular.module("openshiftUI").requires.push("kubernetesUI");

angular.module('openshiftUI')
.run(function(KubernetesObjectDescriber) {
  KubernetesObjectDescriber.registerKind("Build", "views/build.html")
});
angular.module('kubernetesUI').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/build.html',
    "<div>\n" +
    "  TODO - currently using the default describer as a placeholder\n" +
    "  <kubernetes-object-describe-header resource=\"resource\"></kubernetes-object-describe-header>\n" +
    "  <kubernetes-object-describe-metadata resource=\"resource\"></kubernetes-object-describe-metadata>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>"
  );

}]);
