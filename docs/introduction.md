---
title: Introduction
slug: /
---

Cloudworkstation is a fully open-source virtual desktop solution.  It has the following key features:

* All the components used are free and open-source
* It uses mature building blocks like haproxy, Apache httpd, nginx, Apache Guacamole, Terraform and VNC
* It deploys in your own cloud environments and has a minmal (largely serverless) footprint
* It will horizontally scale as more desktops as created
* It integrates with OIDC compliant identity providers

This solution was designed to create a scalable way of putting the power of cloud in the hands of your users, to keep your data in your control and to provide a minimal end-user compute footprint where use cases which need additional power can leverage these virtual desktops.

Today the platform supports AWS, however we have on our roadmap to support creating virtual desktops in GCP and Azure (although the platform itself will stay on AWS).  

Any operating system when a VNC server can be deployed is supported as a host operating system for virtual desktops, however thus far we've only extensively tested the platform with Linux.

SCREENSHOT