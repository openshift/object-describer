window.EXAMPLE_DEP_CONFIG = {
  "kind": "DeploymentConfig",
  "apiVersion": "v1beta1",
  "metadata": {
    "name": "frontend",
    "namespace": "test",
    "selfLink": "/osapi/v1beta1/deploymentConfigs/frontend?namespace=test",
    "uid": "3626ef31-e208-11e4-bdc4-54ee75107c12",
    "resourceVersion": "146",
    "creationTimestamp": "2015-04-13T18:09:22Z",
    "labels": {
      "template": "application-template-stibuild"
    }
  },
  "triggers": [
    {
      "type": "ImageChange",
      "imageChangeParams": {
        "automatic": true,
        "containerNames": [
          "ruby-helloworld"
        ],
        "from": {
          "kind": "ImageRepository",
          "name": "origin-ruby-sample"
        },
        "tag": "latest",
        "lastTriggeredImage": "172.30.73.77:5000/test/origin-ruby-sample:7d7d7af5551062c36e680a81bfbd6598c9934b41139d9ed6c8ef13a64b9ffe72"
      }
    },
    {
      "type": "ConfigChange"
    }    
  ],
  "template": {
    "strategy": {
      "type": "Recreate"
    },
    "controllerTemplate": {
      "replicas": 1,
      "replicaSelector": {
        "name": "frontend"
      },
      "podTemplate": {
        "desiredState": {
          "manifest": {
            "version": "v1beta2",
            "id": "",
            "volumes": null,
            "containers": [
              {
                "name": "ruby-helloworld",
                "image": "172.30.73.77:5000/test/origin-ruby-sample:7d7d7af5551062c36e680a81bfbd6598c9934b41139d9ed6c8ef13a64b9ffe72",
                "ports": [
                  {
                    "containerPort": 8080,
                    "protocol": "TCP"
                  }
                ],
                "env": [
                  {
                    "name": "ADMIN_USERNAME",
                    "key": "ADMIN_USERNAME",
                    "value": "admin4OS"
                  },
                  {
                    "name": "ADMIN_PASSWORD",
                    "key": "ADMIN_PASSWORD",
                    "value": "GVuiK2je"
                  },
                  {
                    "name": "MYSQL_USER",
                    "key": "MYSQL_USER",
                    "value": "userTJW"
                  },
                  {
                    "name": "MYSQL_PASSWORD",
                    "key": "MYSQL_PASSWORD",
                    "value": "HOtpCU67"
                  },
                  {
                    "name": "MYSQL_DATABASE",
                    "key": "MYSQL_DATABASE",
                    "value": "root"
                  }
                ],
                "resources": {},
                "terminationMessagePath": "/dev/termination-log",
                "imagePullPolicy": "PullIfNotPresent",
                "capabilities": {}
              }
            ],
            "restartPolicy": {
              "always": {}
            },
            "dnsPolicy": "ClusterFirst"
          }
        },
        "labels": {
          "name": "frontend",
          "template": "application-template-stibuild"
        }
      }
    }
  },
  "latestVersion": 1,
  "details": {
    "causes": [
      {
        "type": "ImageChange",
        "imageTrigger": {
          "repositoryName": "172.30.73.77:5000/test/origin-ruby-sample:7d7d7af5551062c36e680a81bfbd6598c9934b41139d9ed6c8ef13a64b9ffe72",
          "tag": "latest"
        }
      }
    ]
  }
};