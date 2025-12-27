import { createClient } from "@supabase/supabase-js"

const anon_key = "sb_publishable_g3RR3TqObmRkrGwN-yAJzw_ORMc2Iyh";
const supabase_url = "https://jghhhcxyxfchwrohntgu.supabase.co";

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

