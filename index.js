fetch("https://openapi.programming-hero.com/api/phero-tube/categories").then(res=>res.json()).then(datas=>btnLoader(datas.categories))
const btnLoader=(datas)=>{
    const parent=document.getElementById("btnContainer");
    for(const data of datas)
    {
        const div=document.createElement("div");
        div.innerHTML=`
        <button onclick="loadVideosDyn(${data.category_id})" id="btn-${data.category_id}" class="btn text-[#252525B3] bg-[#25252526]">${data.category}</button>

        `
        parent.appendChild(div);
    }
}
const Loader=()=>
  {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("vdoContainer").classList.add("hidden");
  }
const notLoader=()=>
  {
   
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("vdoContainer").classList.remove("hidden");
  
  }
  
const loadVideos=(val="")=>
{  Loader();
  clearButton();
 
  const id=document.getElementById("btn-all");
  id.classList.add("clicked");
  const url=`https://openapi.programming-hero.com/api/phero-tube/videos?title=${val}`;
    fetch(url).then(res=>res.json()).then(datas=>{
        const parent=document.getElementById("vdoContainer");
        parent.innerHTML="";
        for(const data of datas.videos)
            { 
                const div=document.createElement("div");
                div.innerHTML=`
                <div class="card bg-base-100  ">
  <figure class="relative h-[200px] object-fill" > 
    <img
      src="${data.thumbnail}"
      alt="Shoes" />
      <p class="absolute top-[85%] left-[70%]  bg-black text-white text-sm rounded-sm p-1">3hrs 56 min ago</p>
  </figure>
  <div class="card-body ">
  <div class="flex gap-6">
    <div class="avatar h-[40%]">
  <div class="w-10 rounded-full">
  
   <img src="${data.authors[0].profile_picture}" />
   
  </div>
   </div>
   <div>
   <p class="font-semibold text-xl">${data.title}</p>
   <div class="flex ">
   <p class="text-[#171717B3] text-sm" >${data.authors[0].profile_name}</p>
   <img src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" id="btnVer"class="h-[24px] hidden">
   </div>
   <p class="text-[#171717B3] text-sm">${data.others.views} views</p>
   </div>
  </div>
</div>
  </div>
 <button onclick="videoDes('${data.video_id}')" class="btn btn-block">Show Details</button>
</div>
        
                `
                const btnVer=div.querySelector("#btnVer");
                console.log(data.authors[0].verified);
                if (data.authors[0].verified !== false) {
                    btnVer.classList.remove("hidden");
                }

                parent.appendChild(div);
            }
    })
    setTimeout(() => {
      notLoader(); 
    }, 1000);
  }
  const loadVideosDyn=(btnId)=>

    { 
      clearButton();
     
      const id=document.getElementById(`btn-${btnId}`);
      id.classList.add("clicked");
      const url=`https://openapi.programming-hero.com/api/phero-tube/category/${btnId}`;
      fetch(url).then(res=>res.json()).then(datas=>{
        const parent=document.getElementById("vdoContainer");
        parent.innerHTML="";
        if(datas.category.length==0)
        { 
          
        
          const div=document.createElement("div");
          div.innerHTML=`
          <div class="w-[95vw]  ">
          <div class="flex flex-col items-center justify-center  mt-[10%] mx-auto">
          <div>
          <img src="Icon.png">
          </div>
          <p class="text-[32px] font-bold text-center">Oops!! Sorry, There is no content here</p>
          </div>
          </div>
          `
          parent.appendChild(div);
          return;
        }
        else
        { Loader();
        for(const data of datas.category)
            {
                const div=document.createElement("div");
                div.innerHTML=`
                <div class="card bg-base-100  ">
  <figure class="relative h-[200px] object-fill" > 
    <img
      src="${data.thumbnail}"
      alt="Shoes" />
      <p class="absolute top-[85%] left-[70%]  bg-black text-white text-sm rounded-sm p-1">3hrs 56 min ago</p>
  </figure>
  <div class="card-body ">
  <div class="flex gap-6">
    <div class="avatar h-[40%]">
  <div class="w-10 rounded-full">
  
   <img src="${data.authors[0].profile_picture}" />
   
  </div>
   </div>
   <div>
   <p class="font-semibold text-xl">${data.title}</p>
   <div class="flex ">
   <p class="text-[#171717B3] text-sm" >${data.authors[0].profile_name}</p>
   <img src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" id="btnVer"class="h-[24px] hidden">
   </div>
   <p class="text-[#171717B3] text-sm">${data.others.views} views</p>
   </div>
  </div>
</div>
  </div>
   <button onclick="videoDes('${data.video_id}')" class="btn btn-block">Show Details</button>
</div>
        
                `
                const btnVer=div.querySelector("#btnVer");
                console.log(data.authors[0].verified);
                if (data.authors[0].verified !== false) {
                    btnVer.classList.remove("hidden");
                }

                parent.appendChild(div);
            }
    }
    setTimeout(()=>{
      notLoader()},1000
    )})
    
   
    
    }
const clearButton=()=>{
  const id=document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("clicked"));
 

}


const videoDes=(id)=>{
  console.log(id);
  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
 fetch(url).then(res=>res.json()).then(datas=>{
 
  document.getElementById("vdoDetails").showModal();
  const parent=document.getElementById("vdoDetailsContainer");
  const div=document.createElement("div");
 div.innerHTML=`
  <div >
 
  <div class="card bg-base-100 image-full shadow-sm">
  <figure >
    <img 
      src="${datas.video.authors[0].profile_picture}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
  <p class="font-bold text-2xl">Title: ${datas.video.title}</p>
  <p class="font-semibold text-xl">Author: ${datas.video.authors[0].profile_name}</p>
    <p>Description: ${datas.video.description}</p>
    </div>
  </div>
</div>
  
  
  </div>
 
  `
  parent.innerHTML="";
 parent.appendChild(div);
  
 })
}
document.getElementById("inSearch").addEventListener("keyup",(e)=>{
const val=e.target.value;
loadVideos(val);
})

