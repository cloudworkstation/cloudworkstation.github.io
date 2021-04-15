---
title: Installation
---

Cloudworkstation is a series of open source components stitched toghether with a small amount of orchestration code written in Python and Terraform (plus a small amount of Java).

## Requirements

* Terraform version >= 0.14
* Packer version >= 1.7.0
* An available AWS account
* An OIDC compliant identity provider (IdP) e.g. Keycloak

## Pre-requisites

There are a number of pre-steps needed to deploy this platform.

### Build AMI

An AMI is needed for the desktop instances.  This AMI should include a VNC server and a display manager as well as any other applications you want your users to use.  You are free to build your own.  We do have some examples available in our `cloudworkstation-amis` repository.

The most simple example is `ubuntu-basic`:

```bash title="src/build_ami.sh"
git clone https://github.com/cloudworkstation/cloudworkstation-amis.git
cd cloudworkstation-amis/ubuntu_basic
packer build ubuntu_basic.pkr.hcl
```

### Setup your Identity Provider

You need an OIDC (OpenID Connect) compliant Identity Provider (IdP) to manage authentication and authorisation for the desktops platform.  You will need to collect the following details:

* Metadata URL
* JWKS (JSON Web Key Sets) URL
* Client ID
* Client Secret

The IdP should be configured to send the following claims:

* email
* groups

The `email` claim is used to uniquely identify each user.  If you don't want to use this claim then send another and make sure the `oidc_remote_user_claim` variable is updated to match it when deploying the platform.

#### Groups claim

The `groups` claim is used to determine the functionality and entitlements that will be available to the user who is a memmber of the groups.  Users can be members of more than one group.  Group names can be arbitary, however there are reserved groups with special meaning.  

|Group|Special role|
|---|---|
|admin|Provides access to manage the platform and configuration data|

### Create secrets

Some configuration needs to be stored as AWS Systems Manager Secure Parameters.  

|Parameter|Terraform variable|Details|
|---|---|---|
|Client Secret|`oidc_client_secret_ssm_name`|The client secret configured in the OIDC IdP|
|Crypto Passphrase|`oidc_crypto_passphrase_ssm_name`|Passphrase used by the OIDC proxy to hold session data, this can be a random string.|

## Deploy the platform

The platform is deployed by a single Terraform module called `cws-setup`.  It needs some information about your AWS environment as well as your OIDC provider.

The example below adopts a set of sensible defaults, more details about these are on the Configuration page.

```hcl title="src/full_deploy.tf"
module "cws" {
  source = "github.com/cloudworkstation/cloudworkstation-deployer.git//cws-setup"

  aws_region  = "<region>"
  vpc_id      = "<vpc id>"
  env_key     = "dev"
  root_domain = "<domain>"

  pub_subnets = [
    "<subnet 1>",
    "<subnet 2>",
    "..."
  ]
  priv_subnets = [
    "<subnet 1>",
    "<subnet 2>",
    "..."
  ]

  oidc_metadata_url               = "<OIDC metadata URL>"
  oidc_jwks_uri                   = "<OIDC JWKS URI>"
  oidc_client_id                  = "<client ID configured on IdP>"
  oidc_client_secret_ssm_name     = "<name of the SSM Parameter containing the OIDC client secret>"
  oidc_crypto_passphrase_ssm_name = "<name of the SSM Parameter containing the crypto passphrease used"
  oidc_remote_user_claim          = "typically 'email' or 'username'"

  instance_mgr_version = "v0.08"

}
```

There is more information available in the Deployment Configuration page on each of these variables and their role.

## Load Intial Config Data

The final deployment step is to load the intial configuration data.  This creates the admin role and group membership mapping.

DETAILS