
/*
In this script you can define the initial database tables and initial data that will be inserted into the database when the application starts.
*/




/*

-- Create table `counter` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'counter') THEN
        CREATE TABLE counter (
            id SERIAL PRIMARY KEY,
            name TEXT,
            current_value INTEGER NOT NULL,
            active BOOLEAN NOT NULL DEFAULT FALSE
        );
    END IF;
END $$;

-- Insert initial data into `counter` if the table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.counter) THEN
        INSERT INTO public.counter (name, current_value, active)
        VALUES ('Main', 0, TRUE), ('Secondary', 0, FALSE), ('Combined', 0, FALSE);
    END IF;
END $$;

-- Create table `goals` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'goals') THEN
        CREATE TABLE goals (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            value INTEGER NOT NULL
        );
    END IF;
END $$;

-- Insert initial data into `goals` if the table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.goals) THEN
        INSERT INTO public.goals (name, value)
        VALUES ('test', 5), ('test2', 10), ('test3', 1);
    END IF;
END $$;

-- Create table `counter_goals` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'counter_goals') THEN
        CREATE TABLE counter_goals (
            id SERIAL PRIMARY KEY,
            counter_id INTEGER REFERENCES counter(id) ON DELETE CASCADE,
            goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE
        );
    END IF;
END $$;

-- Insert initial data into `counter_goals` if the table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.counter_goals) THEN
        INSERT INTO public.counter_goals (counter_id, goal_id)
        VALUES (1, 1), (1, 2), (2, 3), (3, 1), (3, 2), (3, 3);
    END IF;
END $$;

-- Create table `events` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events') THEN
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
            event_date TIMESTAMP NOT NULL,
            score INTEGER
        );
    END IF;
END $$;

-- Insert initial data into `events` if the table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.events) THEN
        INSERT INTO public.events (goal_id, event_date, score)
        VALUES 
            (1, NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 10), 5),
            (1, NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 10), 5),
            (2, NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 10), 10),
            (3, NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 10), 1),
            (3, NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 10), 1);
    END IF;
END $$;


-- Create table `agenda_jobs` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'agenda_jobs') THEN
        CREATE TABLE agenda_jobs (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            data JSONB,
            priority INTEGER DEFAULT 0,
            next_run_at TIMESTAMP WITH TIME ZONE,
            locked_at TIMESTAMP WITH TIME ZONE,
            last_run_at TIMESTAMP WITH TIME ZONE,
            last_finished_at TIMESTAMP WITH TIME ZONE,
            repeat_interval VARCHAR(255),
            repeat_timezone VARCHAR(255),
            type VARCHAR(20) DEFAULT 'single',
            unique_key VARCHAR(255),
            unique_key_expire TIMESTAMP WITH TIME ZONE,
            disabled BOOLEAN DEFAULT FALSE
        );
    END IF;
END $$;


*/


