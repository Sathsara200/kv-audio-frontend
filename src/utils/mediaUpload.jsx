import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaGhoY3h5eGZjaHdyb2hudGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MTcyOTksImV4cCI6MjA4MjI5MzI5OX0.xCIXzaGl-fP6iR-v68Bl0U60q7IPfKv9kTt5h7EfJMo";
const supabase_url = "https://jghhhcxyxfchwrohntgu.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) {
        return reject("No file selected");
      }

      const fileName = `uploads/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("KV-Audio") // ✅ exact bucket name
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.error(error);
        return reject(error.message);
      }

      const { data } = supabase.storage
        .from("KV-Audio")
        .getPublicUrl(fileName);

      resolve(data.publicUrl);

    } catch (err) {
      reject("Error uploading file");
    }
  });
}