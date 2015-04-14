window.EXAMPLE_BUILD = {
  "kind": "Build",
  "apiVersion": "v1beta1",
  "metadata": {
    "name": "ruby-sample-build-1",
    "namespace": "test",
    "selfLink": "/osapi/v1beta1/builds/ruby-sample-build-1?namespace=test",
    "uid": "3905d694-e208-11e4-bdc4-54ee75107c12",
    "resourceVersion": "161",
    "creationTimestamp": "2015-04-13T18:09:27Z",
    "labels": {
      "buildconfig": "ruby-sample-build",
      "name": "ruby-sample-build",
      "template": "application-template-stibuild"
    }
  },
  "parameters": {
    "source": {
      "type": "Git",
      "git": {
        "uri": "git://github.com/openshift/ruby-hello-world.git"
      }
    },
    "strategy": {
      "type": "STI",
      "stiStrategy": {
        "builderImage": "openshift/ruby-20-centos7:latest",
        "image": "openshift/ruby-20-centos7:latest"
      }
    },
    "output": {
      "to": {
        "kind": "ImageStream",
        "name": "origin-ruby-sample"
      },
      "dockerImageReference": "172.30.73.77:5000/test/origin-ruby-sample",
      "imageTag": "test/origin-ruby-sample",
      "registry": "172.30.73.77:5000"
    }
  },
  "status": "Complete",
  "startTimestamp": "2015-04-13T18:09:30Z",
  "completionTimestamp": "2015-04-13T18:11:30Z",
  "config": {
    "kind": "BuildConfig",
    "namespace": "test",
    "name": "ruby-sample-build"
  }
};