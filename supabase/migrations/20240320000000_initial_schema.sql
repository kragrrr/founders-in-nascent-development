-- Create founders table
CREATE TABLE founders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    linkedin_url VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'Australia',
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create startups table
CREATE TABLE startups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    website VARCHAR(500),
    industry VARCHAR(100),
    stage VARCHAR(50),
    founded_date DATE,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create founder_startups table
CREATE TABLE founder_startups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    founder_id UUID REFERENCES founders(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    role VARCHAR(100),
    is_current BOOLEAN DEFAULT FALSE,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create diversity_metrics table
CREATE TABLE diversity_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    founder_id UUID REFERENCES founders(id) ON DELETE CASCADE,
    gender VARCHAR(50),
    ethnicity VARCHAR(100),
    is_lgbtqi BOOLEAN,
    is_neurodivergent BOOLEAN,
    age_range VARCHAR(20),
    is_migrant BOOLEAN,
    migrant_origin_country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create founder_tags table
CREATE TABLE founder_tags (
    founder_id UUID REFERENCES founders(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    confidence_score DECIMAL(3,2),
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (founder_id, tag_id)
);

-- Create RLS policies
ALTER TABLE founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE diversity_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read founders"
    ON founders FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to read startups"
    ON startups FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to read founder_startups"
    ON founder_startups FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to read diversity_metrics"
    ON diversity_metrics FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to read tags"
    ON tags FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to read founder_tags"
    ON founder_tags FOR SELECT
    TO authenticated
    USING (true);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_founders_updated_at
    BEFORE UPDATE ON founders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_startups_updated_at
    BEFORE UPDATE ON startups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_founder_startups_updated_at
    BEFORE UPDATE ON founder_startups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diversity_metrics_updated_at
    BEFORE UPDATE ON diversity_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at
    BEFORE UPDATE ON tags
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_founder_tags_updated_at
    BEFORE UPDATE ON founder_tags
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 