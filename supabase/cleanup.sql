-- Remove data from junction tables first
DELETE FROM founder_tags;
DELETE FROM founder_startups;

-- Remove data from main tables
DELETE FROM diversity_metrics;
DELETE FROM tags;
DELETE FROM startups;
DELETE FROM founders; 