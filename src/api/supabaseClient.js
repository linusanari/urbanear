import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

const supabase = createClient(config.api.supabaseUrl, config.api.supabaseAnonKey);

export default supabase;
