-- Insert sample tags
INSERT INTO tags (name, category, description) VALUES
('Scale-up Alum', 'Background', 'Founder has experience in a scale-up company'),
('Tech Founder', 'Category', 'Founder in technology sector'),
('AI/ML', 'Technology', 'Working with artificial intelligence or machine learning'),
('Female Founder', 'Diversity', 'Female-identified founder'),
('Migrant Founder', 'Diversity', 'Founder who migrated to Australia'),
('Indigenous Founder', 'Diversity', 'Indigenous Australian founder'),
('First Generation', 'Background', 'First generation entrepreneur'),
('Career Changer', 'Background', 'Founder who changed careers to start a business'),
('PhD Researcher', 'Background', 'Founder with PhD research background'),
('Industry Expert', 'Background', 'Founder with deep industry expertise');

-- Insert sample founders
INSERT INTO founders (first_name, last_name, email, linkedin_url, city, state, country, bio) VALUES
('Sarah', 'Chen', 'sarah.chen@example.com', 'https://www.linkedin.com/in/sarahchen', 'Melbourne', 'VIC', 'Australia', 'Building sustainable supply chain solutions using AI and IoT. Former McKinsey consultant with deep expertise in logistics optimization.'),
('Marcus', 'Williams', 'marcus.williams@example.com', 'https://www.linkedin.com/in/marcuswilliams', 'Sydney', 'NSW', 'Australia', 'Democratizing healthcare access in rural Australia through telemedicine platform. Indigenous founder with medical background.'),
('Priya', 'Patel', 'priya.patel@example.com', 'https://www.linkedin.com/in/priyapatel', 'Brisbane', 'QLD', 'Australia', 'Personalized learning platform using AI to adapt to individual student needs. Former teacher turned tech entrepreneur.');

-- Insert sample startups
INSERT INTO startups (name, description, website, industry, stage, founded_date, status) VALUES
('EcoLogistics', 'Sustainable supply chain solutions using AI and IoT', 'https://ecologistics.example.com', 'CleanTech', 'Pre-Seed', '2023-01-15', 'Active'),
('HealthConnect', 'Telemedicine platform for rural healthcare', 'https://healthconnect.example.com', 'HealthTech', 'Seed', '2022-06-01', 'Active'),
('EduAI', 'AI-powered personalized learning platform', 'https://eduai.example.com', 'EdTech', 'Pre-Seed', '2023-03-10', 'Active');

-- Link founders to startups
INSERT INTO founder_startups (founder_id, startup_id, role, is_current, start_date) VALUES
((SELECT id FROM founders WHERE first_name = 'Sarah' AND last_name = 'Chen'), (SELECT id FROM startups WHERE name = 'EcoLogistics'), 'CEO & Co-Founder', true, '2023-01-15'),
((SELECT id FROM founders WHERE first_name = 'Marcus' AND last_name = 'Williams'), (SELECT id FROM startups WHERE name = 'HealthConnect'), 'Founder & CTO', true, '2022-06-01'),
((SELECT id FROM founders WHERE first_name = 'Priya' AND last_name = 'Patel'), (SELECT id FROM startups WHERE name = 'EduAI'), 'CEO & Founder', true, '2023-03-10');

-- Insert diversity metrics
INSERT INTO diversity_metrics (founder_id, gender, ethnicity, is_lgbtqi, is_neurodivergent, age_range, is_migrant, migrant_origin_country) VALUES
((SELECT id FROM founders WHERE first_name = 'Sarah' AND last_name = 'Chen'), 'Female', 'Asian-Australian', false, false, '30-35', true, 'China'),
((SELECT id FROM founders WHERE first_name = 'Marcus' AND last_name = 'Williams'), 'Male', 'Indigenous Australian', false, false, '35-40', false, NULL),
((SELECT id FROM founders WHERE first_name = 'Priya' AND last_name = 'Patel'), 'Female', 'South Asian', false, false, '28-32', true, 'India');

-- Add founder tags
INSERT INTO founder_tags (founder_id, tag_id, confidence_score, source) VALUES
((SELECT id FROM founders WHERE first_name = 'Sarah' AND last_name = 'Chen'), (SELECT id FROM tags WHERE name = 'Tech Founder'), 0.95, 'ai_analysis'),
((SELECT id FROM founders WHERE first_name = 'Sarah' AND last_name = 'Chen'), (SELECT id FROM tags WHERE name = 'AI/ML'), 0.92, 'ai_analysis'),
((SELECT id FROM founders WHERE first_name = 'Sarah' AND last_name = 'Chen'), (SELECT id FROM tags WHERE name = 'Female Founder'), 1.0, 'manual'),
((SELECT id FROM founders WHERE first_name = 'Sarah' AND last_name = 'Chen'), (SELECT id FROM tags WHERE name = 'Migrant Founder'), 1.0, 'manual'),
((SELECT id FROM founders WHERE first_name = 'Marcus' AND last_name = 'Williams'), (SELECT id FROM tags WHERE name = 'Tech Founder'), 0.88, 'ai_analysis'),
((SELECT id FROM founders WHERE first_name = 'Marcus' AND last_name = 'Williams'), (SELECT id FROM tags WHERE name = 'Indigenous Founder'), 1.0, 'manual'),
((SELECT id FROM founders WHERE first_name = 'Marcus' AND last_name = 'Williams'), (SELECT id FROM tags WHERE name = 'Industry Expert'), 0.85, 'ai_analysis'),
((SELECT id FROM founders WHERE first_name = 'Priya' AND last_name = 'Patel'), (SELECT id FROM tags WHERE name = 'Tech Founder'), 0.90, 'ai_analysis'),
((SELECT id FROM founders WHERE first_name = 'Priya' AND last_name = 'Patel'), (SELECT id FROM tags WHERE name = 'AI/ML'), 0.88, 'ai_analysis'),
((SELECT id FROM founders WHERE first_name = 'Priya' AND last_name = 'Patel'), (SELECT id FROM tags WHERE name = 'Female Founder'), 1.0, 'manual'),
((SELECT id FROM founders WHERE first_name = 'Priya' AND last_name = 'Patel'), (SELECT id FROM tags WHERE name = 'Migrant Founder'), 1.0, 'manual'),
((SELECT id FROM founders WHERE first_name = 'Priya' AND last_name = 'Patel'), (SELECT id FROM tags WHERE name = 'Career Changer'), 0.95, 'ai_analysis'); 