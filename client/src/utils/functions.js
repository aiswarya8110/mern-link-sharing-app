export const isValidImage = (file)=>{
    const img = new Image();
    return new Promise((resolve, reject)=>{
        if(!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
           return resolve('Only PNG and JPEG images are allowed.')
        }

        img.src = URL.createObjectURL(file);
        img.onload = ()=>{
            if(img.height > 1024 && img.width > 1024){
                resolve("image size should be less than 1024x1024px")
            }else{
                resolve('');
            }
        }
    })
}