---
title: Architecture
---
import Mermaid from '@theme/Mermaid';

## Solution Overview

The high level solution design is shown below.

<Mermaid chart={`
	graph TD;
    IngressLB[Ingress LB] --> OIDC[OIDC Proxy]
    subgraph ECS[ECS Cluster]
      OIDC --> Console
      OIDC --> API
      OIDC --> Desktop[Desktop Router]
      Desktop --> Proxy1[Proxy 1]
      Desktop --> Proxyn[Proxy n]
    end
    Proxy1 --> Instance1[Instance 1]
    Proxyn --> Instancen[Instance n]
    API --> DB[DynamoDB]
`}/>

## Components

|Component|What is used|How it works|Code Link
|---|---|---|---|
|Ingress Load Balancer|AWS Application Load Balancer|This terminates the SSL connection from the client and forwards all connections to the `oidc-proxy` component|n/a|
|OIDC Proxy|Apache httpd + haproxy|Apache httpd checks there is a valid OIDC session (using cookies on the request) and if there's not it manages an OIDC sign-in flow with the configured IdP.  Valid sessions (authenticated) have 2 headers added (username and groups) and they are sent to haproxy.  Haproxy is configured to route the connection a backend based on the path prefix, which can be one of `/api`, `/console` or `/desktop`.|[cloudworkstation/oidc-rproxy](https://github.com/cloudworkstation/oidc-rproxy)
|Console|React/Redux app hosted on nginx|This is a very simple static site being served from nginx, it hosts the console which users interact with.  It consumes the API to get dyanmic data and perform actions|[cloudworkstation-console](https://github.com/cloudworkstation/cloudworkstation-console)|
|API|Flask app running in gunicorn|This is the API layer which provides dynamic data to the console and allows actions to be performed like creating/destroying desktops.|[cloudworkstation-api](https://github.com/cloudworkstation/cloudworkstation-api)
|Desktop Router|Haproxy + JS app|This is an instance of haproxy which routes connections to the desktop proxies.  The routing is done based on path prefixes.  An internal component is used for this: `richardjkendall/haproxy`|[haproxy](https://github.com/richardjkendall/haproxy)
|Desktop VNC proxy|Custom app, Tomcat and guacd|This manages the connection to the VNC server running on the desktop instance and presents it as a web-app in the browser.  It is based on the Apache Guacamole project along with a custom frontend and servlet hosted on Tomcat|
|Desktop Instance|EC2 instance|Each desktop is an EC2 instance with a running VNC server.  The desktop proxy connects to this VNC server.|n/a|
|Instance Manager|Terraform|The instance manager us used to spin up and destroy desktop instances and the associated proxies.  It runs a specific Terraform module and stores the state in an S3 bucket|[cloudworkstation-manager](https://github.com/cloudworkstation/cloudworkstation-manager)

## External Components

There are a number of external components that are incorporated into the solution.

|Component|Link|Licence|
|---|---|---|
|Apache httpd server|https://httpd.apache.org/|Apache License 2.0|
|Apache Guacamole|https://guacamole.apache.org/|Apache License 2.0|
|Apache Tomcat|https://tomcat.apache.org/|Apache License 2.0|
|Amazon Corretto JDK|https://github.com/corretto/corretto-jdk|GNU GPL2|
|Haproxy|https://www.haproxy.org/|GNU GPL2|
|Nginx|https://www.nginx.org|2-clause BSD|
|Nodejs|https://nodejs.org/|MIT|
|Terraform|https://github.com/hashicorp/terraform|MPL 2.0|
|React|https://github.com/facebook/react|MIT|
|Redux|https://github.com/reduxjs/redux|MIT|
|Python|https://www.python.org/|PSF|