---
title: Deployment Configuration
---

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '5px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

export const Yes = ({children}) => (
  <Highlight color="#ff0000">Yes</Highlight>
);

export const No = ({children}) => (
  <Highlight color="#25c2a0">No</Highlight>
);

The Terraform deployment module accepts a number of different configuration variables.  Some are mandatory and others can be omitted in which case defaults are used.

|Variable|Function|Mandatory|Default|
|---|---|---|---|
|`aws_region`|Region in which the platform will be deployed|<Yes/>|n/a|
|`vpc_id`|AWS VPC in which the platform will be deployed|<Yes/>|n/a|
|`env_key`|Unique key for this deployment, allows multiple platforms to coexist in the same AWS account|<No/>|`prod`|
|`root_domain`|Selects the Route53 zone to use for the platform records, this domain should therefore exist in your AWS account as a Route53 hosted zone|<Yes/>|n/a|
|`hostname`|The name use for the Route53 recordset which points to the Ingress LB|<No/>|`desktops`
|`cluster_name`|The name of the ECS cluster which is created for hosting Fargate tasks/services|<No/>|`desktops`
|`namspace_suffix`|Ths DNS suffix used for the CloudMap namespace where tasks and services are registered|<No/>|`workstations.local`
|`table_name`|The name of the DynamoDB table where configuration data is stored for the platform|<No/>|`desktops_data`
|`pub_subnets`|The subnets with public connectivity (an internet gateway attached) which are used for the public side of the load balancer|<Yes/>|n/a
|`priv_subnets`|The subnets without public connectivity which are used for internal services and tasks.  These subnets still need the ability for outbound internet connectivity|<Yes/>|n/a
|`number_of_oidc_instances`|How many OIDC proxy instances should be run?|<No/>|2
|`number_of_router_instances`|How many Desktop router instances should be run|<No/>|2
|`number_of_api_instances`|How many API server instances should be run|<No/>|2
|`number_of_console_instances`|How many console server instances should be run|<No/>|2
|`use_spot_capacity`|Should spot capacity be used for the Fargate tasks?  Not recommended for production environments|<No/>|`false`
|`instance_mgr_version`|What version of the instance manager Terraform module should be used|<No/>|`v0.05`
|`oidc_metadata_url`|URL for the OIDC metadata file on the Identity Provider|<Yes/>|n/a
|`oidc_jwks_uri`|URI for the JSON Web Key Sets data|<Yes/>|n/a
|`oidc_client_id`|Client ID configured on the Identity Provider|<Yes/>|n/a
|`oidc_client_secret_ssm_name`|Name of the AWS SSM SecureString parameter which contains the OIDC client secret|<Yes/>|n/a
|`oidc_crypto_passphrase_ssm_name`|Name of the AWS SSM SecureString parameter which contains the passphrase used to encrypt OIDC session data|<Yes/>|n/a
|`oidc_remote_user_claim`|Name of the claim from the Identity Provider which containers the username|<No/>|`email`
|`tf_state_access_log_bucket`|S3 bucket used to store access logs for the S3 bucket which stores the Terraform state files created for each desktop instance.  If this is left blank (unset) then logging is disabled|<No/>|``
|`tf_state_access_log_prefix`|Prefix used for access logs when they are enabled|<No/>|``


