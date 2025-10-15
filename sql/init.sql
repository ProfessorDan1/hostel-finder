-- PostgreSQL initialization for CampusConnect (v2)
CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  role VARCHAR(50) NOT NULL, -- 'find_hostel', 'find_roommate', 'post_apartment'
  type VARCHAR(100) NOT NULL,
  gender VARCHAR(100),
  location VARCHAR(100),
  religion VARCHAR(100),
  rent NUMERIC,
  phone VARCHAR(50),
  name VARCHAR(100),
  description TEXT,
  date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
