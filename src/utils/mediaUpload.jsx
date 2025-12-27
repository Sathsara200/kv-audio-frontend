import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaGhoY3h5eGZjaHdyb2hudGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MTcyOTksImV4cCI6MjA4MjI5MzI5OX0.xCIXzaGl-fP6iR-v68Bl0U60q7IPfKv9kTt5h7EfJMo";
const supabase_url = "https://jghhhcxyxfchwrohntgu.supabase.co";

const supabase = createClient(supabase_url,anon_key)

export default function mediaUpload(file){
  
    return new Promise((resolve, reject)=>{
        
        if(file == null){
           reject( "No file selected")
        }

        const timestamp = new Date().getTime();
        const fileName = timestamp + file.name;

        supabase.storage.from("KV-Audio").upload(fileName,file,{
            cacheControl: '3600',
            upsert: false,
        })
        .then(()=>{

            const publicUrl = supabase.storage.from("KV-Audio").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error  uploading file")
        })
    });
}

