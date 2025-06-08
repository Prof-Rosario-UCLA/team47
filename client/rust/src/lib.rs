use wasm_bindgen::prelude::*;
use fuzzy_matcher::skim::SkimMatcherV2;
use fuzzy_matcher::FuzzyMatcher;
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Clone)]
pub struct Event {
    pub event_id: i32,
    pub name: String,
    pub description: String,
    pub host: String,
    pub location: String,
    pub time: String,
    pub day: String,
    pub image_url: Option<String>
}

// Returns events ordered by fuzzy match score
#[wasm_bindgen]
pub fn filter_events(events_json: &JsValue, pattern: &str) -> Result<JsValue, JsValue> {
    // Parse incoming events array
    let mut events: Vec<Event> = events_json.into_serde().map_err(|e| JsValue::from_str(&e.to_string()))?;

    // Score + sort
    let matcher = SkimMatcherV2::default();
    events.sort_by_key(|e| {
        let combined = format!("{} {} {} {}", e.name, e.description, e.host, e.location); // Searches in name, description, host, location
        matcher.fuzzy_match(&combined, pattern).unwrap_or(-1)
    });
    events.reverse();

    // Send back to JS
    JsValue::from_serde(&events).map_err(|e| JsValue::from_str(&e.to_string()))
}