use axum::http::StatusCode;
use axum::response::IntoResponse;

pub async fn root() -> impl IntoResponse {
    (StatusCode::OK, "Access denied. \nIt is just joke " ).into_response()
}