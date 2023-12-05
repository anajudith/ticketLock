import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://thwxqzsjdpsvwuvvkiot.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod3hxenNqZHBzdnd1dnZraW90Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTc4MjY1MCwiZXhwIjoyMDE3MzU4NjUwfQ.iNZqVvZnRhjO4BqUX2nOcbzjNsONU3BOJjHIltNtiY0"
);

export default supabase;
