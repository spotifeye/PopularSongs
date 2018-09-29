

CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name varchar(240) NOT NULL
);

CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY, 
    name varchar(240) NOT NULL, 
    img varchar(240) NOT NULL,
    artist_id INTEGER NOT NULL REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    name varchar(240) NOT NULL, 
    streams INTEGER NOT NULL, 
    length INTEGER NOT NULL, 
    popularity INTEGER NOT NULL, 
    library BOOLEAN NOT NULL, 
    albums_id INTEGER NOT NULL REFERENCES albums(id)
);

COPY artists
FROM '/Users/tomcostello/Immersive/01.SDC/PopularSongs/database/seed-artists.csv' DELIMITER ',' CSV HEADER;

COPY albums
FROM '/Users/tomcostello/Immersive/01.SDC/PopularSongs/database/seed-albums.csv' DELIMITER ',' CSV HEADER;

COPY songs
FROM '/Users/tomcostello/Immersive/01.SDC/PopularSongs/database/seed-songs.csv' DELIMITER ',' CSV HEADER;