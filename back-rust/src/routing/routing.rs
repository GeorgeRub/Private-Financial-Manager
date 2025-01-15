use axum::Router;
use axum::routing::get;
use sqlx::PgPool;
use crate::app_stage::app_stage_model::AppStage;
use crate::routing::rest::root;

pub async fn get_router(data_base_url :String) -> Router {
    let pool = PgPool::connect(&data_base_url)
        .await
        .expect("Database connection failed.");

    Router::new()
        .nest(
            "/api/v1",
            Router::new()
                .route("/", get(root)))
        .with_state(AppStage { db_pool: pool })

}