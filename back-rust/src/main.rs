use std::env;
use tokio::net::TcpListener;
use crate::routing::get_router;

mod account;
mod routing;
mod app_stage;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let app = get_router(database_url).await;

    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    println!("Listening on port 8000");
    axum::serve(listener, app).await.unwrap();
}