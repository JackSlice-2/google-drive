
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_YOUR_SUPABASE_API_URL
const supabaseKey = process.env.REACT_APP_YOUR_SUPABASE_PUBLIC_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;