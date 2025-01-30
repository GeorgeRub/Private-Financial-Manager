use std::sync::Arc;
use axum::Router;
use axum_keycloak_auth::instance::{KeycloakAuthInstance, KeycloakConfig};
use axum_keycloak_auth::layer::KeycloakAuthLayer;
use axum_keycloak_auth::{PassthroughMode, Url};

/// Returns a `KeycloakAuthInstance` that can be used to construct a `KeycloakAuthLayer`
/// for a given `Router`.
///
/// This function creates a `KeycloakAuthInstance` with the following configuration:
///
/// - Keycloak server: `http://local.keycloak.com/`
/// - Realm: `private-financial-manager`
///
/// The returned `KeycloakAuthInstance` is the recommended way to create a `KeycloakAuthLayer`
/// for a given `Router`, as it will reuse the same instance for all routers.
///
/// # Example
///
///
pub fn get_keycloak_auth_instance() -> KeycloakAuthInstance{
    KeycloakAuthInstance::new(
        KeycloakConfig::builder()
            .server(Url::parse("http://local.keycloak.com/").unwrap())
            .realm(String::from("private-financial-manager"))
            .build(),
    )
}


// You may have multiple routers that you want to see protected by a `KeycloakAuthLayer`.
// You can safely attach new `KeycloakAuthLayer`s to different routers, but consider using
// only a single `KeycloakAuthInstance` for all of these layers.
// Remember: The `KeycloakAuthInstance` manages the keys used to decode incoming JWTs
// and dynamically fetches them from your Keycloak server.
// Having multiple instances simoultaniously would incease pressure on your Keycloak
// instance on service startup and unnecesssarily store duplicated data.
// The `KeycloakAuthLayer` therefore really takes an `Arc<KeycloakAuthInstance>` in its `instance`
// method!
// Presence of the `Into` trait in the `instance` methods argument let us hide that fact in the
// previous example.

/// Attaches a `KeycloakAuthLayer` to the given `Router` to protect routes with Keycloak authentication.
///
/// This function takes a `Router` and an `Arc<KeycloakAuthInstance>`, and applies a `KeycloakAuthLayer`
/// to the router, enforcing authentication and authorization based on the provided Keycloak instance.
/// The layer is configured to block requests that do not pass through the authentication process and
/// expects requests to have a specific audience and required roles.
///
/// # Arguments
///
/// * `router` - The `Router` instance to which the authentication layer will be attached.
/// * `instance` - An `Arc<KeycloakAuthInstance>` that manages the JWT decoding keys and interacts with Keycloak.
///
/// # Returns
///
/// * Returns a modified `Router` with the Keycloak authentication layer applied.
///
/// # Note
///
/// This function expects requests to have the "account" audience and the "administrator" role.
#[allow(dead_code)]
pub fn protect(router:Router, instance: Arc<KeycloakAuthInstance>) -> Router {
    router.layer(
        KeycloakAuthLayer::<String>::builder()
            .instance(instance)
            .passthrough_mode(PassthroughMode::Block)
            .persist_raw_claims(false)
            .expected_audiences(vec![String::from("account")])
            .required_roles(vec![String::from("administrator")])
            .build(),
    )
}