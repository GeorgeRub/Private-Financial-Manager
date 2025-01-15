use sqlx::PgPool;

#[derive(Clone)]
pub struct AppStage {
    pub(crate) db_pool: PgPool,
}




