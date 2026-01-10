-- Main vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    key TEXT PRIMARY KEY,
    user_id TEXT,
    make TEXT,
    model TEXT,
    year INTEGER,
    color TEXT,
    vin TEXT,
    plate TEXT,
    tires TEXT,
    tire_size TEXT,
    tire_pressure TEXT,
    oil_type TEXT,
    warranty BOOLEAN,
    warranty_number TEXT,
    warranty_phone TEXT,
    warranty_notes TEXT,
    warranty_expiry TEXT,          -- ISO 8601: 'YYYY-MM-DD'
    purchase_date TEXT,            -- ISO 8601: 'YYYY-MM-DD'
    parcel_number TEXT,
    category TEXT,
    description TEXT,
    notes TEXT,
    insurance_policy_number TEXT,
    insurance_company TEXT,
    insurance_expiration_date TEXT  -- ISO 8601: 'YYYY-MM-DD'
);

-- Videos (1-to-many with vehicles)
CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_key TEXT NOT NULL,
    name TEXT,
    url TEXT,
    FOREIGN KEY (vehicle_key) REFERENCES vehicles(key) ON DELETE CASCADE
);

-- Odometer readings
CREATE TABLE IF NOT EXISTS odometer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_key TEXT NOT NULL,
    odometer REAL,
    type TEXT,
    date TEXT,                     -- ISO 8601: 'YYYY-MM-DD'
    reading TEXT,                  -- ISO 8601: 'YYYY-MM-DD'
    FOREIGN KEY (vehicle_key) REFERENCES vehicles(key) ON DELETE CASCADE
);

-- Oil changes
CREATE TABLE IF NOT EXISTS oil_changes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_key TEXT NOT NULL,
    date TEXT,                     -- ISO 8601: 'YYYY-MM-DD'
    odometer REAL,
    FOREIGN KEY (vehicle_key) REFERENCES vehicles(key) ON DELETE CASCADE
);

-- Parts
CREATE TABLE IF NOT EXISTS parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_key TEXT NOT NULL,
    part TEXT,
    type TEXT,
    url TEXT,
    date TEXT,                     -- ISO 8601: 'YYYY-MM-DD'
    description TEXT,
    note TEXT,
    FOREIGN KEY (vehicle_key) REFERENCES vehicles(key) ON DELETE CASCADE
);

-- Tools
CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_key TEXT NOT NULL,
    name TEXT,
    description TEXT,
    FOREIGN KEY (vehicle_key) REFERENCES vehicles(key) ON DELETE CASCADE
);

-- Maintenance records
CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_key TEXT NOT NULL,
    maintenance_type TEXT,
    maintenance_end_date TEXT,     -- ISO 8601: 'YYYY-MM-DD'
    maintenance_desc TEXT,
    FOREIGN KEY (vehicle_key) REFERENCES vehicles(key) ON DELETE CASCADE
);

-- Insert vehicle
INSERT INTO vehicles (key, make, model, year) 
VALUES ('veh-001', 'Toyota', 'Camry', 2020);

-- Insert oil change
INSERT INTO oil_changes (vehicle_key, date, odometer)
VALUES ('veh-001', '2025-03-15', 45000.5);