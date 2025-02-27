import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4aHZhdHNla29tYnZuYnpsbXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDU0MzQsImV4cCI6MjA1NTg4MTQzNH0.PeWQnP3Z5t75lN_owrb3cqYYfoZMfM1dAxkvAG8gZBs";
const supabase_url = "https://cxhvatsekombvnbzlmqh.supabase.co";

const supabase = createClient(supabase_url,anon_key)

export default function mediaUpload(file){
  
    return new Promise((resolve, reject)=>{
        
        if(file == null){
           reject( "No file selected")
        }

        const timestamp = new Date().getTime();
        const fileName = timestamp + file.name;

        supabase.storage.from("images").upload(fileName,file,{
            cacheControl: '3600',
            upsert: false,
        })
        .then(()=>{

            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error  uploading file")
        })
    });
}

